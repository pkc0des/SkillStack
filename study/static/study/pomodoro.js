// Study Elements querySelectors
const startButton = document.querySelector(".start-btn");
const pauseButton = document.querySelector(".pause-btn");
const subjectDropdown = document.querySelector("#subjects-dropdown")

// Toggle Elements querySelectors
const studyButton = document.querySelector("#study-btn");
const breakButton = document.querySelector("#break-btn");

// Mutual Elements
const timer = document.querySelector(".time");
const duration = document.querySelector("#duration");

// Message Elements
const messageContainer = document.querySelector(".result-message-container");
const responseType = messageContainer.querySelector(".response-type");
const message = messageContainer.querySelector(".message");

// Tokens
const csrfToken = document.querySelector("[name='csrfmiddlewaretoken']").value;

// Global Variables
let isPaused = false

let remainingMinutes = 0
let remainingSeconds = 0

let isStarted = false;
let mode = "study";

let startTime = null;
let endTime = null;

let isEnded = false;
let subjectToStudy = subjectDropdown.value



// Event Handlers

studyButton.addEventListener("click", () => {
    if (isPaused == false) {
        return
    }
    mode = "study";
    breakButton.style.backgroundColor = 'hsl(212, 17%, 67%)';
    studyButton.style.backgroundColor = 'hsl(213, 84%, 58%)';
    remainingMinutes = 25;
    remainingSeconds = 0;
    setTimer();
    isStarted = false;
})

breakButton.addEventListener("click", () => {
    setUpLocalStorage()
    if (isPaused == false) {
        isPaused = true
    }
    mode = "break";
    studyButton.style.backgroundColor =  'hsl(212, 17%, 67%)';
    breakButton.style.backgroundColor = 'hsl(220, 96%, 55%)';
    remainingMinutes = 5;
    remainingSeconds = 0;
    setTimer();
    isStarted = false;
})


startButton.addEventListener("click", () => {
    if (!isPaused) {
        isEnded = false;
        startTime = Date.now();
        const durationValue = duration.value == '' ? mode == "break" ? 5: 25: Number(duration.value);
        setEndTime(Number(startTime) + (durationValue * 60 * 1000));
        
    }

    subjectToStudy = subjectDropdown.value
    setStartTime(startTime)
    setTimer();
    startTimer();
    toggleStart("start");
    isStarted = true
})

pauseButton.addEventListener("click", () => {
    toggleStart("pause");
})


function setTimer() {
    timer.textContent = `${remainingMinutes >= 10 ? remainingMinutes : `0${remainingMinutes}`}:${remainingSeconds >= 10 ? remainingSeconds : `0${remainingSeconds}`}`;
}

function startTimer() {
    const updateTimer = setInterval(() => {
        let remainingTime = Number(getEndTime()) - Date.now()
        let remainingTotalSeconds = Math.ceil(remainingTime / 1000)
        remainingMinutes = Math.floor(remainingTotalSeconds / 60)
        remainingSeconds = remainingTotalSeconds % 60

        if (isPaused === true || isEnded === true) {
            clearInterval(updateTimer)
            console.log(isEnded)
            return
        }

        
        
        if (remainingTime <= 0 && isEnded === false) {
            setTimer()
            return completedTimer(mode)
        }
        
        setTimer();
    }, 1000)
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
        isEnded = true
        logPomodoroTime()

    } else if (currentMode === "break") {
        console.log("Finished break");
    }
    setUpLocalStorage()
    setTimer()
}

function updateMessage(resType, content) {
    messageContainer.hidden = false
    console.log(resType)
    console.log(content)
    responseType.textContent = resType

    if (resType == "success") {
        responseType.style.color = 'rgb(79, 145, 72)';
    } else if (resType == "error") {
        responseType.style.color = 'rgb(211, 47, 47)';
    }
    message.textContent = content
}

async function logPomodoroTime() {
    const url = 'http://127.0.0.1:8000/pomodoro'
    
    let finalStartDate = new Date(Number(getStartTime())).toISOString();
    let finalEndDate = new Date(Number(getEndTime())).toISOString();
    
    const payload = {
        startTime: finalStartDate,
        endTime: finalEndDate,
        subjectStudied: subjectToStudy
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": csrfToken
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            updateMessage("Success", "Pomodoro successfully completed! Check the dashboard!");
            console.log("Successfully created study session");
        } else {
            updateMessage("Error", "An error occured while logging the pomodoro!");
            console.log("Error occured");
        }

    } catch(error) {
        console.log(`There was an error: ${error}`);
        updateMessage("error", error)
    }

}

function setUpLocalStorage() {
    remainingMinutes = 0;
    remainingSeconds = 0;
    localStorage.setItem("startTime", "");
    localStorage.setItem("endTime", "");
    localStorage.setItem("pauseList", "");
}

function setStartTime(startTime) {
    return localStorage.setItem("startTime", startTime)
}

function setEndTime(endTime) {
    return localStorage.setItem("endTime", endTime)
}

function getStartTime() {
    return localStorage.getItem("startTime")
}

function getEndTime() {
    return localStorage.getItem("endTime")
}


function calculatePauseDuration(startPause, endPause) {
    return endPause - startPause
}

function appendPause(pauseDuration) {
    let pauseList = readPauses();
    pauseList.append(pauseDuration);
    return localStorage.setItem("pauseList", pausesList)
}

function readPauses() {
    return localStorage.getItem("pauseList");
}

