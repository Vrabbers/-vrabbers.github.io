function autoVh() {
    function vhCheck() {
        let vh = window.innerHeight;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    window.addEventListener('resize', vhCheck);
    vhCheck();
}
