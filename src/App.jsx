import AppRoutes from './routes/appRoutes.jsx';
import ThemeProvider from './theme/ThemeProvider.jsx';

function App() {
    return (
    <ThemeProvider>
      <AppRoutes />
        </ThemeProvider>
    );
}

export default App;