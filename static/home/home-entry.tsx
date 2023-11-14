import { App } from './pages/home';
import Container from '~shared/components/container';
import initApp from '@shared/utils/init';

initApp(
  <Container>
    <App />
  </Container>,
  'descriptions'
);
