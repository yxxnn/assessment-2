function logoutUser() {
    localStorage.clear();
    window.location.href = "/auth/login.html";  
}

function toggleDropdown() {
    let dropdown = document.getElementById("dropdownMenu");

    if (dropdown) {
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    }
}

window.onclick = function(event) {
    let dropdown = document.getElementById("dropdownMenu");

    if (!event.target.matches('.profile-icon') && !event.target.closest('#dropdownMenu')) {
        if (dropdown) {
            dropdown.style.display = "none";
        }
    }
};