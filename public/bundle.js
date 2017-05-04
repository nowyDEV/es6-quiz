/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\nthrow new Error(\"Cannot find module \\\"data.js\\\"\");\n\n\nfunction app() {\n  var actionButton = document.querySelector('.quiz-btn');\n  var questionsField = document.querySelector('.quiz-questions');\n  var countdown = void 0;\n  var quizTimer = document.querySelector('.quiz-timer');\n\n  actionButton.onclick = function () {\n    return startQuiz();\n  };\n\n  var Quiz = {\n    timer: 0,\n    questions: [],\n    userPoints: 0,\n    currentQuestion: 0,\n    correctAnswer: 0\n  };\n\n  __WEBPACK_IMPORTED_MODULE_0_data_js___default.a.getData();\n\n  function showResult() {\n    var result = Quiz.userPoints;\n    var total = Quiz.questions.length;\n    actionButton.style.display = 'none';\n    questionsField.style.display = 'none';\n    quizTimer.style.display = 'none';\n    document.querySelector('.quiz-results').innerHTML = '<div class=\"sg-flash\">\\n                                                         <div class=\"sg-flash__message\">\\n                                                           <div class=\"sg-text sg-text--emphasised sg-text--standout sg-text--light\">\\n                                                             Correct answers: <div class=\"sg-badge sg-badge--large sg-badge--blue-secondary-light\">\\n                                                                                <div class=\"sg-text sg-text--emphasised sg-text--standout sg-text--blue\"> ' + result + ' / ' + total + '</div>\\n                                                                              </div>\\n                                                           </div>\\n                                                         </div>\\n                                                       </div>';\n  }\n\n  function processAnswer() {\n    if (Quiz.currentQuestion < Quiz.questions.length) {\n      var answer = parseInt(document.querySelector('input[name=answer]:checked').getAttribute('id'));\n      if (answer === Quiz.correctAnswer) {\n        Quiz.userPoints += 1;\n        console.log(Quiz.userPoints);\n      }\n      updateQuestion(Quiz.questions, Quiz.currentQuestion);\n    } else showResult();\n  }\n\n  function startQuiz() {\n    actionButton.onclick = function () {\n      return processAnswer();\n    };\n    timer(Quiz.timer);\n    actionButton.innerHTML = 'Next';\n    actionButton.classList.add('sg-button-primary--disabled');\n    actionButton.setAttribute('disabled', '');\n    updateQuestion(Quiz.questions, Quiz.currentQuestion);\n  }\n\n  function updateQuestion(questions, index) {\n    var question = questions[index];\n    questionsField.innerHTML = loadQuestion(question);\n    Quiz.currentQuestion += 1;\n    actionButton.classList.add('sg-button-primary--disabled');\n    actionButton.setAttribute('disabled', '');\n    var answerInputs = document.getElementsByClassName('quiz-questions__answer');\n    for (var i = 0; i < answerInputs.length; i++) {\n      answerInputs[i].addEventListener('click', function () {\n        actionButton.classList.remove('sg-button-primary--disabled');\n        actionButton.removeAttribute('disabled');\n      });\n    }\n  }\n\n  function loadQuestion(question) {\n    return '<h3 class=\"quiz-questions__title\">' + question.question + '</h3>\\n            <form class=\"quiz-questions__form\">\\n                ' + loadAnswers(question.answers) + '    \\n            </form>';\n  }\n\n  function updateCorrectAnswer(id) {\n    Quiz.correctAnswer = id;\n  }\n\n  function loadAnswers(answers) {\n    return answers.map(function (answer) {\n      if (answer.correct) {\n        updateCorrectAnswer(answer.id);\n      }\n      return '<div class=\"sg-label sg-label--secondary\">\\n              <div class=\"sg-label__icon\">\\n                  <div class=\"sg-radio\">\\n                      <input class=\"sg-radio__element quiz-questions__answer\" type=\"radio\" id=\"' + answer.id + '\" name=\"answer\">\\n                      <label class=\"sg-radio__ghost\" for=\"' + answer.id + '\"></label>\\n                  </div>\\n              </div>\\n              <label class=\"sg-label__text\" for=\"' + answer.id + '\">' + answer.answer + '</label>\\n            </div>';\n    });\n  }\n\n  function timer(seconds) {\n    var presentTime = Date.now();\n    var finishTime = presentTime + seconds * 1000;\n    displayTime(seconds);\n\n    countdown = setInterval(function () {\n      var secondsLeft = Math.round((finishTime - Date.now()) / 1000);\n      if (secondsLeft < 0) {\n        clearInterval(countdown);\n        showResult();\n      }\n      displayTime(secondsLeft);\n    }, 1000);\n  }\n\n  function displayTime(seconds) {\n    var minutesLeft = Math.floor(seconds / 60);\n    var secondsLeft = seconds % 60;\n    quizTimer.innerHTML = '<div class=\"sg-badge sg-badge--rounded\">\\n                               <div class=\"sg-text sg-text--emphasised quiz-timer__time\">\\n                                  ' + minutesLeft + '\\n                                  :\\n                                  ' + (secondsLeft < 10 ? '0' : '') + '\\n                                  ' + secondsLeft + '\\n                               </div>\\n                           </div>';\n  }\n}\n\napp();\n\n//////////////////\n// WEBPACK FOOTER\n// ./js/app.js\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///./js/app.js?");

/***/ })
/******/ ]);