#!/usr/bin/env node
var stdin = process.openStdin();
var data = "";

stdin.on('data', function(chunk) {
  data += chunk;
});

stdin.on('end', function() {
  process.stdout.write(data.replace('</body>', '<script src="http://localhost:9091/livereload.js"></script>\n</body>'));
});