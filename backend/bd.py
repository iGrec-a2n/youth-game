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

db["actualities"].insert_many(
    [{

  "titre": "L'UE renforce son aide aux Syriens",
  "contenu": "L'Union européenne promet 2,5 milliards d'euros sous conditions pour soutenir le gouvernement transitoire en Syrie.",
  "source": "Euronews",
  "date": "2025-03-17"
},
{

  "titre": "Nouvelle politique migratoire de l'UE",
  "contenu": "La Commission européenne propose une révision de la directive 'retour' de 2008 pour mieux gérer les migrations.",
  "source": "Amnesty International",
  "date": "2025-03-16"
},
{

  "titre": "Réforme des traités européens",
  "contenu": "L'UE envisage des changements pour éviter les blocages politiques liés à la montée de l'extrême droite.",
  "source": "Sauvons l'Europe",
  "date": "2025-03-15"
},
{

  "titre": "L'Allemagne investit dans l'IA",
  "contenu": "Le gouvernement allemand annonce un plan de 1 milliard d'euros pour le développement de l'intelligence artificielle.",
  "source": "Le Monde",
  "date": "2025-03-14"
},
{

  "titre": "Le Parlement européen débat sur l'énergie verte",
  "contenu": "Les députés européens discutent d'un plan visant à réduire la dépendance au gaz russe.",
  "source": "Euractiv",
  "date": "2025-03-13"
},
{

  "titre": "Accord commercial entre l'UE et le Mercosur",
  "contenu": "Les négociations avancent pour un accord de libre-échange avec le Mercosur, malgré des critiques sur l'environnement.",
  "source": "TF1 INFO",
  "date": "2025-03-12"
},
{

  "titre": "Crise agricole en France et en Espagne",
  "contenu": "Les agriculteurs manifestent contre les nouvelles réglementations environnementales imposées par Bruxelles.",
  "source": "Euronews",
  "date": "2025-03-11"
},
{

  "titre": "Changements dans la politique de défense européenne",
  "contenu": "Les États membres discutent d'une armée commune pour renforcer la sécurité européenne.",
  "source": "Bruxelles2",
  "date": "2025-03-10"
},
{

  "titre": "Sanctions contre la Russie",
  "contenu": "L'UE prépare un nouveau paquet de sanctions économiques contre Moscou.",
  "source": "Euractiv",
  "date": "2025-03-09"
},
{

  "titre": "Réforme du droit du travail en Italie",
  "contenu": "Le gouvernement italien propose de nouvelles mesures pour assouplir le marché du travail.",
  "source": "Le Monde",
  "date": "2025-03-08"
}]
)
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