// Study Elements querySelectors
const startButton = document.querySelector(".start-btn");
const pauseButton = document.querySelector(".pause-btn");

// Toggle Elements querySelectors
const studyButton = document.querySelector(".study-btn");
const breakButton = document.querySelector(".break-btn");

// Mutual Elements
const timer = document.querySelector(".time");
const duration = document.querySelector("#duration");



// Event Handlers

startButton.addEventListener("click", () => {
    
    let duration_minutes = duration.value - 1;
    if(validate_duration(duration_minutes) == false) {
        duration_minutes = 24;
    }
    let duration_seconds = 59;
    set_timer(duration_minutes, duration_seconds);
    start_timer(duration_minutes, duration_seconds);
    toggle_start("start")
})


function set_timer(duration_minutes, duration_seconds) {
    timer.textContent = `${duration_minutes > 0 ? duration_minutes : `0${duration_minutes}`}:${duration_seconds >= 10 ? duration_seconds : `0${duration_seconds}`}`;
}

function start_timer(duration_minutes, duration_seconds) {
    setInterval(() => {
        
        if (duration_minutes <= 0 && duration_seconds <= 0) {
            set_timer(0, 0)
            return "Done"
        }
        
        if (duration_seconds == 0) {
            duration_minutes -= 1;
            duration_seconds = 59;
        }

        duration_seconds -= 5;
        set_timer(duration_minutes, duration_seconds);
    }, 1000)
}

function validate_duration(duration_minutes) {
    if (duration_minutes === undefined){
        return false
    }
    return true
}

function toggle_start(type_to_turn_off) {
    if (type_to_turn_off === "start") {
        startButton.style.display = 'none';
        pauseButton.style.display = 'block';
    } else if (type_to_turn_off === "pause") {
        pauseButton.style.display = 'none';
        startButtonButton.style.display = 'block';
    }
}


