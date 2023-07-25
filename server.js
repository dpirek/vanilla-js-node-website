const http = require('http');
const fs = require('fs');
const { render, respondJson, parseBody, isStaticRequest, contentType, loadJson, loadText, isLocalRequest } = require('./util.string');
const { homePage } = require('./components/homePage');
const { searchPage } = require('./components/searchPage');
const { aboutPage } = require('./components/aboutPage');

const PORT = 8080;
const navList = loadJson(__dirname + '/data/nav.json');
const aboutCopy = loadText(__dirname + '/data/copy/about-page.txt');
const items = loadJson(__dirname + '/data/items.json');
const footerLinks = [];

const server = http.createServer((req, res) => {
  const url = req.url.toLowerCase();
  const isStatic = isStaticRequest(url);
  const isLocal = isLocalRequest(req);
  const minify = !isLocal;

  if(isStatic) {
    const fileContent = fs.readFileSync(__dirname + url);
    res.writeHead(200, {'Content-Type': contentType(url)});
    return res.end(fileContent);
  } if(url.includes('/about')) {
    return render(res, aboutPage({
      isLocal,
      navList, 
      footerLinks, 
      aboutCopy,
    }), minify);
  } if(url.includes('/search')) {
    return render(res, searchPage({
      isLocal,
      navList, 
      footerLinks, 
      url,
    }), minify);
  } else {
    return render(res, homePage({
      isLocal,
      navList, 
      footerLinks,
      items
    }), minify);
  }
});

server.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}/`);
});
