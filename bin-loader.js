const fs = require('fs');
const loaderUtils = require('loader-utils');

module.exports = async function(content) {
  this.cacheable && this.cacheable();
  const callback = this.async();
  try {
    const base64 = await fs.promises.readFile(this.resourcePath, { encoding: 'base64' });
    callback(null, `module.exports = '${ base64 }'`);
  } catch(err) {
    callback(err);
  }
};
