import fetch from 'isomorphic-fetch'

const actionButton = document.querySelector('.btn')
const questionsField = document.querySelector('.quiz-questions')
let countdown
const quizTimer = document.querySelector('.quiz-timer')

actionButton.onclick = () => startQuiz()

const Quiz = {
  timer: 0,
  questions: [],
  userPoints: 0,
  currentQuestion: 0,
  correctAnswer: 0
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

function showResult () {
  const result = Quiz.userPoints
  const total = Quiz.questions.length
  actionButton.style.display = 'none'
  questionsField.style.display = 'none'
  quizTimer.style.display = 'none'
  document.querySelector('.quiz-results').innerHTML = `Correct answers: ${result} / ${total}`
}

function processAnswer () {
  if (Quiz.currentQuestion < Quiz.questions.length) {
    const answer = parseInt(document.querySelector('input[name=answer]:checked').getAttribute('id'))
    if (answer === Quiz.correctAnswer) {
      Quiz.userPoints += 1
      console.log(Quiz.userPoints)
    }
    updateQuestion(Quiz.questions, Quiz.currentQuestion)
  } else showResult()
}

function startQuiz () {
  actionButton.onclick = () => processAnswer()
  timer(Quiz.timer)
  actionButton.innerHTML = 'next'
  actionButton.setAttribute('disabled', '')
  updateQuestion(Quiz.questions, Quiz.currentQuestion)
}

function updateQuestion (questions, index) {
  const question = questions[index]
  questionsField.innerHTML = loadQuestion(question)
  Quiz.currentQuestion += 1
  actionButton.setAttribute('disabled', '')
  const answerInputs = document.getElementsByClassName('quiz-questions__answer')
  for (let i = 0; i < answerInputs.length; i++) {
    answerInputs[i].addEventListener('click', function () {
      actionButton.removeAttribute('disabled')
    })
  }
}

function loadQuestion (question) {
  return `<h3 class="quiz-questions__title">${question.question}</h3>"
            <form class="quiz-questions__form">
                ${loadAnswers(question.answers)}    
            </form>`
}

function updateCorrectAnswer (id) {
  Quiz.correctAnswer = id
}

function loadAnswers (answers) {
  return answers.map((answer) => {
    if (answer.correct) {
      updateCorrectAnswer(answer.id)
    }
    return `<input type="radio" name="answer" value="${answer.answer}" class="quiz-questions__answer" id="${answer.id}">${answer.answer}`
  })
}

function timer (seconds) {
  const presentTime = Date.now()
  const finishTime = presentTime + seconds * 1000
  displayTime(seconds)

  countdown = setInterval(() => {
    const secondsLeft = Math.round((finishTime - Date.now()) / 1000)
    if (secondsLeft < 0) {
      clearInterval(countdown)
      showResult()
    }
    displayTime(secondsLeft)
  }, 1000)
}

function displayTime (seconds) {
  const minutesLeft = Math.floor(seconds / 60)
  const secondsLeft = seconds % 60
  quizTimer.textContent = `${minutesLeft}
                            :
                            ${secondsLeft < 10 ? '0' : ''}
                            ${secondsLeft}`
}
