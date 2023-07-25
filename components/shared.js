function logo() {
  const backgroundColor = '#eee';  //'#f7df1e';
  const heigh = '35px';
  return `<svg width="${heigh}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 630 630">
  <rect width="630" height="630" fill="${backgroundColor}"/>
    <path d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z"/>
  </svg>`;
}

function footer(footerLinks) {
  const year = new Date().getFullYear();
  const companyName = 'Remote JavaScript Jobs';

  return `<footer class="d-flex flex-wrap justify-content-between align-items-center p-3 my-4 border-top container-fluid">
      <div class="col-md-6 d-flex align-items-center">
        <a href="/" class="mb-3 me-3 mb-md-0 text-body-secondary text-decoration-none">
          ${logo()}
        </a>
        <span class="mb-3 mb-md-0 text-body-secondary">© ${year} ${companyName}</span>
      </div>
      <ul class="nav col-md-6 justify-content-end list-unstyled d-flex">
        ${footerLinks.map((item, i) => `<li><a class="nav-link px-2 link-dark" href="${item.url}">${item.name}</a></li>`).join('')}
      </ul>
    </footer>`;
}

function googleAnalytics(tag) {
  if(!tag) return '';

  return `<!-- Google Analytics -->
    <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', '${tag}', 'auto');
    ga('send', 'pageview');
    </script>
    <!-- End Google Analytics -->`;
}

function search() {
  return `<form action="/search" class="col-12 col-sm-auto mb-3 mb-sm-0" role="search">
    <input name="q" type="search" class="form-control" placeholder="Search..." aria-label="Search">
  </form>`;
}

function nav(navList) {
  return `
    <header class="p-0 mb-0 p-sm-3 mb-sm-3 border-bottom">
      <div class="container-fluid px-1">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-start">
          
          <a href="/" class="d-none d-sm-flex align-items-center mb-2 mb-sm-0 text-dark text-decoration-none me-3">
            ${logo()}
          </a>

          <ul class="nav col-auto me-auto justify-content-center mb-md-0">
            ${navList.map((item, i) => `
              <li>
                <a class="nav-link px-2 link-dark" href="${item.url}">
                  ${item.text}
                </a>
              </li>
            `).join('')}
          </ul>
          ${search()}
        </div>
      </div>
    </header>`;
}

function liveReload(on) {
  const socketUrl = 'ws://localhost:9999';

  if(!on) return '';

  return `<script type="text/javascript">
    (function(){
      const updateContentSelector = 'body';
      const socket = new WebSocket('${socketUrl}');
      const body = document.querySelector(updateContentSelector);
      let deboucing = false;
      
      socket.onopen = function(e) {
        console.log('[open] LIVE RELOAD Connection established');
        socket.send("UI client is connected!");
      };

      socket.onopen = function(e) {
        console.log('[open] LIVE RELOAD Connection established');
        socket.send("UI client is connected!");
      };

      socket.onclose = function(e) {
        console.log('[closed] LIVE RELOAD closed!');
        setTimeout(function() {
          window.location.reload();
        }, 1000);
      };
    
      socket.onmessage = function(e) {
        const obj = JSON.parse(e.data);
        if(body && deboucing === false) {
          deboucing = true;
          body.innerHTML = obj.data;
        }

        setTimeout(() => {
          deboucing = false;
        }, 500);
      };
      
      console.clear();
    }())
  </script>`;
}

function liveReloadHTTP(on) {
  if(!on) return '';

  return `<script type="module" src="/public/reload-client-http.js"></script>`;
}

function page(props) {
  const css = `<link 
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">`;


  // .page-wrapper { max-width: 768px; }
  const styles = `<style>
      .starter-template { margin: 40px 0 40px 0; }
      .starter-template h1 { margin-bottom: 20px; }
    </style>`;

  const js = `
    <!--
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    -->`;

  return `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>${props.title}</title>
        ${css}
        ${styles}
      </head>
      <body>
        ${nav(props.navList)}
        <main role="main" class="container page-wrapper">
          <div class="row">
            <div class="col-md-12">
              ${props.content}
            </div>
          </div>
        </main>
        ${footer(props.footerLinks)}
        ${googleAnalytics(false)}
        ${liveReloadHTTP(props.isLocal)}
      </body>
    </html>`;
}

module.exports = { 
  page,
  googleAnalytics,
  footer,
  liveReload,
  liveReloadHTTP
};