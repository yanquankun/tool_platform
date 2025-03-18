import dayjs from 'dayjs';
import { getClientIP } from '@shared/apis/client';

export interface ILogParam {
  projectName?: string;
  reportTime?: string;
  url: string;
  method: string;
  responseStr: unknown | string;
  paramStr: Record<string, unknown> | string | null;
  client_ip?: string;
}

const getCurrent = () => dayjs(+new Date()).format('YYYY-MM-DD HH:mm:ss');
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getClientIPAsync = async () => await getClientIP();

export default class reportLog {
  readonly LOGSTASH_URL = location.host.indexOf('local.') > -1 ? '/logstash' : 'https://www.yanquankun.cn/logstash';
  private logStack: ILogParam[] = [];
  private isSendingLog = false;
  private clientIp = '';
  projectName = '';

  constructor(projectName: string) {
    this.projectName = projectName;
  }

  pushElkLog = async (logParam: ILogParam) => {
    if (this.clientIp === '') {
      this.clientIp = await getClientIPAsync();
    }

    this.logStack.push({
      ...logParam,
      responseStr: JSON.stringify(logParam.responseStr),
      paramStr: JSON.stringify(logParam.paramStr),
      projectName: this.projectName,
      reportTime: getCurrent(),
      client_ip: this.clientIp,
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
