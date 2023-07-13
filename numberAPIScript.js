const baseURL = 'http://numbersapi.com/'
const randomNum = Math.floor(Math.random() * 100) + 1
const randomNums = generateRandomNums()
const favNum = 42

async function get4Facts(favNum) {
  try {
    const ul = document.querySelector('#forty-two-list')

    for (let i = 0; i < 4; i++) {
      const response = await axios.get(`${baseURL}${favNum}/trivia?json`)
      console.log(response.data.text)
      const li = document.createElement('li')
      li.textContent = response.data.text
      ul.appendChild(li)
    }
  } catch (error) {
    console.error('Error fetching data:', error.message)
  }
}

async function getFavNumFact(randomNum) {
  try {
    const randomFactP = document.querySelector('#random-fact')
    const randomNumberSpan = document.querySelector('#random-number')
    randomNumberSpan.textContent = randomNum

    const { data } = await axios.get(`${baseURL}${randomNum}/trivia?json`)
    randomFactP.textContent = data.text
  } catch (error) {
    console.error('Error fetching data:', error.message)
  }
}

async function getRandomFacts(num1, num2, num3) {
  try {
    document.querySelector('#first').textContent = num1
    document.querySelector('#second').textContent = num2
    document.querySelector('#third').textContent = num3

    const { data } = await axios.get(`${baseURL}${num1},${num2},${num3}`)

    document.querySelector('#num1').textContent = data[num1]
    document.querySelector('#num2').textContent = data[num2]
    document.querySelector('#num3').textContent = data[num3]
  } catch (error) {
    console.error('Error fetching data:', error.message)
  }
}

function generateRandomNums() {
  return Array.from({ length: 3 }, () => Math.floor(Math.random() * 100) + 1)
}

function eventHandler() {
  getFavNumFact(randomNum)
  getRandomFacts(...randomNums)
  get4Facts(favNum)
}

document.addEventListener('DOMContentLoaded', () => {
  eventHandler()
})
