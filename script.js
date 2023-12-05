const gameContainer = document.getElementById("game");
let score = 0;
document.querySelector('#highscore').innerText=localStorage.getItem('highscore');

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

const restart = document.querySelector('button');
restart.addEventListener('click',function(){
  location.reload();
})

updateCards = function(){
  const cards = document.querySelectorAll('div');
  for(let card of cards){
    if(card.getAttribute('id')=='guess' || card.getAttribute('id')=='match'){
      card.style.backgroundColor = card.getAttribute('class');
    }
    else{
     card.style.backgroundColor = 'white';
    }
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
 
  if(document.querySelectorAll('#guess').length < 2 && event.target.getAttribute('id')!='match'){
    event.target.setAttribute('id','guess');
  }

  updateCards();

  setTimeout(function(){
    if(document.querySelectorAll('#guess').length == 2){
      const guesses = document.querySelectorAll('#guess');
      if(guesses[0].getAttribute('class')==guesses[1].getAttribute('class')){
        guesses[1].setAttribute('id','match');
        guesses[0].setAttribute('id','match');
        score=score+2;
        if(document.querySelectorAll('#match').length==COLORS.length){
          if(score>parseInt(localStorage.getItem('highscore'))){
            localStorage.setItem('highscore',score);
            document.querySelector('#highscore').innerText=score+" NEW HIGH SCORE!";
          }
        }        
      }
      else{
        guesses[1].removeAttribute('id','guess');
        guesses[0].removeAttribute('id','guess');
        score--;
        updateCards();
      }
      document.querySelector('#score').innerText = score;
    }

  },1000)
}  


// when the DOM loads
createDivsForColors(shuffledColors);
