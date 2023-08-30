const ANSI_COLOR_AFFIX = '%s\x1b[0m';

const ANSI_COLOR_RED = '\x1b[31m';
const ANSI_COLOR_GREEN = '\x1b[32m';
const ANSI_COLOR_YELLOW = '\x1b[33m';
const ANSI_COLOR_BLUE = '\x1b[34m';
const ANSI_COLOR_MAGENTA = '\x1b[35m';
const ANSI_COLOR_CYAN = '\x1b[36m';
const ANSI_COLOR_RESET = '\x1b[0m';

const log = function (type, ...message) {
  switch (type) {
    case 'log':
      console.log(ANSI_COLOR_MAGENTA + ANSI_COLOR_AFFIX, '--------- log output start ---------');
      console.log(...message);
      console.log(ANSI_COLOR_MAGENTA + ANSI_COLOR_AFFIX, '--------- log output end ---------');
      break;
    case 'error':
      console.log(ANSI_COLOR_RED + ANSI_COLOR_AFFIX, '--------- error output start ---------');
      console.log(...message);
      console.log(ANSI_COLOR_RED + ANSI_COLOR_AFFIX, '--------- error output end ---------');
      break;
    case 'warn':
      console.log(ANSI_COLOR_YELLOW + ANSI_COLOR_AFFIX, '--------- warn output start ---------');
      console.log(...message);
      console.log(ANSI_COLOR_YELLOW + ANSI_COLOR_AFFIX, '--------- warn output end ---------');
      break;
    case 'info':
      console.log(ANSI_COLOR_GREEN + ANSI_COLOR_AFFIX, '--------- info output start ---------');
      console.log(...message);
      console.log(ANSI_COLOR_GREEN + ANSI_COLOR_AFFIX, '--------- info output end ---------');
      break;
    default:
      console.log(message);
      break;
  }
};

module.exports = exports = { log };
