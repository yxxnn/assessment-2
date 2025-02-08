import { createDocument } from './db.js';

// on load
document.addEventListener("DOMContentLoaded", function () {
    // another event after its loaded to check button
    document.getElementById("signup-button").addEventListener("click", async (e) => {
        e.preventDefault(); // prevent button click from redirecting to random place.

        let email = document.getElementById("signup-email").value;
        let username = document.getElementById("signup-username").value;
        let password = document.getElementById("signup-password").value;
        let rePassword = document.getElementById("signup-repassword").value;

        if (password != rePassword) {
            // do something here to let user know that they need to have their password on both fields correct.
            // not matching passwords.
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
            rating: 0,
            points: 0
        };

        try {
            const response = await createDocument("users1", data);
            console.log("Created user successfully.", response);
            localStorage.setItem("authenticated", true);
            localStorage.setItem("user", response.username);
            localStorage.setItem("userId", response.id);
            localStorage.setItem("lastLogin", new Date().toISOString());
            window.location.href = `/index.html`;
        } catch (error) {
            console.error("Error Creating User:", error);
            if (error.status === 400) {
                // show user a issue
            }
            return;
            // do something here befoire the return statement that tells the user that it failed and they should retry later.
        }
    });
});