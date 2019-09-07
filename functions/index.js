const functions = require('firebase-functions');
const json2csv = require("json2csv").parse;

// The Firebase Admin SDK to access the Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

const validateFirebaseIdToken = (req, res, next) => {
  console.log('Check if request is authorized with Firebase ID token');
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
        	  'Make sure you authorize your request by providing the following HTTP header:',
		  'Authorization: Bearer <Firebase ID Token>',
		  'or by passing a "__session" cookie.');
    res.status(403).send('Unauthorized');
    return;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
  }
  admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
    console.log('ID Token correctly decoded', decodedIdToken);
    req.user = decodedIdToken;
    next();
    return null;
  }).catch(error => {
    console.error('Error while verifying Firebase ID token:', error);
    res.status(403).send('Unauthorized');
  });
};

/**
 *  Create csv file from the firestore 'membership' collection.  Read the full
 *  collection, converting each item into JSON.  Then use json2csv to covert
 *  to csv.  Embed the csv in the response.
 */
exports.csvJsonReport = functions.https.onRequest((request, response) => {
  validateFirebaseIdToken(request, response, buildReport);
});

const buildReport = async (request, response) => {
  let snapshot = await admin.firestore().collection('membership').get();
  let report = '';
      
  snapshot.forEach(doc => {
    let name = doc.get('name');
    let email = doc.get('email');
    let zip = doc.get('zip');

    if (report === '') {
      report += `{ "name": "${name}",  "email" :  "${email}", "zip" : "${zip}" }`;
    } else {
      report += `, { "name": "${name}",  "email" :  "${email}", "zip" : "${zip}" }`;	  
    }
  });
  report = `[ ${report} ]`;

  // Docs for json2csv - https://github.com/zemirco/json2csv
  const csv = json2csv(JSON.parse(report));

  response.setHeader(
    "Content-disposition",
    "attachment; filename=membership.csv"
  )
  response.set("Content-Type", "text/csv")
  response.status(200).send(csv);
};



