const functions = require('firebase-functions');
const json2csv = require("json2csv").parse;

// The Firebase Admin SDK to access the Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

/**
 *  Create csv file from the firestore 'membership' collection.  Read the full
 *  collection, converting each item into JSON.  Then use json2csv to covert
 *  to csv.  Embed the csv in the response.
 */
exports.csvJsonReport = functions.https.onRequest(async (request, response) => {
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
  response.status(200).send(csv)
});



