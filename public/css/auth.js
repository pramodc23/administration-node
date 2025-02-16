document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem("authToken"); // Retrieve stored token

    if (!token) {
        alert("User not authenticated! Please log in.");
        window.location.href = "/"; // Redirect if no token
        return;
    }

    fetch('http://localhost:3000/home', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("homeContent").innerHTML = data; // Replace the home content
    })
    .catch(error => console.error('Error:', error));
});