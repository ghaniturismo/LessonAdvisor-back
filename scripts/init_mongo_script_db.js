conn = new Mongo();
db = conn.getDB("lessonAdvisor-app");

db.lessonplaces.insertMany(
    [
        {
            "name_teacher": "ghaniturismo",
            "email": "abcdef@wanadoo.fr",
            "phone": "06 45 12 45 35",
            "website": "www.google.fr",
            "description": "Je donne des supers cours en anglular 8 .",
            "numberOfPerson": NumberInt(12),
            "address": {
                "city": "Brumath",
                "postalCode": NumberInt(67170),
                "street": "16 rue du Général de Gaulle"
            }
        }
    ]
);
db.users.insertMany(
    [
        /* 1 */
        {
            "email" : "jessel@wanadoo.fr",
            "fullname" : "K",
            "phone" : "guitare basse",
            "city" : "guitare basse",
            "avatar" : "guitare basse",
            "password" : "guitare basse",

        }
    ]
);
