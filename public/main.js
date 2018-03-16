const blackjack = {
  winner: "",
  choices: ["deal", "hit", "stay"],
  players: [
    {
      choice: ""
      
    },
    {
      choice: ""
      
    }
  ]
}


//build deck


//As a user I should be able to see three buttons for each player
const gameStart = () => {
  document.querySelector(".players .deal").addEventListener("click",()=>{
    playerChoice(0,"rock")
  })
  document.querySelector(".players .hit").addEventListener("click",()=>{
     playerChoice(0,"paper")
   })
   document.querySelector(".players .stay").addEventListener("click",()=>{
     playerChoice(0,"scissors")
   })
  
 
   document.querySelector(".go").addEventListener("click", choseWinner)
 }
 
