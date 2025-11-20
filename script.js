// 20개 문법 연습 문제 데이터
const quizData = [
    {question:"이번 주말에 친구를 만나 ___", options:["볼까 하다","더니","덕분에","바람에"], answer:0, rationale:"V-(으)ㄹ까 하다는 막연한 계획이나 의도를 나타냅니다."},
    {question:"내일 날씨가 좋으면 산책을 ___", options:["볼까 하다","더니","덕분에","바람에"], answer:0, rationale:"V-(으)ㄹ까 하다: 막연한 계획 표현"},
    {question:"친구가 내일 여행을 갈지 고민하고 있다. 가장 자연스러운 말은?", options:["가려던 참이다","갈까 하다","가기르래"], answer:1, rationale:"갈까 하다: 막연한 계획/고민 표현"},
    {question:"나는 새로운 취미를 시작해 ___, 아직 결정하지 않았다.", options:["볼까 해","더라고요","(으)나 마나"], answer:0, rationale:"볼까 해: 계획을 공유하는 표현"},
    {question:"시험 공부를 시작할지 고민할 때 올바른 문장:", options:["까 해요","셈 치다","걸 그랬어요"], answer:0, rationale:"V-(으)ㄹ까 하다: 가벼운 계획"},
    {question:"어제 친구가 많이 웃**___** 오늘 기분이 좋아졌다.", options:["더니","(으)나 마나","덕분에"], answer:0, rationale:"AV-더니: 과거 경험→현재 상태"},
    {question:"비가 많이 오**___** 길이 젖었다.", options:["더니","(으)나 마나","바람에"], answer:2, rationale:"V-는 바람에: 부정적 결과 원인"},
    {question:"어제는 눈이 왔**___**, 오늘은 날씨가 따뜻하다.", options:["더니","덕분에","(으)ㄴ/는 셈 치다"], answer:0, rationale:"AV-더니: 과거 경험으로 현재 설명"},
    {question:"선생님 ___ 시험에 합격했다.", options:["덕분에","바람에","걸 그랬다"], answer:0, rationale:"N 덕분에: 긍정적 원인 강조"},
    {question:"길이 막히**___** 수업에 늦었다.", options:["바람에","더니","덕분에"], answer:0, rationale:"V-는 바람에: 부정적 결과 이유"},
    {question:"친구의 도움**___** 계획을 완수할 수 있었다.", options:["덕분에","더니","(으)ㄴ/는 셈 치다"], answer:0, rationale:"N 덕분에: 긍정적 원인"},
    {question:"그렇게 말해도 소용이 없으니 그냥 하지 ___", options:["(으)나 마나","더니","덕분에"], answer:0, rationale:"V-(으)나 마나: 결과 차이 없음"},
    {question:"회의 준비가 충분하지 않았으니 실패한 ___", options:["셈 치다","더니","덕분에"], answer:0, rationale:"V-(으)ㄴ/는 셈 치다: 가정/간주"},
    {question:"지금쯤 도착했을 ___", options:["걸요","더니","덕분에"], answer:0, rationale:"V-(으)ㄹ걸요: 추측 표현"},
    {question:"어린아이 ___ 이 문제를 풀 수 있다.", options:["조차","더니","걸요"], answer:0, rationale:"N조차: 극단적 강조"},
    {question:"늦게 출발했더라면 늦지 않았을 ___", options:["걸 그랬다","더니","조차"], answer:0, rationale:"V-(으)ㄹ 걸 그랬다: 과거 후회"},
    {question:"그 영화 정말 재미있___", options:["더라고요","조차","걸요"], answer:0, rationale:"AV-더라고요: 직접 경험 전달"},
    {question:"지금 막 점심 먹으러 가___", options:["려던 참이다","더니","조차"], answer:0, rationale:"V-(으)려던 참이다: 바로 ~하려던 상황"},
    {question:"운동도 할 ___ 친구도 만나러 갈 거예요.", options:["겸","더니","조차"], answer:0, rationale:"V-(으)ㄹ 겸: 두 가지 목적 동시에"},
    {question:"너무 피곤해서 움직일 ___", options:["(으)ㄹ 수조차 없다","아/어 가지고","기는요"], answer:0, rationale:"V-(으)ㄹ 수조차 없다: 강한 불가능 강조"}
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
            ${q.options.map((opt,i)=>`
                <li><button class="option-btn w-full text-left px-4 py-2 mb-2 border rounded-lg hover:bg-gray-100 transition" onclick="checkAnswer(${i})">${opt}</button></li>
            `).join('')}
        </ul>
    `;

    const progressPercent = ((currentQuestion)/quizData.length)*100;
    progressBar.style.width = progressPercent + '%';
    questionCounter.textContent = `문제 ${currentQuestion+1} / ${quizData.length}`;
}

function checkAnswer(selectedIndex) {
    const q = quizData[currentQuestion];
    const feedback = document.getElementById('feedback-area');
    const rationaleText = document.getElementById('rationale-text');

    if(selectedIndex===q.answer) score++;
    else incorrectQuestions.push(currentQuestion);

    rationaleText.textContent = q.rationale;
    feedback.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestion++;
    if(currentQuestion<quizData.length) loadQuestion();
    else showResult();
}

function showResult() {
    const resultScreen = document.getElementById('result-screen');
    const scoreText = document.getElementById('score-text');
    const incorrectList = document.getElementById('incorrect-list');
    const noIncorrectMsg = document.getElementById('no-incorrect-msg');

    document.getElementById('quiz-content').classList.add('hidden');
    document.getElementById('feedback-area').classList.add('hidden');

    scoreText.textContent = `점수: ${score} / ${quizData.length}`;

    if(incorrectQuestions.length>0){
        noIncorrectMsg.style.display='none';
        incorrectList.innerHTML = incorrectQuestions.map(i=>`<li>${quizData[i].question}</li>`).join('');
    } else noIncorrectMsg.style.display='block';

    resultScreen.classList.remove('hidden');
}

function restartQuiz() {
    currentQuestion=0;
    score=0;
    incorrectQuestions=[];
    document.getElementById('quiz-content').classList.remove('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    loadQuestion();
}

window.onload = loadQuestion;
