export async function GET() {
  const content = `
    self.addEventListener('install', () => {
      self.skipWaiting();
    });
    self.addEventListener('activate', (event) => {
      event.waitUntil(
        self.registration.unregister().then(() => {
          return self.clients.matchAll({ type: 'window' });
        }).then((clients) => {
          clients.forEach((client) => {
            if (client.url && 'navigate' in client) {
              client.navigate(client.url);
            }
          });
        })
      );
    });
  `;

  return new Response(content, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
    },
  });
}
