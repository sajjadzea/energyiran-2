const isProd = process.env.NODE_ENV === 'production';

function log(...args) {
  if (!isProd) console.log(...args);
}

function error(...args) {
  console.error(...args);
}

module.exports = { log, error };
