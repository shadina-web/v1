SkillMitra MongoDB data package
-------------------------------

This package contains JSON data files for MongoDB collections and a small helper script
to link documents together after import.

Files:
- users.json
- offers.json  (contains userEmail placeholders)
- requests.json (contains fromUserEmail/toUserEmail placeholders)
- matches.json (contains offerTitle/requestTitle and user email placeholders)
- seed_link.js  (Node script that converts email/title placeholders into ObjectId references)
- import_commands.txt (mongoimport commands)

How to import into MongoDB (local or Atlas):

1) Ensure you have mongoimport (comes with MongoDB tools).
2) From this folder, run:
   mongoimport --db skillmitra --collection users --file users.json --jsonArray
   mongoimport --db skillmitra --collection offers --file offers.json --jsonArray
   mongoimport --db skillmitra --collection requests --file requests.json --jsonArray
   mongoimport --db skillmitra --collection matches --file matches.json --jsonArray

3) Run the linker to convert placeholders into ObjectId references:
   - Install Node deps (only mongodb driver needed): npm install mongodb
   - Set MONGODB_URI environment variable if necessary (default: mongodb://localhost:27017/skillmitra)
   - Run: node seed_link.js

After that, offers/request/matches will reference actual user/offer/request ObjectIds.

Notes:
- The JSON files are safe to inspect/edit. If your frontend expects different field names, adjust them before importing.
- If you prefer BSON/mongodump format, I can provide that too.

Enjoy — tell me if you want an Atlas-ready dump or direct MongoDB Atlas import steps.
