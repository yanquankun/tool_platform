import { App } from './pages/home';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(<App />);

const a = 1;
type test = {
  a: number;
  b: number;
};
interface ITest2 {
  a: string;
}

const fn = (p1: number, p2: string): string => {
  return '123';
};

const params: Parameters<typeof fn>[0] = 123;
const returnTest: ReturnType<typeof fn> = '123';
