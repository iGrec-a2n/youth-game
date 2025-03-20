#b64tiqrR884WKtob yzZMSkztF3RQ_h8
from pymongo import MongoClient
# Remplace par ton URI Atlas
MONGO_URI = "mongodb+srv://GROUPE18:aegWIFqdTChccdum@cluster0.bsoht.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Connexion au cluster
client = MongoClient(MONGO_URI)

# Création (ou accès) à la base de données
db = client["HACKATHON_HETIC"]

# Vérification de la connexion
try:
    client.admin.command('ping')
    print("✅ Connexion réussie à MongoDB Atlas !")
except Exception as e:
    print(f"❌ Erreur de connexion : {e}")

# 
# for i in db["Score"].find_one({"_id"})
# db['rooms'].insert_one(
#     {

#   "admin_id": "1234567890",
#   "room_code": "VGQZCN",
#   "players": [],
#   "status": "Wait"
# }
# )
# client = MongoClient("localhost:27017")
# roomsDb = db["rooms"].find()
# for room in roomsDb:
#     print(room)

# db['rooms'].update_one(
#     {"room_code": "VGQZCN"},  # Filtre pour identifier le bon document
#     {
#         "$set": {
#             "players": [],
#             "status": "Wait"
#         },
#     }  # Mise à jour du champ "players" pour le vider
# )
# print("Les joueurs ont été supprimés.")

# for i in db["questions"].find() :
#     print(i)
# users = db["Users"]
# user_scores = db["Score"]
# # creation collection
# # db["rooms"].insert_one(
# #   {
# print('fait')
# db["questions"].insert_many(
# [
#   {
#     "type": "multipleChoice",
#     "question": "Quel pays a récemment demandé à rejoindre l'Union Européenne en 2023 ?",
#     "options": ["Ukraine", "Turquie", "Serbie", "Norvège"],
#     "correctAnswer": "Ukraine",
#     "points": 8
#   },
#   {
#     "type": "multipleChoice",
#     "question": "Quel est le pays le plus récent à avoir rejoint l'Union Européenne ?",
#     "options": ["Croatie", "Roumanie", "Bulgarie", "Estonie"],
#     "correctAnswer": "Croatie",
#     "points": 7
#   },
#   {
#     "type": "multipleChoice",
#     "question": "Quelle institution de l'Union Européenne est responsable de la législation ?",
#     "options": ["Le Conseil de l'Union Européenne", "Le Parlement Européen", "La Commission Européenne", "La Banque Centrale Européenne"],
#     "correctAnswer": "Le Parlement Européen",
#     "points": 6
#   },
#   {
#     "type": "multipleChoice",
#     "question": "Quel pays a voté pour quitter l'Union Européenne lors du référendum de 2016 ?",
#     "options": ["Irlande", "Espagne", "Royaume-Uni", "France"],
#     "correctAnswer": "Royaume-Uni",
#     "points": 9
#   },
#   {
#     "type": "multipleChoice",
#     "question": "En quelle année a été signé le traité de Rome, créant la Communauté économique européenne (CEE) ?",
#     "options": ["1957", "1961", "1973", "1985"],
#     "correctAnswer": "1957",
#     "points": 7
#   }
# ]

# )

# print("C'est fait")

#   "admin_id": "1234567890",
#   "room_code": "VGQZCN",

#   "statut": "Wait",
#   "players": [],
#   "status": "In progress"
# }
# )
# # qcm = db.Questions.find({"type":"multipleChoice"})
# # for i in qcm:
# #   print(i)
# # exist_user = db.Users.find_one({"email": "a@gmail.com"})
# # user_id = str(exist_user["_id"])
# # print(user_id)