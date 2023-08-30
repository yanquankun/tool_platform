const ANSI_COLOR_AFFIX = '%s\x1b[0m';

const ANSI_COLOR_RED = '\x1b[31m';
const ANSI_COLOR_GREEN = '\x1b[32m';
const ANSI_COLOR_YELLOW = '\x1b[33m';
const ANSI_COLOR_BLUE = '\x1b[34m';
const ANSI_COLOR_MAGENTA = '\x1b[35m';
const ANSI_COLOR_CYAN = '\x1b[36m';
const ANSI_COLOR_RESET = '\x1b[0m';

const log = function (type, ...message) {
  let colorStr = '';
  switch (type) {
    case 'log':
      console.log(ANSI_COLOR_RESET, '--------- log output start ---------');
      console.log(...message);
      console.log(ANSI_COLOR_RESET, '--------- log output end ---------');
      break;
    case 'error':
      console.log(ANSI_COLOR_RED, '--------- error output start ---------');
      console.log(...message);
      console.log(ANSI_COLOR_RED, '--------- error output end ---------');
      break;
    case 'warn':
      console.log(ANSI_COLOR_YELLOW, '--------- warn output start ---------');
      console.log(...message);
      console.log(ANSI_COLOR_YELLOW, '--------- warn output end ---------');
      break;
    case 'info':
      console.log(ANSI_COLOR_GREEN, '--------- info output start ---------');
      console.log(...message);
      console.log(ANSI_COLOR_GREEN, '--------- info output end ---------');
      break;
    default:
      console.log(message);
      break;
  }
};

module.exports = exports = { log };
