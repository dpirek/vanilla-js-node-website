const { page } = require('./shared');

function searchResultItem(item) {
  return `<div class="col-md-6">
    <div class="card mb-4 shadow-sm">
      <div class="card-body">
        <h3>${item.name}</h3>
        <p class="card-text">${item.description ? item.description : 'Short description of ' + item.name}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <a href="/school/${item.url}" class="btn btn-sm btn-outline-secondary">View College Details</a>
          </div>
          <small class="text-muted">${item.city}, ${item.state}</small> 
        </div>
      </div>
    </div>
  </div>`;
}

function searchBox(query) {
  return `<form action="/search" class="col-12 col-sm-auto mb-3 mb-sm-0" role="search">
      <input name="q" value="${query}" type="search" class="form-control" placeholder="Search..." aria-label="Search">
    </form>`;
}

function parseQuery(url) {
  if(url === '/search') return '';
  return url.replace('/search?q=', '').replace(/\+/g, ' ');
}

function searchPage({ navList, footerLinks, url }) {
  const query = parseQuery(url);
  const searchResults = [];

  return page({
    navList: navList,
    footerLinks: footerLinks,
    title: `Search`,
    content: `<h1>Search</h1>
      <hr />
      ${searchBox(query)}
      <hr />
      <p><strong>${searchResults.length} results found for: <em>${query}</em></strong></p>
      <hr />
      <div class="row">${searchResults.map(item => searchResultItem(item)).join('')}</div>
    `
  });
}

module.exports = { searchPage };