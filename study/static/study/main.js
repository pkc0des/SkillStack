const color1 = 'hsl(234, 96%, 70%)';
const color2 = 'hsl(234, 96%, 55%)';
const color3 = 'hsl(215, 96%, 63%)';
const color4 = 'hsl(215, 96%, 50%)'

document.addEventListener("DOMContentLoaded", () => {
    showSubjectPieChart();
});


function showSubjectPieChart() {

    let sliceA = {size:250, color: color1};
    let sliceB = {size:200, color: color2};
    let sliceC = {size: 300, color: color3};
    let sliceD = {size: 100, color: color4}

    const values = [sliceA, sliceB, sliceC, sliceD];
    const total = values.reduce((accumulator, value) => accumulator+value.size, 0);

    let startAngle = 0;

    // Values of the pie chart %

    const canvas = document.querySelector(".pie-chart");
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
    const legend = document.querySelector(".pie-chart-legend");
    legend.innerHTML = `
        <div class="legend-item">
            <div class="legend-color" style="background-color:${sliceA.color}"></div>
            <div class="legend-label">Programming: ${sliceA.size} hours - ${((sliceA.size / total) * 100).toFixed(2)}%</div>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color:${sliceB.color}"></div>
            <div class="legend-label">Mathematics: ${sliceB.size} hours - ${((sliceB.size / total) * 100).toFixed(2)}%</div>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color:${sliceC.color}"></div>
            <div class="legend-label">Science: ${sliceC.size} hours - ${((sliceC.size / total) * 100).toFixed(2)}%</div>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color:${sliceD.color}"></div>
            <div class="legend-label">English & SS: ${sliceD.size} hours - ${((sliceD.size / total) * 100).toFixed(2)}%</div>
        </div>
         
    `
}