
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import Landing from '@/components/Landing';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Dashboard from '@/components/Dashboard';
import Project from '@/components/Project';
import Settings from '@/components/Settings';
import Navbar from '@/components/Navbar';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const { isAuthenticated, applyTheme } = useAuthStore();

  // Apply theme on app load
  useEffect(() => {
    applyTheme();
  }, [applyTheme]);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated && currentPage === 'landing') {
      setCurrentPage('dashboard');
    }
  }, [isAuthenticated, currentPage]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  // Show authenticated pages with navbar
  if (isAuthenticated && ['dashboard', 'project', 'settings'].includes(currentPage)) {
    return (
      <>
        <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
        {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
        {currentPage === 'project' && <Project />}
        {currentPage === 'settings' && <Settings />}
      </>
    );
  }

  // Show public pages without navbar
  switch (currentPage) {
    case 'login':
      return <Login onNavigate={handleNavigate} />;
    case 'signup':
      return <Signup onNavigate={handleNavigate} />;
    default:
      return <Landing onNavigate={handleNavigate} />;
  }
};

export default Index;
