import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import CryptoTable from './components/CryptoTable';
import Header from './components/Header';
import BinanceWebSocket from './utils/binanceWebSocket';

function AppContent() {

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const socket = new BinanceWebSocket();
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="container mx-auto px-4 py-6">
        <div className="p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-lg shadow dark:shadow-gray-800/10">
          <CryptoTable searchQuery={searchQuery} />
        </div>
      </main>

      <footer className="container mx-auto px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Data updates every 1-2 seconds to simulate real-time cryptocurrency market activity.</p>
        <p className="mt-2">© 2025 CryptoTracker. All rights reserved.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;