const fs = require('fs');

function minify(html) {
  return html
    .replace(/\>[\r\n ]+\</g, "><")
    .replace(/(<.*?>)|\s+/g, (m, $1) => $1 ? $1 : ' ')
    .trim();
}

function createUrl(text) {
  return text.toLowerCase().replace(/[|&;$%@"<>()+,-]/g, '').replace(/ /g, '-').replace(/--/g, '-');
}

function render(res, html, shouldMinify = true) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  if(shouldMinify) html = minify(html);
  res.end(html);
}

function respondJson(res, obj, statusCode = 200) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(obj));
}

async function parseBody(req) {
  return new Promise((resolve, reject) => {
    const requestBody = [];
    req.on('data', (chunk) => {
      requestBody.push(chunk);
    }).on('end', () => {
      const body = Buffer.concat(requestBody).toString();
      resolve(JSON.parse(body));
    });
  });
}

function json(res, obj) {
  res.statusCode = 200;

  // CORS
  res.setHeader(`Access-Control-Allow-Origin`, `*`);
  res.setHeader(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.setHeader(`Access-Control-Allow-Headers`, `Content-Type`);

  // JSON
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(obj));
}

function formatStateName(text, states) {
  if(text.length === 2) {
    if(states[text.toUpperCase()]) {
      return states[text.toUpperCase()]  + ' ' + text.toUpperCase() + '';
    } else {
      return text.toUpperCase();
    }
  } else {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}

function listWithUrl(list) {
  return list.map(item => {
    item.url = createUrl(item.name);
    return item;
  });
}

function trim(text, length){
  return text.length > length ? text.substring(0, length) + '...' : text;
}

function isStaticRequest(url) {
  return url.includes('.js') || url.includes('.css') || url.includes('.png') || url.includes('.jpg') || url.includes('.jpeg') || url.includes('.gif');
}

function isLocalRequest(req) {
  return req.headers.host.includes('localhost');
}

function contentType(url) {
  const contentTypes = {
    js: 'application/javascript',
    html: 'text/html',
    css: 'text/css',
    png: 'image/png',
    jpg: 'image/jpg',
    jpeg: 'image/jpeg',
    gif: 'image/gif'
  };

  return contentTypes[url.split('.').pop()];
}

function loadJson(path) {
  try {
    const contentString = fs.readFileSync(path, 'utf8');
    return JSON.parse(contentString);
  } catch (err) {
    console.error(err);
    return null;
  } 
}

function loadText(path) {
  try {
    return fs.readFileSync(path, 'utf8');;
  } catch (err) {
    console.error(err);
    return null;
  } 
}

function parseEnv() {
  const env = {};
  const envString = fs.readFileSync('.env', 'utf8');
  const envArray = envString.split('\n');
  envArray.forEach(item => {
    const key = item.split('=')[0];
    const value = item.split('=')[1];
    env[key] = value;
  });
  return env;
}

function htmlToText (html) {
  return html
  .replace(/<[^>]+>/g, ' ') // remove html tags
  .replace(/  +/g, '') // remove extra spaces
  .replace(/Job Post Details/g, ' ') // remove header
  .replace(/Return to Search Result/g, ' ') // remove nav txt
  .replace(/\n\s*\n/g, '\n') // remove empty lines
  .replace(/^\s+|\s+$/g, ''); // trim lines
}

function textToHtml (text) {  
  return text.split('\n').map(line => {
    if(line.trim() === '') return '';
    if(line.includes('#')) return `<h3>${line.replace('#', '')}</h3>`;
    return `<p>${line}</p>`;
  }).join(''); 
}

module.exports = {
  minify,
  createUrl,
  render,
  respondJson,
  parseBody,
  json,
  formatStateName,
  listWithUrl,
  trim,
  isStaticRequest,
  isLocalRequest,
  contentType,
  loadJson,
  parseEnv,
  htmlToText,
  textToHtml,
  loadText
};