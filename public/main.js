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
const deck = new Array()
const suits = ["spades", "diamonds", "clubs", "hearts"]
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

//create deck
const getDeck = () => {
  const deck = new Array()
for (const i = 0; i < suits.length; i++) {
  for (const a = 0; a < values.length; a++) {
    const card = () => {
      Value: values[a], Suit; suits[i]
    }
    deck.push(card)
  }
}
      return deck



//As a user I should be able to see three buttons for each player
const gameStart = () => {
  document.querySelector(".players .deal").addEventListener("click", () => {
    playerChoice(0, "rock")
  })
  document.querySelector(".players .hit").addEventListener("click", () => {
    playerChoice(0, "paper")
  })
  document.querySelector(".players .stay").addEventListener("click", () => {
    playerChoice(0, "scissors")
  })


  document.querySelector(".go").addEventListener("click", choseWinner)
}

