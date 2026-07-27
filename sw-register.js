// Registers the service worker at /service-worker.js and logs lifecycle events.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service worker registered:', reg);

      // Listen for updates
      if (reg.waiting) {
        console.log('SW waiting to activate');
      }

      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        console.log('Service worker update found:', newWorker);

        newWorker.addEventListener('statechange', () => {
          console.log('New SW state:', newWorker.state);
          if (newWorker.state === 'installed') {
            // New content available
            if (navigator.serviceWorker.controller) {
              console.log('New content is available; please refresh.');
            } else {
              console.log('Content cached for offline use.');
            }
          }
        });
      });
    } catch (err) {
      console.error('Service worker registration failed:', err);
    }
  });
}
