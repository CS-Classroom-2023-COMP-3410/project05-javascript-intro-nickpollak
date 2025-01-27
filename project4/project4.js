const quizData = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: 2,
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      answer: 1,
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
      answer: 0,
    },
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  const userAnswers = [];
  
  const quizContainer = document.getElementById("quiz");
  const feedbackElement = document.getElementById("feedback");
  const nextButton = document.getElementById("next-button");
  const summaryContainer = document.getElementById("summary");
  const resultsContainer = document.getElementById("results");
  const reviewButton = document.getElementById("review-button");
  
  function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
  
    quizContainer.innerHTML = `
      <div class="question">${currentQuestion.question}</div>
      <ul class="options">
        ${currentQuestion.options
          .map(
            (option, index) => `
          <li>
            <label>
              <input type="radio" name="option" value="${index}">
              ${option}
            </label>
          </li>
        `
          )
          .join("")}
      </ul>
    `;
    feedbackElement.textContent = "";
  }
  
  function handleNext() {
    const selectedOption = document.querySelector("input[name='option']:checked");
  
    if (!selectedOption) {
      feedbackElement.textContent = "Please select an option.";
      return;
    }
  
    const selectedAnswer = parseInt(selectedOption.value);
    userAnswers.push(selectedAnswer);
  
    if (selectedAnswer === quizData[currentQuestionIndex].answer) {
      score++;
      feedbackElement.textContent = "Correct!";
    } else {
      feedbackElement.textContent = "Wrong!";
    }
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex < quizData.length) {
      setTimeout(() => loadQuestion(), 1000);
    } else {
      setTimeout(() => showSummary(), 1000);
    }
  }
  
  function showSummary() {
    quizContainer.classList.add("hidden");
    nextButton.classList.add("hidden");
    summaryContainer.classList.remove("hidden");
  
    resultsContainer.innerHTML = quizData
      .map((q, index) => `
        <div class="result-item">
          <div><strong>Question:</strong> ${q.question}</div>
          <div><strong>Your Answer:</strong> ${q.options[userAnswers[index]]}</div>
          <div><strong>Correct Answer:</strong> ${q.options[q.answer]}</div>
        </div>
      `)
      .join("");
  }
  
  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers.length = 0;
    quizContainer.classList.remove("hidden");
    nextButton.classList.remove("hidden");
    summaryContainer.classList.add("hidden");
    loadQuestion();
  }
  
  nextButton.addEventListener("click", handleNext);
  reviewButton.addEventListener("click", restartQuiz);
  
  loadQuestion();
  