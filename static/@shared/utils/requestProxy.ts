import reportLog, { ILogParam } from './reportLog';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type requestFn = (...args: any) => any;

const PROJECT_NAME = 'tool_platform';
const ReportLog = new reportLog(PROJECT_NAME);

const createRequestProxy = function <T extends requestFn>(request: T) {
  const httpHandler = {
    apply: function (
      target: typeof request,
      thisArg: ThisParameterType<typeof request>,
      argumentsList: Parameters<typeof request>[]
    ) {
      const originResponse = target.apply(thisArg, argumentsList);
      originResponse.then((res: ReturnType<typeof request>) => {
        const originReuqestInitData = (argumentsList ?? []).reduce(
          (acc, cur) => Object.assign(acc, cur),
          {}
        ) as ILogParam & { data: Record<string, unknown> };
        const logParam: ILogParam = {
          url: originReuqestInitData.url,
          method: originReuqestInitData.method.toUpperCase(),
          response: res,
          param: originReuqestInitData?.data ?? {},
        };
        ReportLog.pushElkLog(logParam);
        ReportLog.runSendLog();
      });

      return originResponse;
    },
  };

  return new Proxy(request, httpHandler);
};

export default createRequestProxy;
