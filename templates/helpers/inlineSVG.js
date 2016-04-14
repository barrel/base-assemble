var path = require('path');
var fs = require('fs');

module.exports = function(svgPath) {
  if(svgPath.indexOf('.svg') === -1) {
    svgPath += '.svg';
  }

  var svgLocation = path.join('./src/svg/', svgPath);
  var svgContent = fs.readFileSync(svgLocation);

  return svgContent;
}