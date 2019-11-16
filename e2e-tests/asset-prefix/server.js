const express = require('express');
const sirv = require('sirv');

const PORT = process.env.PORT || 3000;

const assets = sirv(`${__dirname}/public`, {
  extensions: ['html', 'js', 'css', 'json', 'png', 'jpg']
});

const app = express();

app
  .use((req, res, next) => {
    if (/^\/page-[3,4]\/?$/.test(req.url)) {
      req.url = '/external' + req.url;
      req.path = '/external' + req.url;
    }

    next();
  })
  .use('/external', assets)
  .get('/', (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end(`
    <div data-page="1">page 1</div>
    <ul style="font-size: small;" id="list-of-pages">
      <li style="margin-bottom: 0px;"><a href="/page-2">Go back to page 2</a></li>
      <li style="margin-bottom: 0px;"><a href="/page-3">Go back to page 3</a></li>
      <li style="margin-bottom: 0px;"><a href="/page-4">Go back to page 4</a></li>
    </ul>
    `);
  })
  .get('/page-2', (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end(`
    <div data-page="2">page 2</div>
    <ul style="font-size: small;" id="list-of-pages">
      <li style="margin-bottom: 0px;"><a href="/">Go back to the homepage</a></li>
      <li style="margin-bottom: 0px;"><a href="/page-3">Go back to page 3</a></li>
      <li style="margin-bottom: 0px;"><a href="/page-4">Go back to page 4</a></li>
    </ul>
    `);
  })
  .listen(PORT, err => {
    if (err) throw err;
    console.log(`> Running on localhost:${PORT}`);
  });