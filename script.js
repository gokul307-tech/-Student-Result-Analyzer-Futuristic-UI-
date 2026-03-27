let chartInstance = null;

function analyze() {
    let subjects = ["Math", "Physics", "Chemistry", "English"];

    let marks = [
        Number(document.getElementById("math").value),
        Number(document.getElementById("physics").value),
        Number(document.getElementById("chemistry").value),
        Number(document.getElementById("english").value)
    ];

    let output = document.getElementById("output");

    // Validation
    if (marks.some(isNaN)) {
        output.innerHTML = "❌ Please enter all marks!";
        return;
    }

    // Calculations
    let total = marks.reduce((a, b) => a + b, 0);
    let avg = total / marks.length;

    let grade = "";
    if (avg >= 90) grade = "A+";
    else if (avg >= 75) grade = "A";
    else if (avg >= 60) grade = "B";
    else if (avg >= 50) grade = "C";
    else grade = "Fail";

    // Find strongest & weakest
    let max = Math.max(...marks);
    let min = Math.min(...marks);

    let strongest = subjects[marks.indexOf(max)];
    let weakest = subjects[marks.indexOf(min)];

    // Suggestions
    let suggestion = "";
    if (grade === "A+" || grade === "A") {
        suggestion = "🔥 Excellent! Keep pushing forward!";
    } else if (grade === "B") {
        suggestion = `⚡ Good, but improve ${weakest}`;
    } else {
        suggestion = `🚨 Focus more on ${weakest}`;
    }

    // Output
    output.innerHTML = `
        <h3>📊 RESULT</h3>
        Total: ${total} <br>
        Average: ${avg.toFixed(2)} <br>
        Grade: ${grade} <br><br>

        Strongest Subject: ${strongest} <br>
        Weakest Subject: ${weakest} <br><br>

        💡 ${suggestion}
    `;

    // Chart
    let ctx = document.getElementById("chart").getContext("2d");

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: subjects,
            datasets: [{
                label: "Marks",
                data: marks
            }]
        }
    });
}