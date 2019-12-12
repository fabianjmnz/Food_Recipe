
const firebaseConfig = {
  apiKey: "AIzaSyA0STLHFZxlgZ0sn4FQRhHunX0rIipNt7U",
  authDomain: "recipes-project-824a9.firebaseapp.com",
  databaseURL: "https://recipes-project-824a9.firebaseio.com",
  projectId: "recipes-project-824a9",
  storageBucket: "recipes-project-824a9.appspot.com",
  messagingSenderId: "111590592456",
  appId: "1:111590592456:web:1e808ba5da09b8a6223afd",
  measurementId: "G-1FWE3L8JEW"
};
firebase.initializeApp(firebaseConfig)
var firestore = firebase.firestore()


const docRef = firestore.collection("Recipes")
let name = document.getElementById("name")
let recipe = document.getElementById("recipe")
let preparation = document.getElementById("preparation")
let servings = document.getElementById("servings")
let url = document.getElementById("url")
const createdRecipeList = document.querySelector('.createdRecipe')
const listofFavourites = document.querySelector('.listofFavourites')

// let button = document.getElementById("button")
// let updateButton = document.getElementById("update")
// let textboxName = document.getElementById("textboxName")
// let textboxRecipe = document.getElementById("textboxRecipe")
// let textboxPrep = document.getElementById("textboxPrep")
// let textboxServ = document.getElementById("textboxServ")

//Admin Purpose
// var docRef1 = db.collection("Recipes").doc("Recipe1");
// docRef1.set({
//   name: "American Burger",
//   recipe: "blahblahblahblah",
//   prep: "something",
//   url: "www.google.com"
// })
// .then(function() {
//   console.log("Document successfully written!");

// })
// .catch(function(error) {
//   console.error("Error writing document: ", error);
// });

// docRef1.get().then(function(doc) {
//   if (doc.exists) {
//     let dishName = `<label>Name: ${doc.data().name}</label>`
//     let dishRecipe = `<label>Name: ${doc.data().recipe}</label>`
//     let dishPrep = `<label>Name: ${doc.data().prep}</label>`
//     let dishURL = `<label>Name: ${doc.data().url}</label>`
//     name.innerHTML = dishName;
//     recipe.innerHTML = dishRecipe;
//     preparation.innerHTML = dishPrep;
//     Url.innerHTML = dishURL;

//   } else {
//       // doc.data() will be undefined in this case
//       console.log("No such document!");
//   }
// }).catch(function(error) {
//   console.log("Error getting document:", error);
// });

// db.collection('Recipes').onSnapshot(snapshot => {
//   setupFavourites(snapshot.docs);
// })
docRef.onSnapshot(snapshot => {
 setupFavourites(snapshot.docs); 
})
const createForm = document.querySelector('#create-form')
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  docRef.add({
    name: createForm.name.value,
    ingredients: createForm.recipe.value,
    preparation: createForm.preparation.value,
    url:'www.google.com',
    servings: createForm.servings.value,
     image: createForm.url.value
    }).then(() => {
    //cleanup and close the modal, reset
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
    docRef.onSnapshot(snapshot => {
      setupFavourites(snapshot.docs);
    })
  })
})
// setup your html and see the data on DOM

const setupFavourites = (data) => {
 
  // console.log(data)
  if (data.length){
    let html='';
  data.forEach(doc => {
    const list = doc.data();
    console.log(doc._key.path.segments[6])
    console.log(doc.data())
    
    const li = `
      <li>
        <div><input onclick="showpic('${list.image}','${list.ingredients}','${list.name}','${list.preparation}',${list.servings},'${list.url}')" style="margin:25px 10px 3px 0px;float:left;width:100px" type="image" src="${list.image}" alt="Submit" ><span style="clear:left;display:block;text-align:center">${list.name}</span></div>
      </li>
    `;
    html += li;
  })
  listofFavourites.innerHTML = html
  }
}


    function showpic(thePicture,ingred1,name,prep1,serve,urls){
   document.getElementById('ok').src = `${thePicture}`
   document.getElementById('vi').src = `${urls}`

  document.getElementById('n').innerHTML = "Name: "+ name
  let array = ingred1.split(',')
  console.log(array)
  let html = ''
  for(i=0;i<(array.length);i++){
    const li = 
    `<li>${array[i]}</li>`

    html += li
    console.log(html)
  }
  document.getElementById('r').innerHTML = "Recipe: " + html
  let array1 = prep1.split(',')
  let html1 = ''
  for(i=0;i<(array1.length);i++){
    const li = 
    `<li>${array1[i]}</li>`
    html1 += li 
  }
   document.getElementById('p').innerHTML = "Prep: " + html1
   document.getElementById('s').innerHTML = "Servings: " + serve

 }

 
//  app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/homeMock.html");
// });
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
// button.addEventListener("click",()=>{
//   getRecipe();
// })
// updateButton.addEventListener("click",()=>{
//   console.log(db.collection("Recipes"))

//   updateRecipe();
// })

// function getRecipe(){
// // User INPUT
// // recipe: `${textboxRecipe.value}`,
// // name: `${textboxName.value}`,
// // prep: `${textboxPrep.value}`,
// // serving: `${textboxServ.value}`,
// // url: "www.google.com"
//   db.collection("Recipes").add({
//   name: createForm.name.value,
//   ingredients: createForm.recipe.value,
//   preparation: createForm.preparation.value,
//   url:'www.google.com',
//   servings: createForm.servings.value,
//    image: createForm.url.value
// }).then(() => {
//   //cleanup and close the modal, reset
//   const modal = document.querySelector('#modal-create');
//   M.Modal.getInstance(modal).close();
//   createForm.reset();
// })

//Fetching User Input

// .then(function(doc) {
//   console.log(doc.id)
//   db.collection("Recipes").doc(doc.id).get().then(function(doc){
//   console.log(doc)

//   if (doc.exists) {
//     let dishName = `<label>Name: ${doc.data().name}</label>`
//     let dishRecipe = `<label>Recipe: ${doc.data().recipe}</label>`
//     let dishPrep = `<label>Prep: ${doc.data().prep}</label>`
//     let dishServ = `<label>Servings: ${doc.data().serving}`
//     let dishURL = `<a href="https://www.somedomain.com/${doc.id}"><image width="300" height="300" src="#"></image></a>`

//     name.innerHTML = dishName;
//     recipe.innerHTML = dishRecipe;
//     preparation.innerHTML = dishPrep;
//     servings.innerHTML = dishServ;
//     Url.innerHTML = dishURL;

//   } else {
//       // doc.data() will be undefined in this case
//       console.log("No such document!");
//   }
// }).catch(function(error) {
//   console.log("Error getting document:", error);
// });
// })
// }

// function updateRecipe(){
//   db.collection("Recipes").doc(window.location.pathname).update({
//     recipe: `${textboxRecipe.value}`,
//     name: `${textboxName.value}`,
//     prep: `${textboxPrep.value}`,
//     serving: `${textboxServ.value}`,
//     url: "www.google.com"
//   })

//   //Fetching User Input

//   .then(function(doc) {
//     console.log(doc.id)
//     db.collection("Recipes").doc(doc.id).get().then(function(doc){
//     console.log(doc)

//     if (doc.exists) {
//       let dishName = `<label>Name: ${doc.data().name}</label>`
//       let dishRecipe = `<label>Recipe: ${doc.data().recipe}</label>`
//       let dishPrep = `<label>Prep: ${doc.data().prep}</label>`
//       let dishServ = `<label>Servings: ${doc.data().serving}`
//       let dishURL = `<video width="300" height="300" controls><source src="${doc.data().url}"></video>`
//       name.innerHTML = dishName;
//       recipe.innerHTML = dishRecipe;
//       preparation.innerHTML = dishPrep;
//       servings.innerHTML = dishServ;
//       Url.innerHTML = dishURL;

//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
//   }).catch(function(error) {
//     console.log("Error getting document:", error);
//   });
// })
