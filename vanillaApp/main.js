import './style.css';

const $body = document.querySelector('body');

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

let breakTime = 5;
let sessionTime = 25;
let timeLeftSession = { minutes: 0, seconds: 0 };
let timeLeftBreak = { minutes: 0, seconds: 0 };
let isTimerRunning = false;
let isSessionActive = true;

const formatTime = (minutes, seconds) => {
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');
    return `${mm}:${ss}`;
};

const updateTimerLeftandLabel = (sessionFlag) => {
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
    if (breakTime < 60 && !isTimerRunning) {
        breakTime += 1;
        $breakLengthLabel.textContent = breakTime;
        timeLeftBreak.minutes = breakTime;
        if (!isSessionActive) {
            updateTimerLeftandLabel(isSessionActive);
        }
    } else {
        return;
    }
};

const incrementSessionTime = () => {
    if (sessionTime < 60 && !isTimerRunning) {
        sessionTime += 1;
        $sessionLengthLabel.textContent = sessionTime;
        timeLeftSession.minutes = sessionTime;
        if (isSessionActive) {
            updateTimerLeftandLabel(isSessionActive);
        }
    } else {
        return;
    }
};

const decrementBreakTime = () => {
    if (breakTime > 0 && !isTimerRunning) {
        breakTime -= 1;
        $breakLengthLabel.textContent = breakTime;
        timeLeftBreak.minutes = breakTime;
        if (!isSessionActive) {
            updateTimerLeftandLabel(isSessionActive);
        }
    } else {
        return;
    }
};

const decrementSessionTime = () => {
    if (sessionTime > 0 && !isTimerRunning) {
        sessionTime -= 1;
        $sessionLengthLabel.textContent = sessionTime;
        timeLeftSession.minutes = sessionTime;
        if (isSessionActive) {
            updateTimerLeftandLabel(isSessionActive);
        }
    } else {
        return;
    }
};

$breakDecrementBtn.addEventListener('click', decrementBreakTime);
$breakIncrementBtn.addEventListener('click', incrementBreakTime);

$sessionDecrementBtn.addEventListener('click', decrementSessionTime);
$sessionIncrementBtn.addEventListener('click', incrementSessionTime);
