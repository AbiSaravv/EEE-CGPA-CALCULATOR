// cgpascript.js

function submitForm() {
    // Get form elements
    const name = document.getElementById('name').value;
    const regNumber = document.getElementById('regNumber').value;

    // Redirect to the second HTML page with query parameters
    window.location.href = `cgpaindex2.html?name=${name}&regNumber=${regNumber}`;
}