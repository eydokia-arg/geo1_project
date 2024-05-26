// script.js

let questions = [
	{
		prompt: `Ποια είναι η σειρά 
		των ηπείρων κατά σειρά μεγέθους, 
		από τη μεγαλύτερη προς τη μικρότερη;`,
		options: [
			"Ασία, Αφρική, Αμερική (Βόρεια και Νότια), Ευρώπη, Ωκεανία",
			"Ασία, Αμερική (Βόρεια και Νότια), Αφρική, Ευρώπη, Ωκεανία",
			"Ασία, Ευρώπη, Αφρική, Αμερική (Βόρεια και Νότια), Ωκεανία",
			"Αφρική, Ασία, Αμερική (Βόρεια και Νότια), Ευρώπη, Ωκεανία",
		],
		answer: "Ασία, Αμερική (Βόρεια και Νότια), Αφρική, Ευρώπη, Ωκεανία",
	},

	{
		prompt: `Ποιο ποσοστό της επιφάνειας της Γης καλύπτεται από νερό;`,
		options: [
			"30%",
			"50%",
			"70%",
			"90%",
		],
		answer: "70%",
	},

	{
		prompt: `Ποιος είναι ο μεγαλύτερος ωκεανός στον κόσμο;`,
		options: [
			"Ειρηνικός Ωκεανός",
			"Ατλαντικός Ωκεανός",
			"Ινδικός Ωκεανός",
			"Αρκτικός Ωκεανός",
		],
		answer: "Ειρηνικός Ωκεανός",
	},

	{
		prompt: `Τα μέρη των ωκεανών 
		που περικλείονται από τμήματα ξηράς ονομάζονται θάλασσες.`,
		options: ["Σωστό", "Λάθος"],
		answer: "Σωστό",
	},

	{
		prompt: `Ποια θάλασσα αποτελεί 
		το φυσικό σύνορο μεταξύ Ευρώπης και Αφρικής;`,
		options: [
			"Μεσόγειος Θάλασσα",
			"Αιγαίο Πέλαγος",
			"Μαύρη Θάλασσα",
			"Ατλαντικός Ωκεανός",
		],
		answer: "Μεσόγειος Θάλασσα",
	},
];

// Get Dom Elements

let questionsEl =
	document.querySelector(
		"#questions"
	);
let timerEl =
	document.querySelector("#timer");
let choicesEl =
	document.querySelector("#options");
let submitBtn = document.querySelector(
	"#submit-score"
);
let startBtn =
	document.querySelector("#start");
let nameEl =
	document.querySelector("#name");
let feedbackEl = document.querySelector(
	"#feedback"
);
let reStartBtn =
	document.querySelector("#restart");

// Quiz's initial state
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// Start quiz and hide frontpage

function quizStart() {
	timerId = setInterval(
		clockTick,
		1000
	);
	timerEl.textContent = time;
	let landingScreenEl =
		document.getElementById(
			"start-screen"
		);
	landingScreenEl.setAttribute(
		"class",
		"hide"
	);
	questionsEl.removeAttribute(
		"class"
	);
	getQuestion();
}

// Loop through array of questions and
// Answers and create list with buttons
function getQuestion() {
	let currentQuestion =
		questions[currentQuestionIndex];
	let promptEl =
		document.getElementById(
			"question-words"
		);
	promptEl.textContent =
		currentQuestion.prompt;
	choicesEl.innerHTML = "";
	currentQuestion.options.forEach(
		function (choice, i) {
			let choiceBtn =
				document.createElement(
					"button"
				);
			choiceBtn.setAttribute(
				"value",
				choice
			);
			choiceBtn.textContent =
				i + 1 + ". " + choice;
			choiceBtn.onclick =
				questionClick;
			choicesEl.appendChild(
				choiceBtn
			);
		}
	);
}

// Check for right answers and deduct
// Time for wrong answer, go to next question

function questionClick() {
	if (
		this.value !==
		questions[currentQuestionIndex]
			.answer
	) {
		time -= 10;
		if (time < 0) {
			time = 0;
		}
		timerEl.textContent = time;
		feedbackEl.textContent = `Λάθος απάντηση! Η σωστή απάντηση είναι: 
		${questions[currentQuestionIndex].answer}.`;
		feedbackEl.style.color = "red";
	} else {
		feedbackEl.textContent =
			"Σωστά!";
		feedbackEl.style.color =
			"green";
	}
	feedbackEl.setAttribute(
		"class",
		"feedback"
	);
	setTimeout(function () {
		feedbackEl.setAttribute(
			"class",
			"feedback hide"
		);
	}, 2000);
	currentQuestionIndex++;
	if (
		currentQuestionIndex ===
		questions.length
	) {
		quizEnd();
	} else {
		getQuestion();
	}
}

// End quiz by hiding questions,
// Stop timer and show final score

function quizEnd() {
	clearInterval(timerId);
	let endScreenEl =
		document.getElementById(
			"quiz-end"
		);
	endScreenEl.removeAttribute(
		"class"
	);
	let finalScoreEl =
		document.getElementById(
			"score-final"
		);
	finalScoreEl.textContent = time;
	questionsEl.setAttribute(
		"class",
		"hide"
	);
}

// End quiz if timer reaches 0

function clockTick() {
	time--;
	timerEl.textContent = time;
	if (time <= 0) {
		quizEnd();
	}
}



// Start quiz after clicking start quiz

startBtn.onclick = quizStart;
