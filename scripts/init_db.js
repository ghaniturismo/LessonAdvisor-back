
db.getCollection('people').insertMany([
    {
        "photo": "https://randomuser.me/portraits/women/59.jpg",
        "firstname": "Leanne",
        "lastname": "Woodard",
        "entity": "BIOSPAN",
        "birthDate": ISODate("1974-01-01T23:00:00.000Z"),
        "email": "Leanne.Woodard@BIOSPAN.com",
        "phone": "0784112248",
        "address": {
            "street": "Narrows Avenue",
            "postalCode": NumberInt(70534),
            "city": "Boling"
        }
	},
    {
        "photo": "https://randomuser.me/portraits/women/9.jpg",
        "firstname": "Erika",
        "lastname": "Guzman",
        "entity": "CIRCUM",
        "birthDate": ISODate("1962-03-18T23:00:00.000Z"),
        "email": "Erika.Guzman@CIRCUM.com",
        "phone": "0678412587",
        "address": {
            "street": "Havemeyer Street",
            "postalCode": NumberInt(76154),
            "city": "Yardville"
        }
	}
]);


db.getCollection('people').updateMany({},
	{ $set: { "teachers": [], "students": [] } }
);

