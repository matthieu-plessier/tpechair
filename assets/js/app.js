// Fonction affichage

let productsEl = document.getElementById('cardsProducts');
var collectionCart = [];
var nullCart = true;
let btnBeef = document.getElementById('beef');
let btnPoultry = document.getElementById('poultry');
let btnPork = document.getElementById('pork');
let btnHorse = document.getElementById('horse');

// bouton menu boeuf

btnBeef.addEventListener('click',function(){
  productsEl.innerHTML = "";
  fetch('/assets/data/products.json')
    .then((response) => response.json()) 
    .then((displayCards) => {
      displayCards.products.forEach((element) => { 
        if(element.type == "boeuf") {
          productsEl.innerHTML += displayCard(element);
          }
      });
        addToCart();
    });
      
})
// bouton menu volaille

btnPoultry.addEventListener('click',function(){
  productsEl.innerHTML = "";
    fetch('/assets/data/products.json')
      .then((response) => response.json()) 
      .then((displayCards) => {
        displayCards.products.forEach((element) => { 
          if(element.type == "volaille") {
            productsEl.innerHTML += displayCard(element);
              }
            });
            addToCart();
          });
          
})
// bouton menu porc

btnPork.addEventListener('click',function(){
  productsEl.innerHTML = "";
    fetch('/assets/data/products.json')
      .then((response) => response.json()) 
        .then((displayCards) => {
          displayCards.products.forEach((element) => { 
            if(element.type == "porc") {
              productsEl.innerHTML += displayCard(element);
            }
          });
          addToCart();
        });
        
}) 
// bouton menu cheval

btnHorse.addEventListener('click',function(){
  productsEl.innerHTML = "";
    fetch('/assets/data/products.json')
      .then((response) => response.json()) 
        .then((displayCards) => {
          displayCards.products.forEach((element) => { 
            if(element.type == "cheval") {
              productsEl.innerHTML += displayCard(element);
            }
          });
          addToCart();
        });
        
}) 
// fonction affichage d'une carte

const displayCard = (element)=>{
  let card = `<div class="col-4 card ml-2 mt-4 mb-4" style="width: 20rem;height:32rem;"><div class="">
    <img src="${element.img_src}" class="card-img-top "></div>
    <div class="card-body color">
      <h5 class="card-title">${element.title}</h5>
      <p class="card-text ">${element.desc}</p>
      <button class="btnColor" data-ref="${element.ref}" >ajouter au panier</button>
    </div>
  </div>`;
  
  return (card);
}
// fin fonction affichage

// function addToCart (ajouter au panier)
const addToCart = () => {
 
  let modalEl = document.getElementById("cart");
  let btnList = Array.from(document.getElementsByClassName("btnColor"));

  btnList.forEach(element => {
    element.addEventListener("click", function (e) {
      
      let datatest = e.target.dataset.ref;
      let testCart = false;
      fetch('/assets/data/products.json')
        .then((response) => response.json())
        .then((displayCards) => {
          displayCards.products.forEach((element) => {
            if (datatest == element.ref) {
              
              collectionCart.forEach(verif => {
                if (verif == element.ref) {
                  testCart = true;
                }
              });
              if (testCart) {
                
                let quantityTest = document.getElementById(element.ref)
                quantityTest.innerHTML++;
              }else {
                
                if (nullCart) {
                  modalEl.innerHTML = "";
                  nullCart = false;
                }
                modalEl.innerHTML += `
                <div class="d-flex cartElement w-100" data-ref="${element.ref}">
                  <img src="${element.img_src}" width="50px">
                  <p class="mr-5"> ${element.title} <br> ${element.price} € / KG </p>
                  <div class="d-flex ml-5">
                    
                    <p>quantité : <button> - </button> <span id="${element.ref}">1 </span><button class="btnPlus" data-ref="${element.ref}"> + </button></p>
                    
                  </div>
                `;
                collectionCart.push(element.ref);
                addQuantity(element);
              }
            }
          });
        })
    });
  });
}

// fonction suppression panier
//AJOUT DE QUANTITE
const addQuantity = (element) => {
  let btnPlus = document.querySelector(".btnPlus");

 
  btnPlus.addEventListener("click", function(){
    let quantityTest = document.getElementById(element.ref)
    quantityTest.innerHTML++;
  });
}