import { AppRoutes } from '@/app/routes/AppRoutes';
import { Layout } from '@/shared/ui/Layout';
import './styles/reset.css';

function App() {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}

export default App;
