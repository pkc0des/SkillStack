const subjectStats = JSON.parse(document.querySelector("#subject-data").textContent);
const pomodoroStats = JSON.parse(document.querySelector("#pomodoro-data").textContent);



const color1 = 'hsl(234, 96%, 70%)';
const color2 = 'hsl(234, 96%, 55%)';
const color3 = 'hsl(215, 96%, 63%)';
const color4 = 'hsl(215, 96%, 50%)';

document.addEventListener("DOMContentLoaded", () => {
    showSubjectPieChart();
    showLogPieChart();
});

function showSubjectPieChart() {
    const resultContainer = document.querySelector(".study-result")

    const subjects = subjectStats.map(subject => {
        let name = subject["subject__name"]
        let size = subject["total_minutes"]
        let formatted_time = subject["formatted_minutes"]
        let color = subject["subject__color"]

        return {size, color, formatted_time, name}
    })

    const total = subjects.reduce((totalSize, subject) => {
        return totalSize + subject.size
    }, 0);

    let startAngle = 0;

    // Values of the pie chart %

    const canvas = resultContainer.querySelector(".pie-chart");
    const ctx = canvas.getContext("2d");

    // Calculate angles
    subjects.forEach((subject, index) => {
        const angle = (subject.size/total) * Math.PI * 2;

        // Draw a slice
        ctx.beginPath();
        ctx.moveTo(canvas.width/2, canvas.height/2);
        ctx.arc(
            canvas.width / 2,
            canvas.height/2, 
            canvas.width / 2,
            startAngle,
            startAngle + angle
        );

        ctx.closePath();
        ctx.fillStyle = subject.color
        ctx.fill()

        startAngle += angle
    })

    // Show Legend
    const legend = resultContainer.querySelector(".pie-chart-legend");
    legend.innerHTML = subjects.map(subject =>
        `<div class="legend-item">
            <div class="legend-color" style="background-color:${subject.color}"></div>
            <div class="legend-label">${subject.name}: ${subject.formatted_time} - ${((subject.size / total) * 100).toFixed(2)}%</div>
        </div>`).join("");
    
}

function showLogPieChart() {
    const resultContainer = document.querySelector(".log-result")
    const studyAmounts = pomodoroStats.map(studyType => {
        let name = studyType["type"];
        let size = studyType["total_minutes"];
        let formatted_time = studyType["formatted_minutes"];
        let color = ""
        if (name === "Pomodoro") {
            color=color1
        } else {
            color=color3
        }
        

        return {size, formatted_time, name, color}
    })

    const total = studyAmounts.reduce((totalSize, value) => {
        return totalSize + value.size
    }, 0);

    let startAngle = 0;

    const canvas = resultContainer.querySelector(".pie-chart");
    const ctx = canvas.getContext("2d");

    studyAmounts.forEach((studyType, index) => {
        const angle = (studyType.size/total) * Math.PI * 2;

        ctx.beginPath();
        ctx.moveTo(canvas.width/2, canvas.height/2);
        ctx.arc(
            canvas.width / 2,
            canvas.height/2, 
            canvas.width / 2,
            startAngle,
            startAngle + angle
        );

        ctx.closePath();
        ctx.fillStyle = studyType.color
        ctx.fill()

        startAngle += angle
    })

    const legend = resultContainer.querySelector(".pie-chart-legend");
    legend.innerHTML = studyAmounts.map(studyType =>
        `<div class="legend-item">
            <div class="legend-color" style="background-color:${studyType.color}"></div>
            <div class="legend-label">${studyType.name}: ${studyType.formatted_time} - ${((studyType.size / total) * 100).toFixed(2)}%</div>
        </div>`).join("");
}

