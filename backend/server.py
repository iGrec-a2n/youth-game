import eventlet
eventlet.monkey_patch()
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, join_room, leave_room, emit
import eventlet
from werkzeug.security import check_password_hash, generate_password_hash
from bd import db
from bson import ObjectId
import random
import string
import time
# For WebSocket connections to work well in local mode

app = Flask(__name__)
CORS(app, origins=['http://localhost:5173'])
socketio = SocketIO(app, cors_allowed_origins="*", engineio_logger=True, async_mode='eventlet')

# Collection pour les rooms
rooms = db["rooms"]

# Collection pour les utilisateurs
users = db["Users"]

# Collection pour les scores des joueurs
user_scores = db["Score"]
#collection pour les questions
questions = db["questions"]
# Nb de participants à une room
room_players = {}

# 📌 Générer un code aléatoire pour une room
def generate_room_code():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

# Route pour enregistrer un nouvel utilisateur
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    print(data)
    last_name = data["lastName"]
    first_name = data["firstName"]
    username = data["username"]
    email = data['email']
    password = data['password']
    hashed_password = generate_password_hash(password)
    country = data['country']
    birthdate = data['birthDate']
    print("ok")
    # Vérifier si l'utilisateur existe déjà
    if users.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 400

    if last_name and first_name and username and email and password and country:
        users.insert_one({
            "lastName": last_name,
            "firstName": first_name,
            "username": username,
            "email": email,
            "password": hashed_password,
            "country": country,
            "birthdate": birthdate
        })
        return jsonify({"message": "New user registered successfully"}), 200
    else:
        return jsonify({"message": "Missing or incorrect data"}), 400

# Route pour connecter un utilisateur
@app.route('/api/login', methods=["POST"])
def signIN():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    existing_user = users.find_one({"email": email})

    if existing_user and check_password_hash(existing_user["password"], password):
        user_id = str(existing_user["_id"])
        return jsonify({"message": "Welcome", "user_id": user_id}), 200
    else:
        return jsonify({"message": "User not found"}), 400

# Route pour créer une room avec des questions
@app.route('/api/create_room', methods=["POST"])
def create_room():
    data = request.get_json()
    admin_id = data.get("admin_id")
    room_code = generate_room_code()
    questions_data = data.get("questions")

    if not questions_data or not isinstance(questions_data, list):
        return jsonify({"message": "Questions are required and must be a list"}), 400

    room = {
        "admin_id": admin_id,
        "room_code": room_code,
        "questions": [],
        "status": "Wait"
    }

    for question in questions_data:
        question_data = {
            "question": question["question"],
            "question_id": question["question_id"],
            "type": question["type"],
            "options": question["options"],
            "correct_answer": question["correct_answer"],
            "points": question["points"]
        }
        room["questions"].append(question_data)

    rooms.insert_one(room)
    return jsonify({"message": "Room created successfully", "room_code": room_code}), 200

# Route pour récupérer les questions d'une room
@app.route('/api/get_room_questions', methods=["GET"])
def get_room_questions():
    room_code = request.args.get("room_code")
    room = rooms.find_one({"room_code": room_code})

    if not room:
        return jsonify({"message": "Room not found"}), 404

    return jsonify({"questions": room["questions"]}), 200

#Route pour les classements
@app.route('/ranking', methods=['GET'])
def ranking():
    try:
        # Récupérer le pays depuis les paramètres de la requête 
        country = request.args.get("country")
        user_filter = {}  # Par défaut, aucun filtre 
        if country:
            user_filter["country"] = country  # On filtre par pays si un country est fourni si le front l'a fourni en paramètre

        # Récupérer tous les utilisateurs correspondant au filtre
        matching_users = users.find(user_filter)

        user_ids = {user["_id"] for user in matching_users}

        # Récupérer les scores en filtrant par ces IDs
        scores_filter = {} if not country else {"user_id": {"$in": list(user_ids)}}
        scores = user_scores.find(scores_filter).sort("score", -1)

        ranking_list = []

        for score_doc in scores:
            user_id = str(score_doc["user_id"])
            score = score_doc.get("score", 0)

            # Récupérer les informations utilisateur
            user = users.find_one({"_id": score_doc["user_id"]})

            ranking_list.append({
                "user_id": user_id,
                "pseudo": user["username"] if user else "Inconnu",
                "country": user["country"] if user else "N/A",
                "score": score
            })

        # Définir un titre en fonction du filtre appliqué
        ranking_title = "International Ranking" if not country else f"Ranking for {country}"

        return jsonify({"title": ranking_title, "ranking": ranking_list}), 200

    except Exception as e:
        return jsonify({"error": "Une erreur est survenue", "details": str(e)}), 500



@socketio.on("join_room")
def handle_join_room(data):
    room_code = data["room_code"]
    username = data["username"]
    user_id = data["user_id"]  # Un identifiant utilisateur unique, passé lors de la connexion
    if not user_id:
        emit("error", {"message": "User not found"}, to=request.sid)
        return
    # Trouver la room dans la base de données
    room = rooms.find_one({"room_code": room_code})
    if not room:
        emit("error", {"message": "Room not found"}, to=request.sid)
        return
    
    # Vérifier si la room est déjà en "in progress"
    if room.get("status") == "In progress":
        emit("error", {"message": "La room est déjà en cours, vous ne pouvez plus rejoindre."}, to=request.sid)
        return

    # Si la clé 'players' n'existe pas encore, on l'initialise avec une liste vide
    if "players" not in room:
        rooms.update_one({"room_code": room_code}, {"$set": {"players": []}})
    
    # Récupérer à nouveau la room après l'initialisation
    room = rooms.find_one({"room_code": room_code})

    # Vérifier si le joueur est déjà dans la room
    existing_player = next((p for p in room["players"] if str(p["user_id"]) == user_id), None)
    if existing_player:
        emit("error", {"message": f"Le joueur {username} est déjà dans la room."}, to=request.sid)
        return

    # Ajouter le joueur à la liste des joueurs dans la room
    player = {
        "username": username,
        "user_id": user_id, 
        "joined_at": time.time(), # Date et heure d'entrée 'pas encore convertie'
        "score": 0,
        "finished": False
    }

    # Mettre à jour la collection 'rooms' pour ajouter ce joueur à la room
    rooms.update_one(
        {"room_code": room_code},
        {"$push": {"players": player}}
    )
    time.sleep(0.1)
    # Récupérer la room mise à jour
    updated_room = rooms.find_one({"room_code": room_code})
# Vérifier si les joueurs sont bien récupérés
    if "players" not in updated_room or not updated_room["players"]:
        print(f"⚠️ Aucun joueur récupéré après mise à jour de la room {room_code} !")
    # Le joueur rejoint la room
    join_room(room_code)

    # Envoyer un message au joueur qui rejoint la room
    emit("player_joined", {"username": username}, to=request.sid)

    # Diffuser à tous les joueurs dans la room la liste mise à jour des joueurs
    emit("player_list", {"players": updated_room["players"]}, room=room_code)

    print(f"📢 {username} a rejoint la room {room_code}.")


    # Émettre l'événement 'new_player' à tous les autres joueurs (dans la room)
    emit("new_player", {"username": username}, room=room_code, include_self=False)
    print("Événement 'new_player' envoyé à la room")

    # Émettre la liste des joueurs mise à jour
    emit("player_list", {"players": updated_room["players"]}, room=room_code)
    print("Événement 'player_list' envoyé")

    # Envoie le nombre de joueurs et la liste complète des joueurs
    emit(
        "broadcast_message",
        {
            "message": f"{username} a rejoint la room {room_code}",
            "players_count": len(updated_room["players"]),
            "players": updated_room["players"],  # Liste des joueurs
        },
        broadcast=True  # Émettre à tous les clients connectés
    )
    print("Événement 'broadcast_message' envoyé à tous les clients")
    if len(updated_room["players"]) == 2:
        time.sleep(5)
        # Mettre la room à "in progress"
        rooms.update_one(
            {"room_code": room_code},
            {"$set": {"status": "In progress"}}
        )

        # Récupérer les questions de type multipleChoice
        question_list = []
        qcm = questions.find({"type": "multipleChoice"})
        for q in qcm:
            question_list.append({
                "_id": str(q["_id"]),
                "question": q["question"],
                "options": q["options"],
                "points": q["points"]
            })

        # Envoyer les questions aux joueurs dans la room
        emit("quiz_started", {"questions": question_list}, room=room_code)

        # Diffuser à tous les clients que le quiz a commencé
        emit("room_status", {"room_code": room_code, "status": "in progress"}, broadcast=True)
        print(f"Le quiz pour la room {room_code} a commencé avec les questions : {question_list}")

# 🔄 Envoyer une question à la room
@socketio.on("start_quiz")
def handle_start_quiz(data):
    room_code = data["room_code"]

    # Vérifier si la room existe
    room = rooms.find_one({"room_code": room_code})
    if not room:
        emit("error", {"message": "Room not found"})
        return

    rooms.update_one(
        {"room_code": room_code},
        {"$set": {"status": "In progress"}}  
    )

    emit("quiz_started", {"questions": room["questions"]}, room=room_code)

    emit("room_status", {"room_code": room_code, "status": "in progress"}, broadcast=True)

    print(f"Le quiz pour la room {room_code} a commencé. Statut mis à jour en 'in progress'.")
#IL reste à gérer la logique de récupération des réponses des participants, les traiter, et envoyer le résultat à la fin

@socketio.on('receive_answer')
def receive_answer(data):
    # Identifier la room
    room_code = data['room_code']

    # Vérifier si la room existe
    room = rooms.find_one({"room_code": room_code})
    if not room:
        emit("error", {"message": "Room not found"}, to=request.sid)
        return

    # Identifier le joueur
    player_id = data["user_id"]

    # Vérifier si le joueur existe dans la room (dans le tableau players)
    player = next((p for p in room["players"] if str(p["user_id"]) == player_id), None)
    if not player:
        emit("error", {"message": "Player not found in room"}, to=request.sid)
        return

    # Récupérer la réponse de l'utilisateur
    question_id = data["question"]
    user_answer = data["answer"]
    print(f"l'id de la question est {question_id}")

    print(f"{player_id} a répondu {user_answer}")

    # Trouver la question dans la collection 'questions' par ID
    question = questions.find_one({"_id": ObjectId(question_id)})
    # for i in question:
    #     print(i["type"])
    
    # if not question:
    #     emit("error", {"message": "Question not found"}, to=request.sid)
    #     print("Question non trouvée ❌")
    #     return

    # Vérifier si la réponse est correcte
    is_correct = question['correctAnswer'] == user_answer
    if is_correct:
        print("Bonne réponse ✅")

        # Mettre à jour le score du joueur dans la collection 'rooms'
        result = rooms.update_one(
            {"room_code": room_code, "players.user_id": player_id},
            {"$inc": {"players.$.score": question['points']}}  # Ajouter les points de la question
        )
        score_record = user_scores.find_one({"user_id": ObjectId(player_id)})

        if score_record:
            if is_correct:
                # Add points for the question if the answer is correct
                user_scores.update_one({"user_id": ObjectId(player_id)}, {"$inc": {"score": question['points']}})
        else:
            user_scores.insert_one({
                "user_id": ObjectId(player_id),
                "score": question['points'] if is_correct else 0,
            })
        # Récupérer le score mis à jour du joueur
        updated_room = rooms.find_one(
            {"room_code": room_code, "players.user_id": player_id},
            {"players.$": 1}
        )

        if updated_room and "players" in updated_room:
            score = updated_room["players"][0]["score"]
            print(f"Score mis à jour : {score} ✅")

            # Envoyer le score uniquement au joueur qui a répondu
            emit("score_updated", {"user_id": player_id, "new_score": score}, to=request.sid)
        else:
            print("Erreur lors de la récupération du score ❌")
            emit("error", {"message": "Score not found"}, to=request.sid)

    else:
        print("Mauvaise réponse ❌")
        emit("error", {"message": "Incorrect answer"}, to=request.sid)

    # Identifier la room
    room_code = data['room_code']

    # Vérifier si la room existe
    room = rooms.find_one({"room_code": room_code})
    if not room:
        emit("error", {"message": "Room not found"}, to=request.sid)
        return

    # Identifier le joueur
    player_id = data["user_id"]

    # Vérifier si le joueur existe
    user = users.find_one({"_id": ObjectId(player_id)})
    if not user:
        emit("error", {"message": "User not found"}, to=request.sid)
        return

    # Récupérer la réponse de l'utilisateur
    question_id = data["question"]
    user_answer = data["answer"]

    print(f"{player_id} a répondu {user_answer}")

    # Trouver la question dans la room
    answer_question = rooms.find_one(
        {"room_code": room_code, "questions.question_id": question_id},
        {"questions.$": 1, "players": 1}
    )

    # Vérifier si la question existe
    if answer_question and "questions" in answer_question:
        correct_answer = answer_question['questions'][0].get("correct_answer")

        if user_answer == correct_answer:
            # Mettre à jour le score du joueur
            result = rooms.update_one(
                {"room_code": room_code, "players.user_id": player_id},
                {"$inc": {"players.$.score": 1}}
            )

            # Récupérer le nouveau score du joueur
            updated_room = rooms.find_one(
                {"room_code": room_code, "players.user_id": player_id},
                {"players.$": 1}
            )

            if updated_room and "players" in updated_room:
                score = updated_room["players"][0]["score"]
                print(f"Score mis à jour : {score} ✅")

                # Envoyer le score uniquement au joueur qui a répondu
                emit("score_updated", {"user_id": player_id, "new_score": score}, to=request.sid)
            else:
                print("Erreur lors de la récupération du score ❌")
                emit("error", {"message": "Score not found"}, to=request.sid)

        else:
            print("Mauvaise réponse ❌")


@socketio.on('player_finished')
def player_finished(data):
    print(" @@@@@@@@@@@@   Joueur fini")
    room_code = data["room_code"]
    user_id = data["user_id"]

    # Trouver la room
    room = rooms.find_one({"room_code": room_code})
    if not room:
        emit("error", {"message": "Room not found"})
        return

    # Mettre à jour l'état du joueur
    for player in room["players"]:
        if player["user_id"] == user_id:
            player["finished"] = True  # Marquer ce joueur comme ayant terminé

    # Sauvegarder la mise à jour dans MongoDB
    rooms.update_one({"room_code": room_code}, {"$set": {"players": room["players"]}})

    # Vérifier si TOUS les joueurs ont terminé
    all_finished = all(player.get("finished", False) for player in room["players"])

    if all_finished:
        print("###########  Joueurs fini")
        end_room({"room_code": room_code})  # Déclencher la fin du jeu

@socketio.on('end_room')
def end_room(data):
    room_code = data["room_code"]

    # Vérifier si la room existe
    room = rooms.find_one({"room_code": room_code})
    if not room:
        emit("error", {"message": "Room not found"})
        return

    # Récupérer les scores des joueurs
    players = room["players"]
    player_scores = [{"username": p["username"], "score": p["score"]} for p in players]

    # Émettre l'événement de fin de jeu à tous les joueurs
    emit("end_room", {"player_scores": player_scores}, room=room_code)

    print(f"🏁 Fin de la room {room_code} - Scores : {player_scores}")
if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)