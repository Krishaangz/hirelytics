
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { useOrgStore } from '@/stores/orgStore';
import { LogOut, Settings, Building2, FolderOpen } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar = ({ onNavigate, currentPage }: NavbarProps) => {
  const { user, logout } = useAuthStore();
  const { currentOrg, currentProject } = useOrgStore();

  const handleLogout = () => {
    logout();
    onNavigate('landing');
  };

  return (
    <nav className="bg-white dark:bg-hirelytics-dark border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <img 
              src="/lovable-uploads/5817ff25-1590-4a8c-a4e6-b962fdefaec7.png" 
              alt="Hirelytics" 
              className="w-8 h-8"
            />
            <span className="text-xl font-poppins font-bold text-primary">
              Hirelytics
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {currentOrg && (
              <>
                <Button
                  variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
                  onClick={() => onNavigate('dashboard')}
                  className="font-medium"
                >
                  Dashboard
                </Button>
                {currentProject && (
                  <Button
                    variant={currentPage === 'project' ? 'default' : 'ghost'}
                    onClick={() => onNavigate('project')}
                    className="font-medium"
                  >
                    <FolderOpen className="w-4 h-4 mr-2" />
                    {currentProject.name}
                  </Button>
                )}
                <Button
                  variant={currentPage === 'about' ? 'default' : 'ghost'}
                  onClick={() => onNavigate('about')}
                  className="font-medium"
                >
                  About
                </Button>
                <Button
                  variant={currentPage === 'help' ? 'default' : 'ghost'}
                  onClick={() => onNavigate('help')}
                  className="font-medium"
                >
                  Help
                </Button>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {currentOrg && (
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <Building2 className="w-4 h-4" />
                <span>{currentOrg.name}</span>
              </div>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem onClick={() => onNavigate('settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
