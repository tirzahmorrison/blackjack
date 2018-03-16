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

const suits = ["spades", "clubs", "hearts", "diamonds"]
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

const getDeck = () => {
    const deck = []
    for (let i = 0; i < suits.length; i++) {
        for (let a=0; a <values.length; a++) {
            deck.push ({value: values[a], suit: suits[i]})
}
}
    return deck
}
      



//As a user I should be able to see three buttons for each player
const gameStart = () => {
  document.querySelector(".players .deal").addEventListener("click", () => {
    playerChoice(0, "deal")
  })
  document.querySelector(".players .hit").addEventListener("click", () => {
    playerChoice(0, "hit")
  })
  document.querySelector(".players .stay").addEventListener("click", () => {
    playerChoice(0, "stay")
  })


  document.querySelector("").addEventListener("click", choseWinner)
}

