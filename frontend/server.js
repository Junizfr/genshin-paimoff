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

const server = http.createServer((req, res) => {
  const cookies = Object.fromEntries(
    (req.headers.cookie || '')
      .split(';')
      .filter(Boolean)
      .map((cookie) => cookie.trim().split('=').map(decodeURIComponent))
  );

  if (req.method === 'POST' && req.url === '/') {
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
              res.writeHead(401, { 'Content-Type': 'text/html' });
              res.end('<h1>Échec de connexion</h1>');
            }
          });
        })
        .catch((err) => {
          console.error('Erreur lors du fetch vers l’API :', err);
          res.writeHead(500);
          res.end('Erreur de communication avec l’API');
        });
    });
  } else if (req.url === '/dashboard') {
    if (cookies.token) {
      const filePath = path.join(
        __dirname,
        'public',
        'pages',
        'dashboard',
        'dashboard.html'
      );
      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end('Erreur serveur');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content);
        }
      });
    } else {
      res.writeHead(302, { Location: '/' });
      res.end();
    }
  } else {
    let filePath = '';
    let contentType = '';
    if (req.url === '/') {
      filePath = path.join(__dirname, 'public', 'pages', 'login.html');
      contentType = 'text/html';
    } else {
      const ext = path.extname(req.url);
      if (contentTypes[ext]) {
        filePath = path.join(__dirname, 'public', req.url);
        contentType = contentTypes[ext];
      }
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
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
          res.writeHead(500);
          res.end(`Erreur serveur : ${err.code}`);
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  }
});

server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
