export async function GET() {
  return new Response('google-site-verification: googleda93b82cea9dbf4d.html', {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}

