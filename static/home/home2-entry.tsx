import { createRoot } from 'react-dom/client';
import { App } from './pages/home2';

const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(<App />);
