(() => {
    const header = document.querySelector('.header-inner');
    const controls = header?.querySelector('.header-controls');
    const navigation = header?.querySelector('nav');
    if (!controls || !navigation) return;

    const mobile = window.matchMedia('(max-width: 650px)');

    function arrangeControls() {
        const next = mobile.matches ? navigation : navigation.nextElementSibling;
        if (next === controls || controls.nextElementSibling === next) return;

        // Keep keyboard traversal in the same order as the responsive grid.
        const focused = document.activeElement;
        header.insertBefore(controls, next);
        if (controls.contains(focused)) focused.focus({ preventScroll: true });
    }

    arrangeControls();
    mobile.addEventListener('change', arrangeControls);
})();
