const functions = require('firebase-functions');
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp(functions.config().firebase);

exports.dar = functions.https.onRequest((req,res) =>{
	products = ''
	admin.firestore().collection("productos").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        products = products + JSON.stringify(doc.data())
        
    	})
    res.send(products)
    return querySnapshot
	})
	.catch(function(error) {
        console.log("Error getting documents: ", error);
        throw new Error('Error')
    });
});