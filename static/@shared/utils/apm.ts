import { init as initApm, apm } from '@elastic/apm-rum';

interface IApmInitOptions {
  serviceName: string;
}

type CustomContext = Record<string, unknown>;

class Apm {
  protected static __init__ = false;

  constructor({ serviceName }: IApmInitOptions) {
    this.initApm(serviceName!);
  }

  protected initApm(serviceName: string) {
    if (Apm.__init__) {
      return;
    }

    initApm({
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

  // 设置单个标签
  static setTag(name: string, value: string | number | boolean) {
    if (!this.isInit) return;
    apm.addLabels({ [name]: value });
  }

  // 设置多个标签
  static addLabels(labels: Record<string, string | number | boolean>) {
    if (!this.isInit) return;
    console.log(apm);
    apm.addLabels(labels);
  }

  // 设置用户信息
  static setUser(user: { id: string; email?: string; username?: string }) {
    if (!this.isInit) return;
    apm.setUserContext(user);
  }

  // 开始一个事务
  static startTransaction(name: string, type: string = 'script') {
    if (!this.isInit) return null;
    return apm.startTransaction(name, type);
  }

  // 结束当前事务
  static endTransaction() {
    if (!this.isInit) return;
    const currentTransaction = apm.getCurrentTransaction();
    if (currentTransaction) {
      currentTransaction.end();
    }
  }

  // 添加自定义上下文
  static setCustomContext(context: CustomContext) {
    if (!this.isInit) return;
    apm.setCustomContext(context);
  }

  // 上报错误
  static captureError(error: Error | string) {
    if (!this.isInit) return;
    if (typeof error === 'string') {
      error = new Error(error);
    }
    apm.captureError(error);
  }

  // 添加性能跟踪
  static addSpan(name: string, type: string = 'custom') {
    if (!this.isInit) return null;
    const transaction = apm.getCurrentTransaction();
    if (transaction) {
      return transaction.startSpan(name, type);
    }
    return null;
  }
}

const APM = (options: IApmInitOptions) => {
  if (!Apm.isInit) {
    if (!options?.serviceName) {
      throw new Error('if you want use apm method, you must provide serviceName in options');
    }
    new Apm({ serviceName: options.serviceName });
  }
  return Apm;
};

export default APM;
