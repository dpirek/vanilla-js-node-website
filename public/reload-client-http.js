const path = window.location.pathname;
const body = document.querySelector('body');
let lastBodyHtml = body.innerHTML;
const refreshInterval = 500;

setInterval(() => {
  try {
    fetch(path).then(x => x.text()).then(html => {
      const bodyHtml = /<body.*?>([\s\S]*)<\/body>/.exec(html)[1];
      if(lastBodyHtml !== bodyHtml) {
        body.innerHTML = bodyHtml;
        lastBodyHtml = bodyHtml;
        console.log('Page reloaded');      };
    });
  } catch (error) {
    console.log('There was an error', error);
  }
}, refreshInterval);