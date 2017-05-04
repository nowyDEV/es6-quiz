import fetch from 'isomorphic-fetch'
import { apiUrl } from './config'
import { displayTime } from './utils'

function app () {
  const actionButton = document.querySelector('.quiz-btn')
  const questionsField = document.querySelector('.quiz-questions')
  const quizTimer = document.querySelector('.quiz-timer')
  const quizResults = document.querySelector('.quiz-results')
  let countdown

  actionButton.onclick = () => Quiz.start()

  const Quiz = {
    timer: 0,
    questions: [],
    userPoints: 0,
    currentQuestion: 0,
    correctAnswer: 0,
    updateCorrectAnswer (id) {
      this.correctAnswer = id
    },
    getData () {
      const processData = (data) => {
        this.timer = data.time_seconds
        this.questions = data.questions
        console.log(this)
      }

      return fetch(apiUrl)
        .then(response => response.json())
        .then(data => processData(data))
        .catch(error => console.log('Something went wrong', error))
    },

    start () {
      actionButton.onclick = () => processAnswer()
      actionButton.innerHTML = 'Next'
      actionButton.classList.add('sg-button-primary--disabled')
      actionButton.setAttribute('disabled', '')
      timer(this.timer)
      updateQuestion(this.questions, 0)
    },

    reset () {
      this.userPoints = 0
      this.currentQuestion = 0
      this.correctAnswer = 0
      questionsField.style.display = 'block'
      quizTimer.style.display = 'block'
      quizResults.style.display = 'none'
      this.start()
    },

    showResult () {
      questionsField.style.display = 'none'
      quizTimer.style.display = 'none'
      actionButton.innerHTML = 'Try Again'
      actionButton.onclick = () => this.reset()
      quizResults.innerHTML = `<div class="sg-flash">
                                 <div class="sg-flash__message">
                                   <div class="sg-text sg-text--emphasised sg-text--standout sg-text--light">
                                     Correct answers: 
                                                      <div class="sg-badge sg-badge--large sg-badge--blue-secondary-light">
                                                        <div class="sg-text sg-text--emphasised sg-text--standout sg-text--blue"> ${this.userPoints} / ${this.questions.length}</div>
                                                      </div>
                                   </div>
                                 </div>
                               </div>`
      quizResults.style.display = 'block'
    }
  }

  Quiz.getData()

  function processAnswer () {
    if (Quiz.currentQuestion < Quiz.questions.length) {
      const answer = parseInt(document.querySelector('input[name=answer]:checked').getAttribute('id'))
      if (answer === Quiz.correctAnswer) {
        Quiz.userPoints += 1
      }
      updateQuestion(Quiz.questions, Quiz.currentQuestion)
    } else Quiz.showResult()
  }

  function updateQuestion (questions, index) {
    const question = questions[index]
    questionsField.innerHTML = loadQuestion(question)
    Quiz.currentQuestion += 1
    actionButton.classList.add('sg-button-primary--disabled')
    actionButton.setAttribute('disabled', '')
    const answerInputs = document.getElementsByClassName('quiz-questions__answer')
    for (let i = 0; i < answerInputs.length; i++) {
      answerInputs[i].addEventListener('click', function () {
        actionButton.classList.remove('sg-button-primary--disabled')
        actionButton.removeAttribute('disabled')
      })
    }
  }

  const loadQuestion = (question) => {
    return `<h3 class="quiz-questions__title">${question.question}</h3>
            <form class="quiz-questions__form">
                ${loadAnswers(question.answers).join('')}    
            </form>`
  }

  const loadAnswers = (answers) => {
    return answers.map((answer) => {
      if (answer.correct) {
        Quiz.updateCorrectAnswer(answer.id)
      }

      return `<div class="sg-label sg-label--secondary">
              <div class="sg-label__icon">
                  <div class="sg-radio">
                      <input class="sg-radio__element quiz-questions__answer" type="radio" id="${answer.id}" name="answer">
                      <label class="sg-radio__ghost" for="${answer.id}"></label>
                  </div>
              </div>
              <label class="sg-label__text" for="${answer.id}">${answer.answer}</label>
            </div>`
    })
  }

  function timer (seconds) {
    clearInterval(countdown)

    const presentTime = Date.now()
    const finishTime = presentTime + seconds * 1000

    displayTime(seconds, quizTimer)

    countdown = setInterval(() => {
      const secondsLeft = Math.round((finishTime - Date.now()) / 1000)

      if (secondsLeft < 0) {
        clearInterval(countdown)
        Quiz.showResult()
      }

      displayTime(secondsLeft, quizTimer)
    }, 1000)
  }
}

app()
