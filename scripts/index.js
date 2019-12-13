// DOM elements
const createdRecipeList = document.querySelector('.createdRecipe');

const sharedRecipes = document.querySelector('.sharedRecipes');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const allRecipes = document.querySelector('.allRecipes')
const accountDetails = document. querySelector('.account-details');

// const idid = auth.uid;
// console.log(idid)

//const NANO = db.collection('users')

// setup UI toggle between logged in and logged out
const setupUI = (user) => {
  if(user){
    // db.collection(user.uid).add({
    //   key : value
    // })
    db.collection('users').doc(user.uid).get().then(doc => {
      console.log(doc.data())
      //console.log(user.firstName)
      //console.log(doc.data.firstName)
      //console.log(user.uid)
      const html = `
        <div> email: ${user.email}</div>
        <div> Logged in as ${doc.data().firstName}</div>
        <div id="myID" onclick="myIDD(this)" >${doc.id}</div>
      `;
      accountDetails.innerHTML = html
    })
    //toggle user UI elements
    loggedInLinks.forEach(item => item.style.display ='block');
    loggedOutLinks.forEach(item => item.style.diplsay='none');
  } else {
    // hide account info
    accountDetails.innerHTML = '';
    //toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'none')
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

const showAllRecipes = (recipes) => {
  let html ='';
  recipes.forEach(doc => {
    const list = doc.data();
    const li = `
        <li>
        <div class="collapsible-header grey lighten-4">${list.name}</div>
        <div class="collapsible-body white"> <img style="width:300px; height:auto" src="${list.image}"</div>
        <video  width="300" height="300" controls>
        <source src="${list.url}" ></video>
        </li>
    `;
    html += li;
    //console.log(html)
  })
  allRecipes.innerHTML = html
  //console.log(allRecipes)
}

// setup your html and see the data on DOM for shredRecipes
const mySharedRecipes = (data) => {
  if (data.length){
    let html='';
  data.forEach(doc => {
    //console.log(doc)
    const list = doc.data();
    //console.log(list);
   // console.log(doc.id);
    
    //console.log(list.url)
    const li = `
      <li>
        <button  onclick = "addToFavourites('${list.name}','${list.ingredients}','${doc.id}')">AddtoFav</button>
        <div  class="collapsible-header grey lighten-4">${list.name}</div>
        <div class="collapsible-body white"> <img style="width:300px; height:auto" src="${list.image}"</div>
        <video  width="300" height="300" controls>
        <source src="${list.url}" ></video>
      </li>
    `;
    html += li;
  })
  sharedRecipes.innerHTML = html
  } else {
    sharedRecipes.innerHTML = `<h5 class="center-align">Login to view your shared recipes</h5>`
  }
}

function addToFavourites(name1,ingredients1,id){
  // console.log(db.collection('users').doc(user.uid))
  // //console.log(db.collection("data").doc("one"))
  // NAN.add({
  //   NANO : name1
  // })
  let user = auth.currentUser;
  console.log(user)
  let anotheruser = user.uid;
  //console.log(anotheruser);
  db.collection('users').doc(anotheruser)
  .collection("favorites")
  .add({
    someName: name1
  })
  //console.log(name1)
}

function myIDD(obj){
  return (obj.innerText)
}



var docData = {
  stringExample: "Hello World!",
  booleanExample: true,
  numberExample: 3.14,
  dateExample: firebase.firestore.Timestamp.fromDate( new Date("December 12, 2019")),
  arrayExample: null, 
  objectExample: {
    a:5,
    b: {
      nested: "foo"
    }
  }
};
db.collection("data").doc("one").set(docData).then(function(){
  //console.log("Document successfully written")
});

// db.collection('Hello').doc(this.id).collection('booksList').add({
//   name: "hello",
//   id: this.id
// })
  const d= document.getElementById("myID")
//console.log(d)

// setup materialize components
document.addEventListener('DOMContentLoaded', function(){
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals)
  
   var items = document.querySelectorAll('.collapsible');
   M.Collapsible.init(items);
});


