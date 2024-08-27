// Get references to the DOM elements
const startBtn = document.getElementById('startBtn'); // Start button
const questionEl = document.getElementById('question'); // Element to display the question
const answersEl = document.getElementById('answers'); // Element to display the answer options
const quizEl = document.getElementById('quiz'); // Quiz container element

let currentQuestionIndex = 0; // Track the current question index
let score = 0; // Track the user's score
let questions = []; // Array to store the fetched quiz questions

// Add event listener to the start button to start the quiz when clicked
startBtn.addEventListener('click', startQuiz);

// Function to start the quiz
async function startQuiz() {
    startBtn.style.display = 'none'; // Hide the start button
    quizEl.style.display = 'block'; // Show the quiz container
    questions = await fetchQuestions(); // Fetch questions from the API
    showQuestion(); // Display the first question
}

// Function to fetch questions from the API
async function fetchQuestions() {
    const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple'); // Fetch 5 multiple choice questions
    const data = await res.json(); // Parse the JSON response
    return data.results; // Return the list of questions
}

// Function to display the current question and answer options
function showQuestion() {
    const question = questions[currentQuestionIndex]; // Get the current question
    questionEl.textContent = question.question; // Display the question text
    answersEl.innerHTML = ''; // Clear previous answer options

    // Display incorrect answer options as buttons
    question.incorrect_answers.forEach(answer => {
        const button = document.createElement('button'); // Create a button for each incorrect answer
        button.textContent = answer; // Set the button text to the answer
        button.addEventListener('click', () => selectAnswer(false)); // Mark as incorrect when clicked
        answersEl.appendChild(button); // Add the button to the answers element
    });

    // Create a button for the correct answer
    const correctBtn = document.createElement('button');
    correctBtn.textContent = question.correct_answer; // Set the button text to the correct answer
    correctBtn.addEventListener('click', () => selectAnswer(true)); // Mark as correct when clicked
    answersEl.appendChild(correctBtn); // Add the button to the answers element
}

// Function to handle answer selection
function selectAnswer(isCorrect) {
    if (isCorrect) score++; // Increase score if the selected answer is correct
    currentQuestionIndex++; // Move to the next question
    if (currentQuestionIndex < questions.length) {
        showQuestion(); // Show the next question if available
    } else {
        showResults(); // Show the results if all questions are answered
    }
}

// Function to display the quiz results
function showResults() {
    quizEl.innerHTML = `<h2>You scored ${score} out of ${questions.length}!</h2>`; // Display the final score
    const restartBtn = document.createElement('button'); // Create a restart button
    restartBtn.textContent = 'Restart'; // Set the button text to "Restart"
    restartBtn.addEventListener('click', () => location.reload()); // Reload the page to restart the quiz
    quizEl.appendChild(restartBtn); // Add the restart button to the quiz element
}
