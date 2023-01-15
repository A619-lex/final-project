var database = firebase.database();
var firebase = require('firebase');
var firebaseui = require('firebaseui');
const carList = document.querySelector('#car-list');
const form = document.querySelector('#add-car-form');

// create element & render Car service
function renderservicetime(doc) {
    let li = document.createElement('li');

    let Status = document.createElement('span');
    let CustomerEmail = document.createElement('span');
    let BookingServicetype = document.createElement('span');
    let ServiceDay = document.createElement('span');
    let ServiceTime = document.createElement('span');
    let serviceby = document.createElement('span');

    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    CustomerEmail.textContent = doc.data().CustomerEmail;
    BookingServicetype.textContent = doc.data().BookingServicetype;
    Status.textContent = doc.data().Status;
    ServiceDay.textContent = doc.data().ServiceDay;
    ServiceTime.textContent = doc.data().ServiceTime;
    serviceby.textContent = doc.data().serviceby;
    cross.textContent = 'x';

    li.appendChild(CustomerEmail);
    li.appendChild(BookingServicetype);
    li.appendChild(Status);
    li.appendChild(ServiceDay);
    li.appendChild(ServiceTime);
    li.appendChild(serviceby);
    li.appendChild(cross);

    carList.appendChild(li);

    // deleting data

    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('deleting data');
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('servicetime').doc(id).delete();
    });

}


/*
// getting data
db.collection('servicetime').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        console.log("getting data");
        console.log(doc.data());
       // renderservicetime(doc);
    });
});
*/
db.collection('customers').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        console.log("getting data");
        console.log(doc.data());

    });
});


// real-time listener
db.collection('servicetime').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if (change.type == 'added') {
            renderservicetime(change.doc);
        } else if (change.type == 'removed') {
            let li = carList.querySelector('[data-id=' + change.doc.id + ']');
            carList.removeChild(li);
        }
    });
});

/*
function getCdata(){
    console.log('button working');

    // saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("saving data");
    db.collection('Vehicle').add({
        VehicleLicenceNumber: form.VehicleLicenceNumber.value,
        VehicleYear: form.VehicleYear.value,
        Brand: form.Brand.value,
        VehicleEngineType: form.VehicleEngineType.value,
        VehicleType: form.VehicleYear.value
    });
    form.VehicleLicenceNumber.value = '';
    form.VehicleYear.value = '';
    form.Brand.value = '';
    form.VehicleEngineType.value = '';
    form.VehicleType.value = '';
});
}
*/

// update service status

function updatestatus() {
    console.log('update status');
    var ServicestatusUpdate = document.getElementById("validationServer11").value;
    console.log(ServicestatusUpdate);
    var cutomerEmailG = document.getElementById("CustomerEmail").value;
    console.log(cutomerEmailG);

    db.collection('servicetime').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            console.log("get cutomer personal details");
            console.log(doc.data());
            console.log(doc.id);
            var userid = doc.id;
            console.log(userid);
            if (doc.data().CustomerEmail == cutomerEmailG) {
                console.log("-----------------");
                db.collection("servicetime").doc(doc.id).update({
                    Status: ServicestatusUpdate,
                })
                    .then(function () {
                        console.log("Document successfully written!");
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });
             }
        });
    });
}

// update service mechanic

function updatemechanic() {
    console.log('update mechanic');
    var servicebyUpdate = document.getElementById("validationServer12").value;
    console.log(servicebyUpdate);
    var cutomerEmailG = document.getElementById("CustomerEmail").value;
    console.log(cutomerEmailG);

    db.collection('servicetime').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            console.log("get cutomer personal details");
            console.log(doc.data());
            console.log(doc.id);
            var userid = doc.id;
            console.log(userid);
            if (doc.data().CustomerEmail == cutomerEmailG) {
                console.log("-----------------");
                db.collection("servicetime").doc(doc.id).update({
                    serviceby: servicebyUpdate,
                })
                    .then(function () {
                        console.log("Document successfully written!");
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });
             }
        });
    });
}


// get customer personal details

function getCdata(){
    console.log('get customer data');
    var cutomerEmailG = document.getElementById("CustomerEmail").value;
    console.log(cutomerEmailG);
    db.collection('customers').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            console.log("get cutomer personal details");
            console.log(doc.data());
            if (doc.data().CustomerEmail == cutomerEmailG) {
               document.getElementById("First-Name").innerHTML = doc.data().CustomerFirstName;
               document.getElementById("Last-Name").innerHTML = doc.data().CustomerSecondName;
               document.getElementById("Mobile-number").innerHTML = doc.data().CustomerMobileNumber;
             }
        });
    });
    }
