// Initialize Firebase
var config = {
  apiKey: "AIzaSyCV17EfwMCqdTyqL_ONKETYTZ6QFqkvU08",
  authDomain: "cct-college-alejandro.firebaseapp.com",
  databaseURL: "https://cct-college-alejandro-default-rtdb.firebaseio.com/",
  projectId: "cct-college-alejandro",
  storageBucket: "cct-college-alejandro.appspot.com",
  messagingSenderId: "97171762789",
  appId: "1:97171762789:web:fd89b710d2d7b2fd6fe08c",
  measurementId: "G-W9PK0RS782"
};
  firebase.initializeApp(config);

  var database = firebase.database();
  var firebase = require('firebase');
  var firebaseui = require('firebaseui');

const servicelist = document.querySelector('#Items-list');


function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }


// create element & render customer data

function renderItems(doc){
    console.log(doc);
    let li = document.createElement('li');
    let number = document.createElement('span');
    let item = document.createElement('span');
    let price = document.createElement('span');


    li.setAttribute('data-id', doc.id);
    number.textContent = doc.number;
    item.textContent = doc.Items;
    price.textContent = doc.price;




    li.appendChild(number);
    li.appendChild(item);
    li.appendChild(price);


    servicelist.appendChild(li);

}




database.ref('/').once('value', function(snapshot){
    console.log(snapshot.val());
    if (snapshot.val() == "setData"){
        console.log("HHHHH");
    }
  });

  var i;
function getparts() {
    console.log("working itt");
    // on() method
    for (i = 0; i < 100; i++) {

        firebase.database().ref(i).once('value', (snap) => {
            console.log(snap.val());
            renderItems(snap.val());
            //console.log(snap.val().Items);
            //document.getElementById("json").innerHTML = snap.val().Items;
        });
    }
}
