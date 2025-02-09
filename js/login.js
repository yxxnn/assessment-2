import { getDocuments } from './db.js';

document.addEventListener("DOMContentLoaded", function () {

    if (localStorage.getItem("authenticated")) {
        console.log("User is already authenticated, redirect to home page.");
        window.location.href = `/index.html`;
    }

    document.getElementById("login-button").addEventListener("click", async (e) => {
        e.preventDefault();

        let email = document.getElementById("login-email").value;
        let password = document.getElementById("login-password").value;

        if (!email || !password) {
            return; // frontend has validation.
        }

        console.log(`Attempting to log in with ${email} and ${password}.`);

        const dbUsers = await getDocuments("users");

        for (let key in dbUsers) {
            if (dbUsers.hasOwnProperty(key)) {
                const user = dbUsers[key];
                if (user.email === email && user.password === password) {
                    localStorage.setItem("authenticated", true);
                    localStorage.setItem("userName", user.username);
                    localStorage.setItem("userId", key);

                    console.log(`Logged in as ${user.username}.`);
                    window.location.href = `/index.html`;
                    return;
                }
            }
        }
        // self-explanatory
        console.log("Login failed.");
    });
});