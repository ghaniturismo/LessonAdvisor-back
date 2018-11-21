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
        },
        {
        "name_teacher": "ghaniturismo",
        "email": "gg@gmail.fr",
        "phone": "06 45 12 45 35",
        "website": "www.google.fr",
        "description": "Je donne des supers cours en anglular 8 .",
        "numberOfPerson": NumberInt(12),
        "address": {
            "city": "Brumath",
            "postalCode": NumberInt(67170),
            "street": "16 rue du Général de Gaulle"
        }
    },
    ]
);
db.users.insertMany(
    [
        /* 1 */
        {
            "email" : "kiko@wanadoo.fr",
            "fullname" : "K",
            "phone" : "0789252536",
            "city" : "Fr",
            "avatar" : "https://www.google.fr/imgres?imgurl=https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg&imgrefurl=https://pixabay.com/fr/image-statue-laiton-enfant-art-1465348/&h=642&w=960&tbnid=wgUthJuyPjtLCM:&q=image&tbnh=133&tbnw=200&usg=AI4_-kQkz1RFdXLlGYuV1g41jeevwBJ2pg&vet=1&docid=U8m5hfTdF1EIwM&itg=1&sa=X&ved=2ahUKEwjfwYbOmOTeAhUSzoUKHXwNBNcQ_B0wE3oECAYQBg",
            "password" : "1234",

        },
        /* 2 */
        {
            "email" : "toto@gmail.com",
            "fullname" : "K",
            "phone" : "0789252536",
            "city" : "ENGLAND",
            "avatar" : "https://www.google.fr/imgres?imgurl=https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg&imgrefurl=https://pixabay.com/fr/image-statue-laiton-enfant-art-1465348/&h=642&w=960&tbnid=wgUthJuyPjtLCM:&q=image&tbnh=133&tbnw=200&usg=AI4_-kQkz1RFdXLlGYuV1g41jeevwBJ2pg&vet=1&docid=U8m5hfTdF1EIwM&itg=1&sa=X&ved=2ahUKEwjfwYbOmOTeAhUSzoUKHXwNBNcQ_B0wE3oECAYQBg",
            "password" : "1234",

        }
    ]
);
