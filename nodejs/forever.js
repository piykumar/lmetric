 var forever = require('forever-monitor');

  var child = new (forever.Monitor)('lmetricNode.js', {
    max: 3,
    silent: true,
    pidFile: '/opt/nodejspiy/a.pid',
    sourceDir: '/opt/nodejspiy',
    logFile: '/opt/nodejspiy/logs/forever-out.log', // Path to log output from forever process (when daemonized)
    outFile: '/opt/nodejspiy/logs/node-out.log', // Path to log output from child stdout
    errFile: '/opt/nodejspiy/logs/node-err.log',  // Path to log output from child stderr
    options: []
  });

  child.on('exit', function () {
    console.log('lmetricNode.js has exited after 3 restarts');
  });

  child.start();