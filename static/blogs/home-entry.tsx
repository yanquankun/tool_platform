import App from './pages/home';
import initApp from '~shared/utils/initApp';
import crateMonitor from '~shared/utils/elk';

crateMonitor('blog');

initApp(<App />);
