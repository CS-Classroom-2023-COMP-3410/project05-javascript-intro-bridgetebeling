document.addEventListener("DOMContentLoaded", () => {
    const questions = [
      {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: 2, // Index of the correct answer
      },
      {
        question: "Which programming language is known as the backbone of web development?",
        options: ["Python", "JavaScript", "C++", "Ruby"],
        correct: 1,
      },
      {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Jupiter", "Saturn", "Mars"],
        correct: 1,
      },
      {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        correct: 2,
      },
      {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "O2", "CO2", "HO"],
        correct: 0,
      },
    ];
  
    const quizContainer = document.getElementById("quiz-container");
    const questionContainer = document.getElementById("question-container");
    const nextButton = document.getElementById("next-button");
    const finishButton = document.getElementById("finish-button");
    const summaryContainer = document.getElementById("summary-container");
  
    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = [];
  
    const renderQuestion = (index) => {
      const questionData = questions[index];
      questionContainer.innerHTML = `
        <div class="question">${index + 1}. ${questionData.question}</div>
        <ul class="options">
          ${questionData.options
            .map(
              (option, i) =>
                `<li>
                  <input type="radio" name="option" id="option${i}" value="${i}">
                  <label for="option${i}">${option}</label>
                </li>`
            )
            .join("")}
        </ul>
      `;
      nextButton.style.display = index < questions.length - 1 ? "block" : "none";
      finishButton.style.display = index === questions.length - 1 ? "block" : "none";
    };
  
    const getSelectedOption = () => {
      const options = document.getElementsByName("option");
      for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
          return parseInt(options[i].value);
        }
      }
      return null;
    };
  
    const handleNextQuestion = () => {
      const selectedOption = getSelectedOption();
      if (selectedOption === null) {
        alert("Please select an option!");
        return;
      }
      userAnswers.push(selectedOption);
      if (selectedOption === questions[currentQuestionIndex].correct) {
        score++;
      }
      currentQuestionIndex++;
      renderQuestion(currentQuestionIndex);
    };
  
    const handleFinishQuiz = () => {
      const selectedOption = getSelectedOption();
      if (selectedOption === null) {
        alert("Please select an option!");
        return;
      }
      userAnswers.push(selectedOption);
      if (selectedOption === questions[currentQuestionIndex].correct) {
        score++;
      }
      showSummary();
    };
  
    const showSummary = () => {
      quizContainer.style.display = "none";
      summaryContainer.style.display = "block";
      let summaryHTML = `<h2>Your Score: ${score}/${questions.length}</h2>`;
      summaryHTML += `<h3>Review Your Answers:</h3>`;
      summaryHTML += `<div class="review">`;
  
      questions.forEach((question, index) => {
        summaryHTML += `<div>
          <strong>Q${index + 1}: ${question.question}</strong><br>
          <span class="correct-answer">Correct Answer: ${question.options[question.correct]}</span><br>
          <span class="your-answer">Your Answer: ${
            question.options[userAnswers[index]] || "No Answer"
          }</span><br>
        </div><br>`;
      });
  
      summaryHTML += `</div>`;
      summaryContainer.innerHTML = summaryHTML;
    };
  
    nextButton.addEventListener("click", handleNextQuestion);
    finishButton.addEventListener("click", handleFinishQuiz);
  
    // Initialize the quiz
    renderQuestion(currentQuestionIndex);
  });
  