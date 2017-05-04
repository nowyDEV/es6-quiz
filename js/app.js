import fetch from 'isomorphic-fetch'

function app () {
  const actionButton = document.querySelector('.quiz-btn')
  const questionsField = document.querySelector('.quiz-questions')
  let countdown
  const quizTimer = document.querySelector('.quiz-timer')
  const quizResults = document.querySelector('.quiz-results')

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
      .catch(error => console.log('Something went wrong', error))
  }
  getData()

  function showResult () {
    const result = Quiz.userPoints
    const total = Quiz.questions.length
    questionsField.style.display = 'none'
    quizTimer.style.display = 'none'
    actionButton.innerHTML = 'Try Again'
    actionButton.onclick = () => resetQuiz()
    quizResults.innerHTML = `<div class="sg-flash">
                                                         <div class="sg-flash__message">
                                                           <div class="sg-text sg-text--emphasised sg-text--standout sg-text--light">
                                                             Correct answers: <div class="sg-badge sg-badge--large sg-badge--blue-secondary-light">
                                                                                <div class="sg-text sg-text--emphasised sg-text--standout sg-text--blue"> ${result} / ${total}</div>
                                                                              </div>
                                                           </div>
                                                         </div>
                                                       </div>`
    quizResults.style.display = 'block'
  }

  function processAnswer () {
    if (Quiz.currentQuestion < Quiz.questions.length) {
      const answer = parseInt(document.querySelector('input[name=answer]:checked').getAttribute('id'))
      if (answer === Quiz.correctAnswer) {
        Quiz.userPoints += 1
      }
      updateQuestion(Quiz.questions, Quiz.currentQuestion)
    } else showResult()
  }

  function startQuiz () {
    actionButton.onclick = () => processAnswer()
    timer(Quiz.timer)
    actionButton.innerHTML = 'Next'
    actionButton.classList.add('sg-button-primary--disabled')
    actionButton.setAttribute('disabled', '')
    updateQuestion(Quiz.questions, Quiz.currentQuestion)
  }

  function resetQuiz () {
    Quiz.userPoints = 0
    Quiz.currentQuestion = 0
    Quiz.correctAnswer = 0
    questionsField.style.display = 'block'
    quizTimer.style.display = 'block'
    quizResults.style.display = 'none'
    startQuiz()
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

  function loadQuestion (question) {
    return `<h3 class="quiz-questions__title">${question.question}</h3>
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
    quizTimer.innerHTML = `<div class="sg-badge sg-badge--rounded">
                               <div class="sg-text sg-text--emphasised quiz-timer__time">
                                  ${minutesLeft}
                                  :
                                  ${secondsLeft < 10 ? '0' : ''}
                                  ${secondsLeft}
                               </div>
                           </div>`
  }
}

app()
