/**
 * seed_link.js
 *
 * After you import the JSON files with mongoimport (see README), run this script
 * to convert email placeholders (userEmail, fromUserEmail, toUserEmail, offerTitle, requestTitle)
 * into proper ObjectId references between collections.
 *
 * Usage:
 * 1. Set MONGODB_URI in env or pass as first arg.
 *    export MONGODB_URI="mongodb://localhost:27017/skillmitra"
 * 2. Install: npm install mongodb
 * 3. Run: node seed_link.js
 */
const { MongoClient, ObjectId } = require('mongodb');

const mongoUri = process.env.MONGODB_URI || process.argv[2] || 'mongodb://localhost:27017/skillmitra';
(async () => {
  const client = new MongoClient(mongoUri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db();
    const users = db.collection('users');
    const offers = db.collection('offers');
    const requests = db.collection('requests');
    const matches = db.collection('matches');

    // Build user email -> _id map
    const usersArr = await users.find().toArray();
    const emailToId = {};
    usersArr.forEach(u => { if(u.email) emailToId[u.email] = u._id; });

    // Update offers: userEmail -> user (ObjectId)
    const offerCursor = offers.find({ userEmail: { $exists: true } });
    while (await offerCursor.hasNext()) {
      const doc = await offerCursor.next();
      const uid = emailToId[doc.userEmail];
      if (uid) {
        await offers.updateOne({ _id: doc._id }, { $set: { user: uid }, $unset: { userEmail: "" }});
        console.log('Linked offer', doc.title, 'to user', doc.userEmail);
      }
    }

    // Update requests: fromUserEmail/toUserEmail
    const reqCursor = requests.find();
    while (await reqCursor.hasNext()) {
      const doc = await reqCursor.next();
      const updates = {};
      if (doc.fromUserEmail && emailToId[doc.fromUserEmail]) updates.fromUser = emailToId[doc.fromUserEmail];
      if (doc.toUserEmail && emailToId[doc.toUserEmail]) updates.toUser = emailToId[doc.toUserEmail];
      if (Object.keys(updates).length) {
        const unset = {};
        if (doc.fromUserEmail) unset.fromUserEmail = "";
        if (doc.toUserEmail) unset.toUserEmail = "";
        await requests.updateOne({ _id: doc._id }, { $set: updates, $unset: unset });
        console.log('Linked request', doc.title);
      }
    }

    // Update matches: convert offerTitle/requestTitle and emails
    const matchCursor = matches.find();
    while (await matchCursor.hasNext()) {
      const doc = await matchCursor.next();
      const updates = {};
      if (doc.offerTitle) {
        const off = await offers.findOne({ title: doc.offerTitle });
        if (off) updates.offer = off._id;
      }
      if (doc.requestTitle) {
        const rq = await requests.findOne({ title: doc.requestTitle });
        if (rq) updates.request = rq._id;
      }
      if (doc.fromUserEmail && emailToId[doc.fromUserEmail]) updates.fromUser = emailToId[doc.fromUserEmail];
      if (doc.toUserEmail && emailToId[doc.toUserEmail]) updates.toUser = emailToId[doc.toUserEmail];
      if (Object.keys(updates).length) {
        const unset = {};
        if (doc.offerTitle) unset.offerTitle = "";
        if (doc.requestTitle) unset.requestTitle = "";
        if (doc.fromUserEmail) unset.fromUserEmail = "";
        if (doc.toUserEmail) unset.toUserEmail = "";
        await matches.updateOne({ _id: doc._id }, { $set: updates, $unset: unset });
        console.log('Linked match', doc._id.toString());
      }
    }

    console.log('Linking complete.');
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
})();
