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
let sessionMinutes = 25;
let breakMinutes = 5;
let isTimerRunning = false;
let isSessionActive = true;

const formatTime = (minutes, seconds) => {
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');
    return `${mm}:${ss}`;
};

const incrementBreakTime = () => {
    if (breakMinutes < 60 && !isTimerRunning) {
        breakMinutes += 1;
        timeLeftBreak.minutes = breakMinutes;
        $breakLengthLabel.textContent = breakMinutes;
        if (!isSessionActive) {
            $timerLeftLabel.textContent = formatTime(breakMinutes, 0);
        }
    } else {
        return;
    }
};

const incrementSessionTime = () => {
    if (sessionMinutes < 60 && !isTimerRunning) {
        sessionMinutes += 1;
        timeLeftSession.minutes = sessionMinutes;
        $sessionLengthLabel.textContent = sessionMinutes;
        if (isSessionActive) {
            $timerLeftLabel.textContent = formatTime(sessionMinutes, 0);
        }
    } else {
        return;
    }
};

const decrementBreakTime = () => {
    if (breakMinutes > 0 && !isTimerRunning) {
        breakMinutes -= 1;
        timeLeftBreak.minutes = breakMinutes;
        $breakLengthLabel.textContent = breakMinutes;
        if (!isSessionActive) {
            $timerLeftLabel.textContent = formatTime(breakMinutes, 0);
        }
    } else {
        return;
    }
};

const decrementSessionTime = () => {
    if (sessionMinutes > 0 && !isTimerRunning) {
        sessionMinutes -= 1;
        timeLeftSession.minutes = sessionMinutes;
        $sessionLengthLabel.textContent = sessionMinutes;
        if (isSessionActive) {
            $timerLeftLabel.textContent = formatTime(sessionMinutes, 0);
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
    sessionMinutes = 25;
    breakMinutes = 5;
    isTimerRunning = false;
    isSessionActive = true;
    updateColors();

    $breakLengthLabel.textContent = breakMinutes;
    $sessionLengthLabel.textContent = sessionMinutes;
    $timerLabel.textContent = 'Session';
    $timerLeftLabel.textContent = formatTime(sessionMinutes, 0);
};

const startStopTimer = () => {
    isTimerRunning = !isTimerRunning;
};

$breakDecrementBtn.addEventListener('click', decrementBreakTime);
$breakIncrementBtn.addEventListener('click', incrementBreakTime);

$sessionDecrementBtn.addEventListener('click', decrementSessionTime);
$sessionIncrementBtn.addEventListener('click', incrementSessionTime);

$resetBtn.addEventListener('click', resetTimer);
