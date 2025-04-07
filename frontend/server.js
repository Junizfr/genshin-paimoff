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
  let filePath = '';
  let contentType = '';

  if (req.url === '/') {
    filePath = path.join(__dirname, 'public', 'pages', 'index.html');
    contentType = 'text/html';
  } else {
    // Gestion des fichiers statiques (CSS, JS...)
    const ext = path.extname(req.url);

    if (contentTypes[ext]) {
      filePath = path.join(__dirname, 'public', req.url);
      contentType = contentTypes[ext];
    } else {
      // Supposons que ce soit une page HTML sans extension dans l'URL
      filePath = path.join(__dirname, 'public', 'pages', req.url + '.html');
      contentType = 'text/html';
    }
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Si le fichier n'existe pas, on renvoie la page 404
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
        // Erreur serveur
        res.writeHead(500);
        res.end(`Erreur serveur : ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
