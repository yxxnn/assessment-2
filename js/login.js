import { getDocuments } from './db.js';

// on load
document.addEventListener("DOMContentLoaded", function () {
    // another event after its loaded to check button
    document.getElementById("login-button").addEventListener("click", async (e) => {
        e.preventDefault(); // prevent button click from redirecting to random place.

        let email = document.getElementById("login-email").value;
        let password = document.getElementById("login-password").value;

        if (!email || !password) {
            // do something here to let user know that they need to fill in both fields
            return;
        }

        console.log(`Attempting to log in with ${email} and ${password}.`);

        const dbUsers = await getDocuments("users1");

        // absoultely stupid way of checking and i have no idea why this is a frontend-only project?
        // remove this if u read this
        for (let i = 0; i < dbUsers.length; i++) {
            // loop thru dbUsers array and find if email == input box and so on.
            if (dbUsers[i].email === email && dbUsers[i].password === password) {
                // here i just save the user information to the browser's storage
                // so that the user doesnt have to login every fucking time they wanna do smt lol
                localStorage.setItem("authenticated", true);
                localStorage.setItem("user", JSON.stringify(dbUsers[i]));
                localStorage.setItem("userId", dbUsers[i].id);
                localStorage.setItem("lastLogin", new Date().toISOString());


                // here we just log in and redirect to index.html
                console.log(`Logged in as ${dbUsers[i].name}.`)
                window.location.href = "index.html";
                break;
            }
        }
        // self-explanatory
        console.log("Login failed.");
    });
});