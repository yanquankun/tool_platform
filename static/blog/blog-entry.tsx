import { createRoot } from 'react-dom/client';
import { App } from './pages/blog';

const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(<App />);
