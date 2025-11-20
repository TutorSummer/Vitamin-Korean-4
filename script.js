// 퀴즈 데이터 예시
const quizData = [
    {
        question: "다음 중 'V-(으)ㄹ까 하다'의 의미로 올바른 것은?",
        options: [
            "막연한 계획이나 의도",
            "과거 경험을 설명",
            "부정적인 결과의 이유",
            "강한 불가능 상태"
        ],
        answer: 0,
        rationale: "V-(으)ㄹ까 하다는 막연한 계획이나 의도를 나타낼 때 사용합니다."
    },
    {
        question: "다음 중 'N 덕분에'의 쓰임이 올바른 것은?",
        options: [
            "부정적인 결과를 나타낼 때",
            "긍정적인 원인이나 이유를 강조할 때",
            "후회/아쉬움을 나타낼 때",
            "극단적 강조 표현"
        ],
        answer: 1,
        rationale: "N 덕분에는 긍정적인 원인이나 이유를 강조할 때 사용됩니다."
    }
    // 추가 문제는 여기에 계속 추가
];

let currentQuestion = 0;
let score = 0;
let incorrectQuestions = [];

function loadQuestion() {
    const quizContent = document.getElementById('quiz-content');
    const progressBar = document.getElementById('progress-bar');
    const questionCounter = document.getElementById('question-counter');
    const feedback = document.getElementById('feedback-area');

    feedback.classList.add('hidden');

    const q = quizData[currentQuestion];
    quizContent.innerHTML = `
        <h2 class="text-xl font-semibold mb-4">${q.question}</h2>
        <ul>
            ${q.options.map((opt, i) => `
                <li>
                    <button class="option-btn w-full text-left px-4 py-2 mb-2 border rounded-lg hover:bg-gray-100 transition" onclick="checkAnswer(${i})">${opt}</button>
                </li>
            `).join('')}
        </ul>
    `;

    const progressPercent = ((currentQuestion) / quizData.length) * 100;
    progressBar.style.width = progressPercent + '%';
    questionCounter.textContent = `문제 ${currentQuestion + 1} / ${quizData.length}`;
}

function checkAnswer(selectedIndex) {
    const q = quizData[currentQuestion];
    const feedback = document.getElementById('feedback-area');
    const rationaleText = document.getElementById('rationale-text');

    if (selectedIndex === q.answer) {
        score++;
    } else {
        incorrectQuestions.push(currentQuestion);
    }

    rationaleText.textContent = q.rationale;
    feedback.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const resultScreen = document.getElementById('result-screen');
    const scoreText = document.getElementById('score-text');
    const incorrectList = document.getElementById('incorrect-list');
    const noIncorrectMsg = document.getElementById('no-incorrect-msg');

    document.getElementById('quiz-content').classList.add('hidden');
    document.getElementById('feedback-area').classList.add('hidden');

    scoreText.textContent = `점수: ${score} / ${quizData.length}`;

    if (incorrectQuestions.length > 0) {
        noIncorrectMsg.style.display = 'none';
        incorrectList.innerHTML = incorrectQuestions.map(i => `<li>${quizData[i].question}</li>`).join('');
    } else {
        noIncorrectMsg.style.display = 'block';
    }

    resultScreen.classList.remove('hidden');
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectQuestions = [];
    document.getElementById('quiz-content').classList.remove('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    loadQuestion();
}

// 첫 로드
window.onload = loadQuestion;
