import { createDocument } from './db.js';

// on load
document.addEventListener("DOMContentLoaded", function () {

    if (localStorage.getItem("authenticated")) {
        console.log("User is already authenticated, redirect to home page.");
        window.location.href = `/index.html`;
    }
    // another event after its loaded to check button
    document.getElementById("signup-button").addEventListener("click", async (e) => {
        e.preventDefault(); // prevent button click from redirecting to random place.

        let email = document.getElementById("signup-email").value;
        let username = document.getElementById("signup-username").value;
        let password = document.getElementById("signup-password").value;
        let rePassword = document.getElementById("signup-repassword").value;

        if (password != rePassword) {
            alert("Password is not the same.");
            document.getElementById("signup-repassword").value = "";
            return;
        }

        if (!email || !password) {
            // do something here to let user know that they need to fill in both fields
            return;
        }

        console.log(`Attempting to Sign up with ${email}, ${username} and ${password}.`);

        const data = {
            email,
            username,
            password,
            bio: "",
            avatar_url: "",
            rating: 0,
            points: 0,
            total_sales: 0
        };

        try {
            const response = await createDocument("users", data);
            console.log("Created user successfully.", response);
            localStorage.setItem("authenticated", true);
            localStorage.setItem("userName", data.username);
            localStorage.setItem("userId", response.name);
            window.location.href = `/index.html`;
        } catch (error) {
            console.error("Error Creating User:", error);
            if (error.status === 400) {
                return;
            }
            return;
        }
    });
});