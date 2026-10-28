
function showDetails(name, date, description) {
    document.getElementById("eventDetails").innerHTML = `
        <h4>${name}</h4>
        <p><strong>Date:</strong> ${date}</p>
        <p>${description}</p>
    `;

    document.getElementById("details").scrollIntoView({
        behavior: "smooth"
    });
}

document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const selectedEvent = document.getElementById("event").value;

    document.getElementById("message").innerHTML = `
        <div class="alert alert-success">
            Thank you, ${name}! You have successfully registered
            for ${selectedEvent}.
        </div>
    `;

    this.reset();
});
