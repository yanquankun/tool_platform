import App from './pages/home';
import initApp from '~shared/utils/initApp';
import Apm from '~shared/utils/apm';

new Apm({ serviceName: 'tool_platform_blog' });

initApp(<App />);
