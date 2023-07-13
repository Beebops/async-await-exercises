const deckURL = 'https://www.deckofcardsapi.com/api/'
const cardDiv = document.querySelector('#card-table')
const dealBtn = document.querySelector('#deal-btn')
let deckId = null

document.addEventListener('DOMContentLoaded', () => {
  getDeck()
})

dealBtn.addEventListener('click', dealCard)

async function getDeck() {
  try {
    const response = await axios.get(`${deckURL}deck/new/shuffle/`)
    deckId = response.data.deck_id
  } catch (error) {
    console.error('Error fetching data:', error.message)
  }
}

async function dealCard() {
  try {
    const response = await axios.get(`${deckURL}deck/${deckId}/draw/`)
    let cardURL = response.data.cards[0].image
    const cardImg = document.createElement('img')
    cardImg.src = cardURL
    cardDiv.appendChild(cardImg)
    if (response.data.remaining === 0) {
      dealBtn.removeEventListener('click', dealCard)
    }
  } catch (error) {
    console.error('Error fetching data:', error.message)
  }
}
