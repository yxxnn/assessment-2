window.addEventListener('scroll', function() {
    const header = this.document.getElementById("header");
    if (this.window.scrollY > 50) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
});