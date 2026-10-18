(() => {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;

    const root = document.documentElement;
    const label = button.querySelector('.theme-label');

    function isDark() {
        return root.dataset.theme
            ? root.dataset.theme === 'dark'
            : window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function updateButton() {
        const dark = isDark();
        label.textContent = dark ? 'Light' : 'Dark';
        button.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
        button.setAttribute('aria-pressed', String(dark));
    }

    button.addEventListener('click', () => {
        const next = isDark() ? 'light' : 'dark';
        root.dataset.theme = next;
        try { localStorage.setItem('site-theme', next); } catch (_) {}
        updateButton();
    });

    const preference = window.matchMedia('(prefers-color-scheme: dark)');
    preference.addEventListener?.('change', () => {
        if (!root.dataset.theme) updateButton();
    });
    updateButton();
})();
