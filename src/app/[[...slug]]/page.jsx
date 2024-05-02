import '../../index.css';
// import { ClientOnly } from './client';
import App from '../../App';

export function generateStaticParams() {
  return [{ slug: [''] }];
}

export default function Page() {
  // return <ClientOnly />;
  return <App />;
}
