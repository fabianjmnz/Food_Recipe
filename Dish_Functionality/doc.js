// Inserting into data ***If data exist it will be overwritten***
var docRef = db.collection("cities").doc("LA");
docRef.set({
  name: "Los Angeles",
  state: "CA",
  country: "USA"
})
.then(function() {
  console.log("Document successfully written!");
  
})
.catch(function(error) {
  console.error("Error writing document: ", error);
});


//Merging with existing data without overwritting it
var cityRef = db.collection('cities').doc('BJ');
var setWithMerge = cityRef.set({
    capital: true
}, { merge: true });


//Get Data ONCE
docRef.get().then(function(doc) {
  if (doc.exists) {
    let usa = `<label>Name: ${doc.data().country}</label>`
    // console.log( doc.data().country);
    name.innerHTML = usa;
  } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
  }
}).catch(function(error) {
  console.log("Error getting document:", error);
});


//Update 
var washingtonRef = db.collection("cities").doc("DC");
// Set the "capital" field of the city 'DC'
return washingtonRef.update({
    capital: true
})
.then(function() {
    console.log("Document successfully updated!");
})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});

//Updating Nested fields
// Create an initial document to update.
var frankDocRef = db.collection("users").doc("frank");
frankDocRef.set({
    name: "Frank",
    favorites: { food: "Pizza", color: "Blue", subject: "recess" },
    age: 12
});
// To update age and favorite color:
db.collection("users").doc("frank").update({
    "age": 13,
    "favorites.color": "Red"
})
.then(function() {
    console.log("Document successfully updated!");
});


//Update elements in Array 
var washingtonRef = db.collection("cities").doc("DC");
// Atomically add a new region to the "regions" array field.
washingtonRef.update({
    regions: firebase.firestore.FieldValue.arrayUnion("greater_virginia")
});
// Atomically remove a region from the "regions" array field.
washingtonRef.update({
    regions: firebase.firestore.FieldValue.arrayRemove("east_coast")
});


//Deleting documents
db.collection("cities").doc("DC").delete().then(function() {
  console.log("Document successfully deleted!");
}).catch(function(error) {
  console.error("Error removing document: ", error);
});

//Deleting fields
var cityRef = db.collection('cities').doc('BJ');
// Remove the 'capital' field from the document
var removeCapital = cityRef.update({
    capital: firebase.firestore.FieldValue.delete()
});