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
let is_paused = false

let duration_minutes = 0
let duration_seconds = 0

let is_started = false;


// Event Handlers

startButton.addEventListener("click", () => {
    duration_minutes = duration.value == duration_minutes ? duration.value : duration_minutes;
    duration_seconds = duration_seconds === 0 ? 59 : duration_seconds;
    if(validate_duration(duration_minutes) == false) {
        duration_minutes = 25;
        duration_seconds = 59;
    }

     if (!is_started) {
        duration_minutes -= 1;
    }
    
    
    set_timer();
    start_timer();
    toggle_start("start");
    is_started = true
})

pauseButton.addEventListener("click", () => {
    const curr_mins = duration_minutes;
    const curr_secs = duration_seconds;

    console.log(curr_mins);
    console.log(curr_secs);

    toggle_start("pause");

})


function set_timer() {
    timer.textContent = `${duration_minutes > 0 ? duration_minutes : `0${duration_minutes}`}:${duration_seconds >= 10 ? duration_seconds : `0${duration_seconds}`}`;
}

function start_timer() {
    const updateTimer = setInterval(() => {
        if (is_paused == true) {
            clearInterval(updateTimer)
        }
        
        if (duration_minutes <= 0 && duration_seconds <= 0) {
            set_timer(0, 0)
            return "Done"
        }
        
        if (duration_seconds <= 0) {
            duration_minutes -= 1;
            duration_seconds = 59;
        }

        duration_seconds -= 1;
        set_timer(duration_minutes, duration_seconds);

    }, 1000)
}

function validate_duration() {
    console.log(duration_minutes)
    if (duration_minutes === undefined || duration_minutes === ''){
        return false
    } else if (duration_minutes === 0) {
        return false
    }

    return true
}

function toggle_start(type_to_turn_off) {
    if (type_to_turn_off === "start") {
        startButton.style.display = 'none';
        pauseButton.style.display = 'block';
        is_paused = false;
    } else if (type_to_turn_off === "pause") {
        pauseButton.style.display = 'none';
        startButton.style.display = 'block';
        is_paused = true;
    }
}


