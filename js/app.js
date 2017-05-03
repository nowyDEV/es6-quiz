import fetch from 'isomorphic-fetch'
document.querySelector('.btn').onclick = () => startQuiz()

const Quiz = {
  timer: 0,
  questions: [],
  userPoints: 0,
  currentQuestion: 0,
  inProgress: false
}

function startQuiz () {
  Quiz.inProgress = true
  Quiz.currentQuestion = 1
  loadQuestion(Quiz.questions, Quiz.currentQuestion)
}

function loadQuestion (questions, index) {
  return true
}

function getData () {
  const URL = 'https://cdn.rawgit.com/kdzwinel/cd08d08002995675f10d065985257416/raw/811ad96a0567648ff858b4f14d0096ba241f28ef/quiz-data.json'

  function processData (data) {
    Quiz.timer = data.time_seconds
    Quiz.questions = data.questions
    console.log(Quiz)
  }

  return fetch(URL)
    .then(response => response.json())
    .then(data => processData(data))
    .catch(error => console.log('BAD', error))
}

getData()

let countdown
const quizTimer = document.querySelector('.quiz-timer')
// const quizQuestions = document.querySelector('.quiz-questions')

function timer (seconds) {
  const presentTime = Date.now()
  const finishTime = presentTime + seconds * 1000
  displayTime(seconds)

  countdown = setInterval(() => {
    const secondsLeft = Math.round((finishTime - Date.now()) / 1000)
    if (secondsLeft < 0) {
      clearInterval(countdown)
    }
    displayTime(secondsLeft)
  }, 1000)
}

timer(300)

function displayTime (seconds) {
  const minutesLeft = Math.floor(seconds / 60)
  const secondsLeft = seconds % 60
  quizTimer.textContent = `${minutesLeft}
                            :
                            ${secondsLeft < 10 ? '0' : ''}
                            ${secondsLeft}`
}
