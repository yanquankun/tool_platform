import { init as initApm } from '@elastic/apm-rum';
import type { ApmBase } from '@elastic/apm-rum';

interface IApmInitOptions {
  serviceName: string;
}

export default class Apm {
  apm: ApmBase | null = null;

  constructor({ serviceName }: IApmInitOptions) {
    this.initApm(serviceName);
  }

  initApm(serviceName: string) {
    this.apm = initApm({
      serviceName,
      serverUrl: 'https://www.yanquankun.cn/apm',
      // 设置服务版本（源地图功能要求）
      serviceVersion: '1.0.0',
      environment: process.env.NODE_ENV,
    });
  }
}
