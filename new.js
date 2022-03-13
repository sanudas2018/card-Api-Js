// https://deckofcardsapi.com/
// object of array

// searchButton
// search-field
// error handel Function
document.getElementById('error').style.display='none';
const error = (action,message) => {
   const errorDiv = document.getElementById('error')
   const error = document.getElementById('message');
   errorDiv.style.display = action;
   error.innerText = message;
}
// error handel Function

const searchButton = () => {
   const input = document.getElementById('search-field');
   const inputValue = input.value;
   const inputVlaueInt = parseInt(inputValue);
   // console.log(inputValue);
   const main = document.getElementById('search-result');
   if(isNaN(inputValue) || inputValue == ''){
      // String value are not allow
      // alert('String value are not allow');
      error('block','Please Give A Number');
      main.textContent ='';
   }else if(inputValue <= 0){
      error('block','Please Give A Positive Number');
      main.textContent ='';
   }else{
      // যখন সার্চ দেওয়া হবে তখন ঐ ভ্যালু অনুযায়ী শো করবে 
      main.textContent ='';
      const url = `https://deckofcardsapi.com/api/deck/new/draw/?count=${inputVlaueInt}`;
      fetch(url)
         .then(Response => Response.json())
         .then(data => cardShow(data.cards))
         error('none','');

   }
   input.value= '';
};
// search-result
const cardShow = (data) => {
   // console.log(data);
   const main = document.getElementById('search-result');
   //এটাও করা যাবে ( যখন সার্চ দেওয়া হবে তখন ঐ ভ্যালু অনুযায়ী শো করবে )
   // main.textContent ='';
   for(const card of data){
      // console.log(card);
      const div = document.createElement('div');
      div.classList.add('col');
      div.innerHTML =`
         <div class="card">
            <img src="${card.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${card.code}</h5>
            <p class="card-text">${card.value}</p>
            <p class="card-text">${card.suit}</p>
            <button href="#" onclick="cardDetails('${card.code}')" class="btn btn-primary w-75">Card Detail</button>
            </div>
         </div>
      `;
      main.appendChild(div);

   }
};

const cardDetails = (code) => {
  /*  console.log(singledata)
   const urlInt = parseInt(singledata)
   const url = `https://deckofcardsapi.com/api/deck/new/draw/?count=${urlInt}`; */
   console.log(code)
   const url = `https://deckofcardsapi.com/api/deck/new/draw/?count=52`;
   console.log(url);
      fetch(url)
         .then(Response => Response.json())
         .then(data => {
            const allCards = data.cards;
            const singleCardData = allCards.find(card => card.code === code)
            singleDataShow(singleCardData)
         });
         // error('none','');
};

const singleDataShow = (data) => {
   // console.log(data)
   const singleCard = document.getElementById('single-card');
   singleCard.textContent = "";
   const div = document.createElement('div');
   div.classList.add('col');
   
   // console.log(div)
   div.innerHTML = `
      <div class="card">
         <img  src="${data.image}" class="card-img-top img-thumbnail" alt="...">
         <div class="card-body">
            <h5 class="card-title">${data.code}</h5>
            <p class="card-text">${data.value}</p>
            <p class="card-text">${data.suit}</p>
         </div>
      </div>
   `;
   singleCard.appendChild(div);

};

