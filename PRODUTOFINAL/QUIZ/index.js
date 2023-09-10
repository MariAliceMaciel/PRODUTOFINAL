const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Não acredita em nenhuma forma de dominação – inclusive a do Estado sobre a população – ou de hierarquia e prega a cultura da autogestão e da coletividade.",
    answers: [
      { text: "Liberalismo", correct: false },
      { text: "Comunismo", correct: false },
      { text: "Anarquismo", correct: true },
      { text: "Socialismo", correct: false }
    ]
  },
  {
    question: "Um pensamento de centro-esquerda, cujos principais valores são a igualdade e a liberdade. Defende as liberdades civis, os direitos de propriedade e a democracia representativa.",
    answers: [
      { text: "Social-Democrático", correct: true },
      { text: "Comunismo", correct: false },
      { text: "Socialismo", correct: false },
      { text: "Anarquismo", correct: false }
    ]
  },
  {
    question: 'Ideologia política e socioeconômica que pretende estabelecer uma sociedade igualitária, por meio da abolição da propriedade privada, das classes sociais, entre outros."',
    answers: [
      { text: 'Comunismo', correct: true },
      { text: 'Socialismo', correct: false },
      { text: 'Socialismo-Útópico', correct: false },
      { text: "Anarquismo", correct: false }
    ]
  },
  {
    question: 'Pensamento político que defende a manutenção das instituições sociais tradicionais – como a família, a comunidade local e a religião -, além dos usos, costumes e convenções.',
    answers: [
      { text: "Progressismo", correct: false },
      { text: "Conservadorismo", correct: true }
    ]
  },
  {
    question: 'Promove a ruptura de padrões sociais tradicionais; fortemente associado à luta por direitos civis, a movimentos sociais em prol de minorias ou grupos historicamente preteridos pela sociedade.',
    answers: [
      { text: 'Conservadorismo', correct: false },
      { text: 'Progressismo', correct: true },
      { text: 'Anarquismo', correct: false },
    ]
  },
  {
    question: 'Como é dividida a política no Brasil?',
    answers: [
      { text: '4 poderes', correct: false },
      { text: '1 poder', correct: true },
      { text: '3 poderes', correct: false },
      { text: '2 poderes', correct: false }
    ]
  }
]