import { init as initApm } from '@elastic/apm-rum';
import type { ApmBase } from '@elastic/apm-rum';

interface IApmInitOptions {
  serviceName: string;
}

class Apm {
  static #instance: ApmBase | null = null;
  protected static __init__ = false;

  constructor({ serviceName }: IApmInitOptions) {
    this.initApm(serviceName!);
  }

  protected initApm(serviceName: string) {
    if (Apm.__init__) {
      return;
    }

    Apm.#instance = initApm({
      serviceName,
      serverUrl: 'https://www.yanquankun.cn/apm',
      // 设置服务版本（源地图功能要求）
      serviceVersion: '1.0.0',
      environment: process.env.NODE_ENV,
    });

    Apm.__init__ = true;
  }

  static get isInit() {
    return this.__init__;
  }

  static reportTag(tag: string, value: string) {
    console.log('reportTag', this.#instance);
    // this.#instance && this.#instance.setTag(tag, value);
  }
}

const APM = (options: IApmInitOptions) => {
  if (!Apm.isInit) {
    if (!options?.serviceName) {
      throw new Error('if you want use apm method, you must provide serviceName in options');
    }
    new Apm({ serviceName: options.serviceName });
    return Apm;
  }
  return Apm;
};

export default APM;
