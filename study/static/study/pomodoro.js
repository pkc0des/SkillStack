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

let durationMinutes = 0
let durationSeconds = 0

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
    durationMinutes = 25;
    durationSeconds = 0;
    setTimer();
    isStarted = false;
})

breakButton.addEventListener("click", () => {
    if (isPaused == false) {
        return
    }
    mode = "break";
    studyButton.style.backgroundColor =  'hsl(212, 17%, 67%)';
    breakButton.style.backgroundColor = 'hsl(220, 96%, 55%)';
    durationMinutes = 5;
    durationSeconds = 0;
    setTimer();
    isStarted = false;
})


startButton.addEventListener("click", () => {
    subjectToStudy = subjectDropdown.value
    console.log(subjectToStudy)

    isEnded = false
    startTime = new Date()
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

    toggleStart("pause");

})


function setTimer() {
    timer.textContent = `${durationMinutes > 0 ? durationMinutes : `0${durationMinutes}`}:${durationSeconds >= 10 ? durationSeconds : `0${durationSeconds}`}`;
}

function startTimer() {
    const updateTimer = setInterval(() => {
        if (isPaused === true || isEnded === true) {
            clearInterval(updateTimer)
            console.log(isEnded)
            return
        }

        
        
        if (durationMinutes <= 0 && durationSeconds <= 0 && isEnded === false) {
            setTimer()
            return completedTimer(mode)
        }
        
        if (durationSeconds <= 0) {
            durationMinutes -= 1;
            durationSeconds = 59;
        }

        durationSeconds -= 1;
        setTimer(durationMinutes, durationSeconds);

        if (isEnded === true) {
            console.log(isEnded);
            durationMinutes = 0;
            durationSeconds = 0;
            setTimer()
        }

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
        isEnded = true
        endTime = new Date();
        logPomodoroTime()

    } else if (currentMode === "break") {
        console.log("Finished break");
    }
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
    const payload = {
        startTime: startTime,
        endTime: endTime,
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
            updateMessage("success", "Pomodoro successfully completed! Check the dashboard!")
            console.log("Successfully created study session")
        }

    } catch(error) {
        console.log(`There was an error: ${error}`);
        updateMessage("error", error)
    }

}

function setUpLocalStorage() {
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

