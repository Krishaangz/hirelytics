
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import Landing from '@/components/Landing';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Dashboard from '@/components/Dashboard';
import Navbar from '@/components/Navbar';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const { isAuthenticated } = useAuthStore();

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
        {currentPage === 'project' && (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-poppins font-bold mb-8">Project Management</h1>
            <p className="text-muted-foreground">Project features coming soon...</p>
          </div>
        )}
        {currentPage === 'settings' && (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-poppins font-bold mb-8">Settings</h1>
            <p className="text-muted-foreground">Settings panel coming soon...</p>
          </div>
        )}
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
