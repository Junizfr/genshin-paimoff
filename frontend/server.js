import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const contentTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
};

const htmlRoutes = {
  '/': 'pages/login.html',
  '/dashboard': 'pages/dashboard/dashboard.html',
  '/dashboard/roles': 'pages/dashboard/roles.html',
  '/dashboard/roles/new': 'pages/dashboard/roles_new.html',
  '/dashboard/roles/edit': 'pages/dashboard/roles_edit.html',
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  const cookies = Object.fromEntries(
    (req.headers.cookie || '')
      .split(';')
      .filter(Boolean)
      .map((cookie) => cookie.trim().split('=').map(decodeURIComponent))
  );

  if (req.method === 'POST' && pathname === '/') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      const params = new URLSearchParams(body);
      const bodyObj = {};
      params.forEach((value, key) => {
        bodyObj[key] = value;
      });

      fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyObj),
      })
        .then((apiRes) => {
          return apiRes.text().then(() => {
            const setCookie = apiRes.headers.get('set-cookie');
            if (setCookie) {
              res.writeHead(302, {
                'Set-Cookie': setCookie,
                Location: '/dashboard',
              });
              res.end();
            } else {
              const errorMessage = 'Login failed';
              res.writeHead(302, {
                Location: `/?error=${encodeURIComponent(errorMessage)}`,
              });
              res.end();
            }
          });
        })
        .catch((err) => {
          console.error('Erreur lors du fetch vers l’API :', err);
          res.writeHead(500);
          res.end('Erreur de communication avec l’API');
        });
    });
  } else if (htmlRoutes[pathname]) {
    if (pathname.startsWith('/dashboard') && !cookies.token) {
      res.writeHead(302, { Location: '/' });
      res.end();
      return;
    }

    const filePath = path.join(__dirname, 'public', htmlRoutes[pathname]);
    const contentType = 'text/html';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        const notFoundPath = path.join(
          __dirname,
          'public',
          'pages',
          '404.html'
        );
        fs.readFile(notFoundPath, (err404, notFoundContent) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(notFoundContent || '404 - Page not found');
        });
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  } else {
    const ext = path.extname(pathname);
    if (contentTypes[ext]) {
      const assetPath = path.join(__dirname, 'public', pathname);
      fs.readFile(assetPath, (err, content) => {
        if (err) {
          const notFoundPath = path.join(
            __dirname,
            'public',
            'pages',
            '404.html'
          );
          fs.readFile(notFoundPath, (err404, notFoundContent) => {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(notFoundContent || '404 - Page not found');
          });
        } else {
          res.writeHead(200, { 'Content-Type': contentTypes[ext] });
          res.end(content);
        }
      });
    } else {
      const notFoundPath = path.join(__dirname, 'public', 'pages', '404.html');
      fs.readFile(notFoundPath, (err404, notFoundContent) => {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(notFoundContent || '404 - Page not found');
      });
    }
  }
});

server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
