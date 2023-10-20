import { createRoot } from 'react-dom/client';
import { App } from './pages/blog';
import Container from '~shared/components/container';

const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(
  <Container>
    <App />
  </Container>
);
