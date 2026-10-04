// Study Elements querySelectors
const startButton = document.querySelector(".start-btn");
const pauseButton = document.querySelector(".pause-btn");

// Toggle Elements querySelectors
const studyButton = document.querySelector(".study-btn");
const breakButton = document.querySelector(".break-btn");

// Mutual Elements
const timer = document.querySelector(".time");
const duration = document.querySelector("#duration");

// Global Variables
let isPaused = false

let durationMinutes = 0
let durationSeconds = 0

let isStarted = false;
let mode = "study";


// Event Handlers

studyButton.addEventListener("click", () => {
    mode = "study";
})

breakButton.addEventListener("click" () => {
    mode = "break";
})


startButton.addEventListener("click", () => {
    durationMinutes =  durationMinutes === 0 ? duration.value : durationMinutes;
    durationSeconds = durationSeconds === 0 ? 59 : durationSeconds;
    if(validateDuration(durationMinutes) == false) {
        durationMinutes = 25;
        durationSeconds = 59;
    }

     if (!isStarted) {
        durationMinutes -= 1;
    }
    
    
    setTimer();
    startTimer();
    toggleStart("start");
    isStarted = true
})

pauseButton.addEventListener("click", () => {
    const curr_mins = durationMinutes;
    const curr_secs = durationSeconds;

    console.log(curr_mins);
    console.log(curr_secs);

    toggleStart("pause");

})


function setTimer() {
    timer.textContent = `${durationMinutes > 0 ? durationMinutes : `0${durationMinutes}`}:${durationSeconds >= 10 ? durationSeconds : `0${durationSeconds}`}`;
}

function startTimer() {
    const updateTimer = setInterval(() => {
        if (isPaused == true) {
            clearInterval(updateTimer)
        }
        
        if (durationMinutes <= 0 && durationSeconds <= 0) {
            setTimer(0, 0)
            return completedTimer(mode)
        }
        
        if (durationSeconds <= 0) {
            durationMinutes -= 1;
            durationSeconds = 59;
        }

        durationSeconds -= 1;
        setTimer(durationMinutes, durationSeconds);

    }, 1000)
}

function validateDuration() {
    console.log(durationMinutes)
    if (durationMinutes === undefined || durationMinutes === ''){
        return false
    } else if (durationMinutes === 0) {
        return false
    }

    return true
}

function toggleStart(typeToTurnOff) {
    if (typeToTurnOff === "start") {
        startButton.style.display = 'none';
        pauseButton.style.display = 'block';
        isPaused = false;
    } else if (typeToTurnOff === "pause") {
        pauseButton.style.display = 'none';
        startButton.style.display = 'block';
        isPaused = true;
    }
}

function completedTimer(currentMode) {
    if (currentMode === "study") {
        console.log("Finished pomodoro");

    } else if (currentMode === "break") {
        console.log("Finished break");
    }
}


