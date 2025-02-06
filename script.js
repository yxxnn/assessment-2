window.addEventListener('scroll', function() {
    const header = this.document.getElementById("header");
    if (this.window.scrollY > 50) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
});

function toggleDropdown() {
    let dropdown = document.getElementById("dropdownMenu");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Close dropdown if clicked outside
window.onclick = function(event) {
    if (!event.target.matches('.profile-icon')) {
        document.getElementById("dropdownMenu").style.display = "none";
    }
};

function logoutUser() {
    window.location.href = "Login.html"; 
}
