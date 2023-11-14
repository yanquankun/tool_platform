import { App } from './pages/home';
import Container from '~shared/components/container';
import initApp from '~shared/utils/initApp';

initApp(
  <Container>
    <App />
  </Container>,
  'descriptions'
);
