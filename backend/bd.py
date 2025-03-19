from pymongo import MongoClient
import requests

server = "34.251.25.31" # or localhost
username = "ortecusdb"
password = "passdb*2019#"
port = 27017

if server == 'localhost':
    client = MongoClient("mongodb://localhost", username=username,password=password, port=port)
else:
    client = MongoClient(server, username=username,password=password, port=port)
# creation DB
client = MongoClient("localhost:27017")
db = client["HACKATON_Hetic"]
# users = db["Users"]
# user_scores = db["Score"]
# # creation collection
# db["rooms"].insert_one(
#   {

#   "admin_id": "1234567890",
#   "room_code": "VGQZCN",
#   "questions": [
#     {
#       "question": "TEST",
#       "question_id": "qanm6kdi",
#       "type": "QCM",
#       "options": [
#         "A",
#         "B",
#         "C",
#         "D"
#       ],
#       "correct_answer": "A",
#       "points": 34
#     },
#     {
#       "question": "TEST2",
#       "question_id": "qb3gxf6k",
#       "type": "QCM",
#       "options": [
#         "E",
#         "F",
#         "G",
#         "H"
#       ],
#       "correct_answer": "G",
#       "points": 10
#     }
#   ],
#   "statut": "Wait",
#   "players": [],
#   "status": "In progress"
# }
# )
# print('fait')
# db.questions.insert_many(
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
# # qcm = db.Questions.find({"type":"multipleChoice"})
# # for i in qcm:
# #   print(i)
# # exist_user = db.Users.find_one({"email": "a@gmail.com"})
# # user_id = str(exist_user["_id"])
# # print(user_id)