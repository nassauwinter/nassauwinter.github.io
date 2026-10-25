(() => {
    const buttons = Array.from(document.querySelectorAll('.theme-option'));
    if (!buttons.length) return;

    const root = document.documentElement;

    function isDark() {
        return root.dataset.theme
            ? root.dataset.theme === 'dark'
            : window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function updateButtons() {
        const dark = isDark();
        buttons.forEach(button => {
            button.setAttribute('aria-pressed', String(button.dataset.themeChoice === (dark ? 'dark' : 'light')));
        });
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const next = button.dataset.themeChoice;
            root.dataset.theme = next;
            try { localStorage.setItem('site-theme', next); } catch (_) {}
            updateButtons();
        });
    });

    const preference = window.matchMedia('(prefers-color-scheme: dark)');
    preference.addEventListener?.('change', () => {
        if (!root.dataset.theme) updateButtons();
    });
    updateButtons();
})();
