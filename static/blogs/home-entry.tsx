import App from './pages/home';
import initApp from '~shared/utils/initApp';
import APM from '~shared/utils/apm';

APM({ serviceName: 'tool_platform_blog' });

initApp(<App />);
