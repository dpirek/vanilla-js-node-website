const { textToHtml } = require('../util.string');
const { page } = require('./shared');

function aboutPage(props) {
  const { navList, footerLinks, aboutCopy, isLocal } = props;

  return page({
    isLocal: isLocal,
    navList: navList,
    footerLinks: footerLinks,
    title: `Vanilla JS Website`,
    content: `<div class="starter-template">
      <h1 class="text-center mb-5">About Vanilla JS Website</h1>
      <div class="container">${textToHtml(aboutCopy)}</div>
    </div>`
  });
}

module.exports = { aboutPage };