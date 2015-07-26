#!/usr/bin/env node
var stdin = process.openStdin();
var data = "";
var comment = '<!-- \n\
Hey there! Thanks for taking a look.\n\
This code is minified to eek out some performance.\n\
To see a prettier version check it out on GitHub:\n\
  - HTML - https://github.com/grommett/pinkiering/blob/master/src/index.html\n\
  - CSS/Stylus - https://github.com/grommett/pinkiering/tree/master/src/stylus\n\
  - JS - https://github.com/grommett/pinkiering/tree/master/src/js\n\
-->'
stdin.on('data', function(chunk) {
  data += chunk;
});

stdin.on('end', function() {
  process.stdout.write(data.replace('<head>', '<head>\n'+comment+'\n'));
});