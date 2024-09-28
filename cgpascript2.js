// cgpascript.js

const subjectCodes = {
    1: ["HS3151", "MA3151", "PH3151", "CY3151", "GE3151", "GE3171", "BS3171"],
    2: ["HS3251", "MA3251", "PH3202", "BE3255", "GE3251", "EE3251", "GE3271", "EE3271"],
    3: ["MA3303", "EE3301", "EC3301", "EE3302", "EE3303", "CS3353", "EE3311", "EC3311", "CS3362", "GE3361"],
    4: ["EE3401", "EE3402", "EE3403", "EE3404", "EE3405", "GE3451", "EE3411", "EE3412", "EE3413", "SB8026"],
    5: ["EE3501", "EE3591", "EE3503", "EE3007", "EE3009", "EE3020", "EE3511", "EE3512", "EVA001", "MX3084", "SB3002"],
    6: ["EE3601", "EE3602", "EE3035", "CIC333", "OCS352", "EE3611", "MX3086", "SB8065"],
    7: ["EE3701", "GE3791", "EE0000", "EE0000", "EE0000", "EE0000", "EE0000"],
    8: ["EE3811"]

};

const gradePoints = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5,
    "U": 0,
    "RA": 0,
    "SA": 0,
    "W": 0
};

const subjectCredits ={
    1: [3, 4, 3, 3, 3, 2, 2],
    2: [2, 4, 3, 3, 4, 4, 2, 2],
    3: [4, 4, 3, 3, 3, 3, 1.5, 1.5, 1.5, 1],
    4: [2, 3, 3, 3, 3, 3, 1.5, 1.5, 1.5, 0],
    5: [3, 3, 3, 3, 3, 3, 1.5, 2, 0, 0, 0 ],
    6: [3, 3, 3, 3, 3, 1.5, 0, 0],
    7: [3, 2, 3, 3, 3, 3, 3],
    8: [10]
}

function showSubjects() {
    const startSemester = parseInt(document.getElementById("startSemester").value);
    const endSemester = parseInt(document.getElementById("endSemester").value);
    let subjectsList = '';

    for (let i = startSemester; i <= endSemester; i++) {
        if (i in subjectCodes) {
            subjectsList += `<p>Semester ${i} Subjects:</p>`;
            subjectCodes[i].forEach(subject => {
                subjectsList += `
                    <div>
                        <label>Enter grade for ${subject}:</label>
                        <select id="${subject}Grade" name="${subject}Grade">
                            <option value="O">O</option>
                            <option value="A+">A+</option>
                            <option value="A">A</option>
                            <option value="B+">B+</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="U">U</option>
                            <option value="RA">RA</option>
                            <option value="SA">SA</option>
                            <option value="W">W</option>
                        </select>
                    </div>
                `;
            });
        } else {
            subjectsList += `<p>No subjects found for Semester ${i}</p>`;
        }
    }

    document.getElementById("subjectCodes").innerHTML = subjectsList;
    document.getElementById("calculateCGPABtn").style.display = "block";
}







function calculateCGPA() {
    // Clear previous unknown credits messages
    document.getElementById("sem5UnknownCredits").innerHTML = '';  // Clear semester 5 message
    document.getElementById("sem6UnknownCredits").innerHTML = '';  // Clear semester 6 message

    // Get the start and end semesters
    const startSemester = parseInt(document.getElementById("startSemester").value);
    const endSemester = parseInt(document.getElementById("endSemester").value);

    // Initialize total credits and grade points for CGPA calculation
    let totalPassedCreditsCGPA = 0;
    let totalGradePointsCGPA = 0;
    let gpaOutput = '';
    let cgpaOutput = '';

    let sem5unknowncredits = "The Credits for EVA001, SB3002 in Semester 5 are unknown, so the CGPA calculation is excluding those subjects. I'll update it shortly..!";
    let sem6unknowncredits = "The Credits for MX3086, SB8065 in Semester 6 are unknown, so the CGPA calculation is excluding those subjects. I'll update it shortly..!";

    // Loop through each semester for calculation
    for (let semester = startSemester; semester <= endSemester; semester++) {
        let totalPassedCredits = 0;
        let totalGradePoints = 0;
        let semesterGPA = 0;
        let semesterCGPA = 0;

        console.log(`\nSemester ${semester} Subjects:`);

        subjectCodes[semester].forEach((subject, index) => {
            let grade = document.getElementById(`${subject}Grade`).value;
            let credit = subjectCredits[semester][index];

            if (gradePoints[grade] > 0) { // Consider only passed subjects for calculation
                totalPassedCredits += credit;
                totalGradePoints += gradePoints[grade] * credit;
                console.log(`${subject}: ${grade} (${credit} credits)`);
            }
        });

        if (totalPassedCredits > 0) {
            semesterGPA = totalGradePoints / totalPassedCredits;
            console.log(`GPA for semester ${semester}: ${semesterGPA} `);
            totalPassedCreditsCGPA += totalPassedCredits;
            totalGradePointsCGPA += totalGradePoints;
            semesterCGPA = totalGradePointsCGPA / totalPassedCreditsCGPA;
            console.log(`CGPA for semester ${semester}: ${semesterCGPA} `);
        } else {
            console.log("No passed subjects in this semester.");
        }

        gpaOutput += `GPA for semester ${semester}: ${semesterGPA.toFixed(3)}<br>`;
        cgpaOutput += `CGPA for semester ${semester}: ${semesterCGPA.toFixed(3)}<br>`;
    }

    // Display messages for unknown credits if semester 5 or 6 is included in the calculation
    if (startSemester <= 5 && endSemester >= 5) {
        document.getElementById("sem5UnknownCredits").innerHTML = sem5unknowncredits;
    }
    if (startSemester <= 6 && endSemester >= 6) {
        document.getElementById("sem6UnknownCredits").innerHTML = sem6unknowncredits;
    }

    // Display GPA and CGPA outputs
    document.getElementById("gpaOutput").innerHTML = gpaOutput;
    document.getElementById("cgpaOutput").innerHTML = cgpaOutput;
    }  
