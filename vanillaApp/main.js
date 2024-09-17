import './style.css';

const $body = document.querySelector('body');
const $timeContainerDiv = document.getElementsByClassName('timer-container');

const $breakDecrementBtn = document.getElementById('break-decrement');
const $breakIncrementBtn = document.getElementById('break-increment');

const $sessionDecrementBtn = document.getElementById('session-decrement');
const $sessionIncrementBtn = document.getElementById('session-increment');

const $startStopBtn = document.getElementById('start_stop');
const $resetBtn = document.getElementById('reset');

const $timerLabel = document.getElementById('timer-label');
const $timerLeftLabel = document.getElementById('time-left');

const $breakLengthLabel = document.getElementById('break-length');
const $sessionLengthLabel = document.getElementById('session-length');

const alarmSound = document.getElementById('beep');

const MAX_TIME = 60;
const MIN_TIME = 1;

let timeLeftSession = { minutes: 25, seconds: 0 };
let timeLeftBreak = { minutes: 5, seconds: 0 };
let sessionMinutes = 25;
let breakMinutes = 5;
let isTimerRunning = false;
let isSessionActive = true;
let timerInterval;

const formatTime = (minutes, seconds) => {
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');
    return `${mm}:${ss}`;
};

const updateTimeLabel = (minutes, seconds) => {
    $timerLeftLabel.textContent = formatTime(minutes, seconds);
};

const updateLengthLabel = ($label, minutes) => {
    $label.textContent = minutes;
};

const changeTime = (type, operation) => {
    if (isTimerRunning) return;

    let minutes;
    let timeLeft;
    let $lengthLabel;

    if (type === 'session') {
        minutes = sessionMinutes;
        timeLeft = timeLeftSession;
        $lengthLabel = $sessionLengthLabel;
    } else {
        minutes = breakMinutes;
        timeLeft = timeLeftBreak;
        $lengthLabel = $breakLengthLabel;
    }

    if (operation === 'increment' && minutes < MAX_TIME) {
        minutes += 1;
    } else if (operation === 'decrement' && minutes > MIN_TIME) {
        minutes -= 1;
    }

    timeLeft.minutes = minutes;
    timeLeft.seconds = 0;
    updateLengthLabel($lengthLabel, minutes);

    if (
        (type === 'session' && isSessionActive) ||
        (type === 'break' && !isSessionActive)
    ) {
        updateTimeLabel(minutes, 0);
    }

    if (type === 'session') {
        sessionMinutes = minutes;
    } else {
        breakMinutes = minutes;
    }
};

const updateColorsandLabels = () => {
    if (isSessionActive) {
        $timerLabel.textContent = 'Session';
        $body.classList.remove('break-color');
        $body.classList.add('session-color');
        $timeContainerDiv[0].classList.remove('timer-container-border-break');
        $timeContainerDiv[0].classList.add('timer-container-border-session');
    } else {
        $timerLabel.textContent = 'Break';
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
    updateColorsandLabels();

    updateLengthLabel($breakLengthLabel, breakMinutes);
    updateLengthLabel($sessionLengthLabel, sessionMinutes);
    $timerLabel.textContent = 'Session';
    updateTimeLabel(sessionMinutes, 0);
    clearInterval(timerInterval);
    alarmSound.pause();
    alarmSound.currentTime = 0;
};

const updateTimer = (timerRunning) => {
    if (timerRunning.minutes > 0 || timerRunning.seconds > 0) {
        if (timerRunning.seconds === 0) {
            timerRunning.seconds = 59;
            timerRunning.minutes -= 1;
        } else {
            timerRunning.seconds -= 1;
        }

        updateTimeLabel(timerRunning.minutes, timerRunning.seconds);
    }
};

const startStopTimer = (timerRunning) => {
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    if (isTimerRunning) {
        timerInterval = setInterval(() => {
            if (timerRunning.minutes === 0 && timerRunning.seconds === 0) {
                alarmSound.play();

                isSessionActive = !isSessionActive;
                updateColorsandLabels();

                clearInterval(timerInterval);

                timerRunning.minutes = isSessionActive
                    ? sessionMinutes
                    : breakMinutes;
                timerRunning.seconds = 0;

                const nextTimer = isSessionActive
                    ? timeLeftSession
                    : timeLeftBreak;
                updateTimeLabel(
                    nextTimer === timeLeftSession
                        ? sessionMinutes
                        : breakMinutes,
                    0
                );
                startStopTimer(nextTimer);
            } else {
                updateTimer(timerRunning);
            }
        }, 1000);
    }
};

const decideAndStartTimer = () => {
    if (!isTimerRunning) {
        isTimerRunning = true;
        startStopTimer(isSessionActive ? timeLeftSession : timeLeftBreak);
    } else {
        isTimerRunning = false;
        clearInterval(timerInterval);
    }
};

$breakDecrementBtn.addEventListener('click', () =>
    changeTime('break', 'decrement')
);
$breakIncrementBtn.addEventListener('click', () =>
    changeTime('break', 'increment')
);

$sessionDecrementBtn.addEventListener('click', () =>
    changeTime('session', 'decrement')
);
$sessionIncrementBtn.addEventListener('click', () =>
    changeTime('session', 'increment')
);

$resetBtn.addEventListener('click', resetTimer);
$startStopBtn.addEventListener('click', decideAndStartTimer);
