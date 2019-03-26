const functions = require('firebase-functions');
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp(functions.config().firebase);

exports.preg4 = functions.https.onRequest((req,res) =>{
	description = '';
    cResp = 0;
    cDiarrea = 0;
    cSangra = 0;
	admin.firestore().collection("urgencias").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data());
        if (description === '')
            description = 'Urgencias: <br>';

        if (doc.data().description.includes('respiratorio'))
            cResp = cResp +1;

        if (doc.data().description.includes('diarrea'))
            cDiarrea = cDiarrea +1;

        if (doc.data().description.includes('sangra'))
            cSangra = cSangra +1;
        
        description = description + "Problemas respiratorios: " + cResp + "<br>";
        description = description + "Problemas de diarrea : " + cDiarrea + "<br>";
        description = description + "Problemas de sangrado: " + cSangra + "<br>";
    	})
    res.send(description);
    return querySnapshot;
	})
	.catch(function(error) {
        console.log("Error getting documents: ", error);
        throw new Error('Error');
    });
});