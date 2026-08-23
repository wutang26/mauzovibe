import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

const pages = import.meta.glob('./Pages/**/*.jsx');

createInertiaApp({
    resolve: async (name) => {
        const path = `./Pages/${name}.jsx`;

        console.log('Inertia page:', name);
        console.log('Looking for:', path);

        const page = pages[path];

        if (!page) {
            throw new Error(`Page not found: ${path}`);
        }

        const module = await page();

        return module.default;
    },

    setup({ el, App, props }) {
        createRoot(el).render(
            <App {...props} />
        );
    },
});