const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.addAdminClaim = functions.https.onCall((data, context) => {
  // FIRST secure that only 'admins' can make other users admins
  if (!context.auth.token.admin) {
    return { error: 'Only admins are allowed' };
  }

  // get user and add 'admin' custom claim

  const { email } = data;
  const adminClaim = {
    admin: true
  };

  return (
    admin
      .auth()
      .getUserByEmail(email)
      .then(user => user.uid)
      .then(uid => admin.auth().setCustomUserClaims(uid, adminClaim))

      // this is the response that will be returned to the caller
      .then(() => ({
        message: `Success: ${email} made to be an admin!`
      }))
      .catch(error => error) // return the error as resolved promise
  );
});
