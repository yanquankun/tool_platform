import dayjs from 'dayjs';

export interface ILogParam {
  projectName?: string;
  reportTime?: string;
  url: string;
  method: string;
  response: unknown | string;
  param: Record<string, unknown> | string | null;
}

const getCurrent = () => dayjs(+new Date()).format('YYYY-MM-DD HH:mm:ss');
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class reportLog {
  readonly LOGSTASH_URL = location.host.indexOf('local.') > -1 ? '/logstash' : 'https://www.yanquankun.cn/logstash';
  private logStack: ILogParam[] = [];
  private isSendingLog = false;
  projectName = '';

  constructor(projectName: string) {
    this.projectName = projectName;
  }

  pushElkLog = (logParam: ILogParam) => {
    this.logStack.push({
      ...logParam,
      projectName: this.projectName,
      reportTime: getCurrent(),
    });
  };

  runSendLog = async () => {
    if (this.logStack.length && !this.isSendingLog) {
      this.isSendingLog = true;

      // delay 1s in case of ecs server down
      await delay(1000);
      const logTask = this.logStack.shift();
      logTask &&
        fetch(this.LOGSTASH_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(logTask),
        }).finally(() => {
          this.isSendingLog = false;
          this.runSendLog();
        });
    }
  };
}
