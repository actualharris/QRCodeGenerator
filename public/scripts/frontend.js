// Client-side validation

document.getElementById("qrForm").addEventListener("submit", function(event) {
    const userInput = document.getElementById("textArea").value;

    // Check if the input field is blank
    if (!userInput.trim()) {
        event.preventDefault(); // Prevent form submission
        alert("Please enter some text to generate a QR code."); // Display alert to the user
    }
});
