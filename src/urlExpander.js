const request = require('request');
const {
  goBack, input, errorMsg, info, list, exit,
} = require('./helper');

const urlExpander = async (website, showHome = false) => {
  website = website || (await input('Your Short Url'));
  website = !website.includes('://') ? `http://${website}` : website;
  const afterRedirect = request(
    {
      url: website,
      timeout: 5000,
      followAllRedirects: true,
    },
    async (error, response) => {
      if (!error) {
        if (website.includes(afterRedirect.uri.hostname)) {
          info(`${website} is already a long url.`);
        } else {
          list('+', 'Expanded Url', afterRedirect.uri.href);
        }
      } else {
        errorMsg();
      }
      if (showHome) {
        goBack();
      } else {
        exit();
      }
    },
  );
};

module.exports = urlExpander;
