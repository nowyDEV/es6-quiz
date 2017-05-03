import fetch from 'isomorphic-fetch'

const actionButton = document.querySelector('.btn')
actionButton.onclick = () => startQuiz()
const questionsField = document.querySelector('.quiz-questions')

const Quiz = {
  timer: 0,
  questions: [],
  userPoints: 0,
  currentQuestion: 0
}

function showResult () {
  const result = Quiz.userPoints
  const total = Quiz.questions.length
  document.querySelector('.quiz-results').innerHTML = `Correct answers: ${result} / ${total}`
}

function processAnswer () {
  if (Quiz.currentQuestion <= Quiz.questions.length) {
    const answer = document.querySelector('input[name=answer]:checked')
    console.log(answer)
  } else showResult()
}

function startQuiz () {
  Quiz.inProgress = true
  Quiz.currentQuestion = 1
  actionButton.innerHTML = 'next'
  actionButton.onclick = () => processAnswer()
  updateQuestion(Quiz.questions, 0)
}

function updateQuestion (questions, index) {
  const question = questions[index]
  questionsField.innerHTML = loadQuestion(question)
}

function loadQuestion (question) {
  return `<h3 class="quiz-questions__title">${question.question}</h3>"
            <form class="quiz-questions__form">
                ${loadAnswers(question.answers)}    
            </form>`
}

function loadAnswers (answers) {
  return answers.map((answer) => {
    return `<input type="radio" name="answer" value="${answer.answer}" class="quiz-questions__answer">${answer.answer}`
  })
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
