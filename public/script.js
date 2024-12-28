document.getElementById("api-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const service = document.getElementById("service").value;
    const inputText = document.getElementById("input-text").value;

    if (!service) {
        alert("Please select a service!");
        return;
    }

    if (!inputText.trim()) {
        alert("Please enter some text to process!");
        return;
    }

    // Update UI to show loading state
    const responseElement = document.getElementById("response");
    responseElement.textContent = "Processing...";

    try {
        // Send the request to the backend API
        const response = await fetch(`http://localhost:5000/${service}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: inputText }),
        });

        const data = await response.json();

        if (response.ok) {
            responseElement.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        } else {
            responseElement.innerHTML = `Error: ${data.error || "Unknown error"}`;
        }
    } catch (error) {
        responseElement.textContent = `Error connecting to the service: ${error.message}`;
    }
});
