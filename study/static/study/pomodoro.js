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
let isPaused = false;

let remainingMinutes = 0;
let remainingSeconds = 0;

let isStarted = false;
let mode = "study";

let startTime;
let endTime;

let isEnded = false;
let subjectToStudy = subjectDropdown.value;

let startPause;
let endPause;



// Event Handlers

studyButton.addEventListener("click", () => {
    if (mode === "study") {
        return
    }
    mode = "study";
    breakButton.style.backgroundColor = 'hsl(212, 17%, 67%)';
    studyButton.style.backgroundColor = 'hsl(213, 84%, 58%)';
    remainingMinutes = 25;
    remainingSeconds = 0;
    setTimer();
    isStarted = false;
    isEnded = true;
})

breakButton.addEventListener("click", () => {
    if (mode === "break") {
        return
    }
    setUpLocalStorage()
    if (isPaused == false) {
        isPaused = true
    }
    mode = "break";
    studyButton.style.backgroundColor =  'hsl(212, 17%, 67%)';
    breakButton.style.backgroundColor = 'hsl(220, 96%, 55%)';
    setTimer();
    isStarted = false;
    isEnded = true;
})


startButton.addEventListener("click", () => {
    const durationValue = duration.value == '' ? mode == "break" ? 5: 25: Number(duration.value);
    if (isStarted && isPaused) {
        endPause = Date.now();
        appendPause(endPause - startPause);
        console.log("Appended pause.");

    } else {
        setUpLocalStorage()
        isEnded = false;
        startTime = Date.now();
        setStartTime(startTime);
        setEndTime(Number(startTime) + (durationValue * 60 * 1000)); 
        
    }

    toggleStart("start");
    subjectToStudy = subjectDropdown.value
    
    startTimer();
    setTimer();
    isStarted = true
})

pauseButton.addEventListener("click", () => {
    toggleStart("pause");
    startPause = Date.now()
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
        logPomodoroTime()
        isEnded = true

    } else if (currentMode === "break") {
        console.log("Finished break");
    }
    toggleStart("pause");
    isStarted = false;
    isPaused = false;
    setUpLocalStorage();
    setTimer();
}

function updateMessage(resType, content) {
    messageContainer.hidden = false
    console.log(resType)
    console.log(content)
    responseType.textContent = resType

    if (resType.toLowerCase() == "success") {
        responseType.style.color = 'rgb(79, 145, 72)';
    } else if (resType.toLowerCase() == "error") {
        responseType.style.color = 'rgb(211, 47, 47)';
    }
    message.textContent = content
}

async function logPomodoroTime() {
    const url = 'http://127.0.0.1:8000/pomodoro'
    
    let finalStartDate = new Date(Number(getStartTime())).toISOString();
    let finalEndDate = new Date(Number(getEndTime())).toISOString();
    let totalPauseTime = readPauses().reduce((total, currentPause) => {
        return total + currentPause
    }, 0);

    console.log(totalPauseTime)
    
    const payload = {
        startTime: finalStartDate,
        endTime: finalEndDate,
        subjectStudied: subjectToStudy,
        totalPauseTime: totalPauseTime
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
            updateMessage(`Error: ${response.status}`, "An error occured while logging the pomodoro!");
            console.log("An error occured");
        }

    } catch(error) {
        console.log(`There was an error: ${error}`);
        updateMessage("error", error)
    }

}

function resetPauseTimes() {
    startPause = 0;
    endPause = 0;
}

function setUpLocalStorage() {
    remainingMinutes = 0;
    remainingSeconds = 0;
    localStorage.setItem("startTime", "");
    localStorage.setItem("endTime", "");
    localStorage.setItem("pauseList", JSON.stringify([]));
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
    console.log(pauseList)
    pauseList.push(pauseDuration);
    setEndTime(Number(getEndTime()) + pauseDuration)
    resetPauseTimes();
    return localStorage.setItem("pauseList", JSON.stringify(pauseList))
}

function readPauses() {
    return JSON.parse(localStorage.getItem("pauseList"));
}

