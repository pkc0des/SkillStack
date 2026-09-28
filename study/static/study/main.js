const color1 = 'hsl(234, 96%, 70%)';
const color2 = 'hsl(234, 96%, 55%)';
const color3 = 'hsl(215, 96%, 63%)';
const color4 = 'hsl(215, 96%, 50%)'

document.addEventListener("DOMContentLoaded", () => {
    showSubjectPieChart();
    showLogPieChart();
});


function showSubjectPieChart() {
    const resultContainer = document.querySelector(".study-result")

    let slice1 = {size:13, color: color1};
    let slice2 = {size:2, color: color2};
    let slice3 = {size: 2, color: color3};
    let slice4 = {size: 4, color: color4}

    const values = [slice1, slice2, slice3, slice4];
    const total = values.reduce((accumulator, value) => accumulator+value.size, 0);

    let startAngle = 0;

    // Values of the pie chart %

    const canvas = resultContainer.querySelector(".pie-chart");
    const ctx = canvas.getContext("2d");

    // Calculate angles
    values.forEach((value, index) => {
        const angle = (value.size/total) * Math.PI * 2;

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
        ctx.fillStyle = value.color
        ctx.fill()

        startAngle += angle
    })

    // Show Legend
    const legend = resultContainer.querySelector(".pie-chart-legend");
    legend.innerHTML = `
        <div class="legend-item">
            <div class="legend-color" style="background-color:${slice1.color}"></div>
            <div class="legend-label">Programming: ${slice1.size} hours - ${((slice1.size / total) * 100).toFixed(2)}%</div>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color:${slice2.color}"></div>
            <div class="legend-label">Mathematics: ${slice2.size} hours - ${((slice2.size / total) * 100).toFixed(2)}%</div>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color:${slice3.color}"></div>
            <div class="legend-label">Science: ${slice3.size} hours - ${((slice3.size / total) * 100).toFixed(2)}%</div>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color:${slice4.color}"></div>
            <div class="legend-label">English & SS: ${slice4.size} hours - ${((slice4.size / total) * 100).toFixed(2)}%</div>
        </div>
         
    `
}

function showLogPieChart() {
    const resultContainer = document.querySelector(".log-result")

    const slice1= {size: 12, color: color1};
    const slice2 = {size: 5, color: color2};

    const values = [slice1, slice2];
    const total = values.reduce((accumulator, value) => accumulator+value.size, 0);

    let startAngle = 0;

    const canvas = resultContainer.querySelector(".pie-chart");
    const ctx = canvas.getContext("2d");

    values.forEach((value, index) => {
        const angle = (value.size/total) * Math.PI * 2;

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
        ctx.fillStyle = value.color
        ctx.fill()

        startAngle += angle
    })

    const legend = resultContainer.querySelector(".pie-chart-legend");
    legend.innerHTML = `
        <div class="legend-item">
            <div class="legend-color" style="background-color:${slice1.color}"></div>
            <div class="legend-label">Pomodoro: ${slice1.size} hours - ${((slice1.size / total) * 100).toFixed(2)}%</div>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color:${slice2.color}"></div>
            <div class="legend-label">Logged: ${slice2.size} hours - ${((slice2.size / total) * 100).toFixed(2)}%</div>
        </div>   
    `
}

