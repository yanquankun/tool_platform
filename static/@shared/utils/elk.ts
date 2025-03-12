interface IRequestMonitor {
  url: string;
  method: string;
  params: Record<string, unknown>;
  response?: unknown;
  startTime: number;
  endTime?: number;
  duration?: number;
}

interface ILogParam {
  projectName: string;
  timestamp: number;
  url: string;
  method: string;
  response: unknown;
  param: Record<string, unknown> | null;
}

const OriginalFetch = window.fetch;
const getCurrent = () => +new Date();
const LOGSTASH_URL = location.host.indexOf('local.') > -1 ? '/logstash' : 'https://www.yanquankun.cn/logstash';
const logStack: ILogParam[] = [];
let isSendingLog = false;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const pushElkLog = (logParam: ILogParam) => {
  logStack.push(logParam);
};

const runSendLog = async () => {
  if (logStack.length && !isSendingLog) {
    isSendingLog = true;

    // delay 1s in case of ecs server down
    await delay(1000);
    const logTask = logStack.shift();

    OriginalFetch(LOGSTASH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logTask),
    }).finally(() => {
      isSendingLog = false;
      runSendLog();
    });
  }
};

// 重写fetch函数
const monitorFetch = (projectName: string): ((input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) => {
  return async (input: RequestInfo | URL, init?: RequestInit) => {
    const monitor: IRequestMonitor = {
      url: typeof input === 'string' ? input : input.toString(),
      method: init?.method || 'GET',
      params: init?.body ? JSON.parse(init.body.toString()) : {},
      startTime: Date.now(),
    };

    const response = await OriginalFetch(input, init);
    try {
      monitor.endTime = Date.now();
      monitor.duration = monitor.endTime - monitor.startTime;
      monitor.response = await response.clone().json();

      pushElkLog({
        projectName,
        method: monitor.method.toLocaleLowerCase(),
        timestamp: getCurrent(),
        url: monitor.url,
        response: monitor.response,
        param: monitor.params,
      });
      runSendLog();

      return response;
    } catch (error) {
      monitor.endTime = Date.now();
      monitor.duration = monitor.endTime - monitor.startTime;
      monitor.response = error;
      console.log('Fetch Monitor Error:', monitor);
      return response;
    }
  };
};

const crateMonitor = (projectName: string) => {
  if (!projectName) return;

  window.fetch = monitorFetch(projectName);
};

export default crateMonitor;
