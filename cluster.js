'use strict';
require('newrelic');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const log = require('./logger');

const workers = [];
let restart = true;
let child;

function handleKillSignal(signal) {
  restart = false;
  log.warn('exiting ' + process.pid + 'from signal: ' + signal);
  for (let i = 0; i < workers.length; i++) {
    log.info('destroying worker: ' + workers[i].process.pid);
    workers[i].kill(signal);
  }
}

function handleChildOnExit() {
  return function handle() {
    log.error(child.process.pid + ' died');
    if (restart) {
      child = cluster.fork();
      workers.push(child);
    }
  };
}

function handleStopSignal() {
  return function handle() {
    restart = false;
    log.error('got sigint');
    handleKillSignal('SIGINT');
    process.exit(1);
  };
}

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    child = cluster.fork();
    child.on('exit', handleChildOnExit());
    workers.push(child);
  }
  Object.keys(cluster.workers).forEach(function iterate(id) {
    log.info('worker with pid: ' + cluster.workers[id].process.pid);
  });
  process.on('SIGINT', handleStopSignal());
  process.on('SIGTERM', handleStopSignal());
} else {
  log.info('creating child process: ' + process.pid);
  require('./index.js');
}
