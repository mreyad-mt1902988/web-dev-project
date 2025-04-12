const loginForm = document.querySelector("#login-form");
const errorMessage = document.querySelector("#error-message");

loginForm.addEventListener("submit", handleLogin);

async function handleLogin(event) {
    event.preventDefault();

    const role = document.querySelector("#role").value;
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();

    const response = await fetch("data/users.json");
    const users = await response.json();

    const user = users.find(user => user.username === username && user.password === password && user.type === role);

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        errorMessage.style.display = "none";
        window.location.href = "index.html";
    }
    else {
        errorMessage.style.display = "block";
        errorMessage.innerText = "Invalid username, password, or role. Please try again.";
    }
}
