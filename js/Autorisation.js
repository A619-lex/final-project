var database = firebase.database();
var firebase = require('firebase');
var firebaseui = require('firebaseui');


var loginemail ;
var userEmailHolder = "userEmailHolder";


/*
db.collection('guides').get().then(snapshot => {
  setupGuides(snapshot.docs);
  console.log(snapshot.docs);
});
*/
// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in: ', user);
    db.collection('guides').onSnapshot(snapshot => {
      setupGuides(snapshot.docs);
      setupUI(user);
      //console.log("itt test megy", user.email);
      loginemail = user.email;
      passEmail(loginemail);
      //console.log(loginemail);
    });
  } else {
    console.log('user logged out');
    setupUI();
    setupGuides([]);
  }
});

// create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('guides').add({
    title: createForm.title.value,
    content: createForm.content.value
  }).then(() => {
    // close the create modal & reset form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(err => {
    console.log(err.message);
  });
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
    //console.log('user signed out');
    document.getElementById("userEmail").innerHTML = "User e-mail";

});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  loginemail = email;
  console.log(loginemail);
  document.getElementById("userEmail").innerHTML = email;
  //document.getElementById("userEmail").innerHTML = "Paragraph changed!";

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    //console.log(cred.user);
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });

});

function getpersonalInfo(){
  //console.log(loginemail);
  document.getElementById("email").innerHTML = loginemail;
  getdata();
  getVehicledata();
}

function logouticon(){
  console.log("logout");
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
    console.log('user signed out');

});
}

// get customer personal details

function getdata(){
db.collection('customers').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        //console.log("get cutomer personal details");
        //console.log(doc.data());
        if (doc.data().CustomerEmail == loginemail) {
           document.getElementById("First-Name").innerHTML = doc.data().CustomerFirstName;
           document.getElementById("Last-Name").innerHTML = doc.data().CustomerSecondName;
           document.getElementById("Mobile-number").innerHTML = doc.data().CustomerMobileNumber;
         }
    });
});
}
// get cutomer Vehicle details

function getVehicledata(){
  db.collection('Vehicle').get().then(snapshot => {
      snapshot.docs.forEach(doc => {
          //console.log("get cutomer personal details");
          //console.log(doc.data());
          if (doc.data().CustomerEmail == loginemail) {
             document.getElementById("Licence-Number").innerHTML = doc.data().VehicleLicenceNumber;
             document.getElementById("Vehicle-type").innerHTML = doc.data().Vehicletype;
             document.getElementById("Engine-Type").innerHTML = doc.data().VehicleEngineType;
             document.getElementById("Vehicle-Year").innerHTML = doc.data().VehicleYear;
             document.getElementById("Vehicle-brand").innerHTML = doc.data().Vehiclebrand;
            //console.log("Hi");
           }
      });
  });
  }


setDataRef = database.ref("/passEmail");
setDataRef.on('child_changed', function(snapshot) {
  console.log("Below is the data from child_changed");
  console.log(snapshot.val());
});

// pass the user email address to access from other page
function passEmail(x){
  var data = x;
  //console.log(x);
  var dataRef = database.ref('/passEmail');
  //console.log(data)
  dataRef.set({
    value: data
  });
}
