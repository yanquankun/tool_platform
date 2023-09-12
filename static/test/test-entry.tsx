import { createRoot } from 'react-dom/client';
import { App } from './pages/app';

const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(<App />);
