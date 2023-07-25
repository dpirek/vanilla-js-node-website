const { page } = require('./shared');

function card ({ items}) {
  return `${items.map(item => `
  <div class="col">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text">${item.age}</p>  
      </div>
    </div>
  </div>
`).join('')}`;
}

function homePage({ navList, footerLinks, items, isLocal }) {
  return page({
    isLocal: isLocal,
    navList: navList,
    footerLinks: footerLinks,
    title: `Vanilla JS Website`,
    content: `
    <div class="starter-template">
      <h1>Vanilla JS Website</h1>
      <div class="row">${card({ items })}</div>
    </div>`
  });
}

module.exports = { homePage };