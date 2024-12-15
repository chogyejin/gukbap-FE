import { AppRoutes } from '@/routes/AppRoutes';
import './styles/reset.css';
import { Layout } from '@/components/Layout';

function App() {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}

export default App;
