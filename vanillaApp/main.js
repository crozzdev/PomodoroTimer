import './style.css';

const $body = document.querySelector('body');
const $timeContainerDiv = document.getElementsByClassName('timer-container');

const $breakDecrementBtn = document.getElementById('break-decrement');
const $breakIncrementBtn = document.getElementById('break-increment');

const $sessionDecrementBtn = document.getElementById('session-decrement');
const $sessionIncrementBtn = document.getElementById('session-increment');

const $startStopBtn = document.getElementById('start-stop');
const $resetBtn = document.getElementById('reset');

const $timerLabel = document.getElementById('timer-label');
const $timerLeftLabel = document.getElementById('time-left');

const $breakLengthLabel = document.getElementById('break-length');
const $sessionLengthLabel = document.getElementById('session-length');

const alarmSound = new Audio('/audio/alarm_sound.mp3');

let timeLeftSession = { minutes: 25, seconds: 0 };
let timeLeftBreak = { minutes: 5, seconds: 0 };
let isTimerRunning = false;
let isSessionActive = true;

const formatTime = (minutes, seconds) => {
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');
    return `${mm}:${ss}`;
};

const updateTimerLeftLabel = (sessionFlag) => {
    if (sessionFlag) {
        $timerLeftLabel.textContent = formatTime(
            timeLeftSession.minutes,
            timeLeftSession.seconds
        );
    } else {
        $timerLeftLabel.textContent = formatTime(
            timeLeftBreak.minutes,
            timeLeftBreak.seconds
        );
    }
};

const incrementBreakTime = () => {
    if (timeLeftBreak.minutes < 60 && !isTimerRunning) {
        timeLeftBreak.minutes += 1;
        $breakLengthLabel.textContent = timeLeftBreak.minutes;
        if (!isSessionActive) {
            updateTimerLeftLabel(isSessionActive);
        }
    } else {
        return;
    }
};

const incrementSessionTime = () => {
    if (timeLeftSession.minutes < 60 && !isTimerRunning) {
        timeLeftSession.minutes += 1;
        $sessionLengthLabel.textContent = timeLeftSession.minutes;
        if (isSessionActive) {
            updateTimerLeftLabel(isSessionActive);
        }
    } else {
        return;
    }
};

const decrementBreakTime = () => {
    if (timeLeftBreak.minutes > 0 && !isTimerRunning) {
        timeLeftBreak.minutes -= 1;
        $breakLengthLabel.textContent = timeLeftBreak.minutes;

        if (!isSessionActive) {
            updateTimerLeftLabel(isSessionActive);
        }
    } else {
        return;
    }
};

const decrementSessionTime = () => {
    if (timeLeftSession.minutes > 0 && !isTimerRunning) {
        timeLeftSession.minutes -= 1;
        $sessionLengthLabel.textContent = timeLeftSession.minutes;
        if (isSessionActive) {
            updateTimerLeftLabel(isSessionActive);
        }
    } else {
        return;
    }
};

const updateColors = () => {
    if (isSessionActive) {
        $body.classList.remove('break-color');
        $body.classList.add('session-color');
        $timeContainerDiv[0].classList.remove('timer-container-border-break');
        $timeContainerDiv[0].classList.add('timer-container-border-session');
    } else {
        $body.classList.remove('session-color');
        $body.classList.add('break-color');
        $timeContainerDiv[0].classList.remove('timer-container-border-session');
        $timeContainerDiv[0].classList.add('timer-container-border-break');
    }
};

const resetTimer = () => {
    timeLeftSession = { minutes: 25, seconds: 0 };
    timeLeftBreak = { minutes: 5, seconds: 0 };
    isTimerRunning = false;
    isSessionActive = true;
    updateColors();

    $breakLengthLabel.textContent = timeLeftBreak.minutes;
    $sessionLengthLabel.textContent = timeLeftSession.minutes;
    $timerLabel.textContent = 'Session';
    $timerLeftLabel.textContent = formatTime(
        timeLeftSession.minutes,
        timeLeftSession.seconds
    );
};

$breakDecrementBtn.addEventListener('click', decrementBreakTime);
$breakIncrementBtn.addEventListener('click', incrementBreakTime);

$sessionDecrementBtn.addEventListener('click', decrementSessionTime);
$sessionIncrementBtn.addEventListener('click', incrementSessionTime);

$resetBtn.addEventListener('click', resetTimer);
