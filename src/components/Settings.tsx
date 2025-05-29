
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/hooks/use-toast';
import { User, Palette, Bell, Shield, Globe, Clock } from 'lucide-react';
import ThemeSelector from '@/components/ThemeSelector';
import SecuritySettings from '@/components/SecuritySettings';
import { useTranslation } from '@/utils/translations';

const Settings = () => {
  const { user, updateUser, updatePreferences } = useAuthStore();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [activeTab, setActiveTab] = useState('profile');

  const { t } = useTranslation(user?.preferences.language || 'en');

  const handleSaveProfile = () => {
    updateUser({ name, email });
    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const handlePreferenceChange = (key: string, value: any) => {
    updatePreferences({ [key]: value });
    toast({
      title: "Preference updated",
      description: `${key} has been updated successfully.`,
    });
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'ja', name: 'Japanese' },
  ];

  const timezones = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney',
  ];

  const tabs = [
    { id: 'profile', label: t('profile'), icon: User },
    { id: 'appearance', label: t('appearance'), icon: Palette },
    { id: 'notifications', label: t('notifications'), icon: Bell },
    { id: 'localization', label: 'Localization', icon: Globe },
    { id: 'security', label: t('security'), icon: Shield },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-poppins font-bold">{t('settings')}</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-accent smooth-transition ${
                      activeTab === tab.id ? 'bg-accent text-accent-foreground' : ''
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>{t('profile')}</span>
                </CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <Button onClick={handleSaveProfile}>{t('saveChanges')}</Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <ThemeSelector />
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="w-5 h-5" />
                    <span>{t('appearance')}</span>
                  </CardTitle>
                  <CardDescription>Customize your Hirelytics experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t('darkMode')}</Label>
                      <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                    </div>
                    <Switch 
                      checked={user?.preferences.theme === 'dark'} 
                      onCheckedChange={(checked) => handlePreferenceChange('theme', checked ? 'dark' : 'light')} 
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>{t('notifications')}</span>
                </CardTitle>
                <CardDescription>Control when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates about your projects</p>
                  </div>
                  <Switch 
                    checked={user?.preferences.notifications || false} 
                    onCheckedChange={(checked) => handlePreferenceChange('notifications', checked)} 
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'localization' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Localization</span>
                </CardTitle>
                <CardDescription>Language and regional preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('language')}</Label>
                    <select
                      value={user?.preferences.language || 'en'}
                      onChange={(e) => handlePreferenceChange('language', e.target.value)}
                      className="w-full p-2 border rounded-md bg-background"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t('timezone')}</Label>
                    <select
                      value={user?.preferences.timezone || 'UTC'}
                      onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                      className="w-full p-2 border rounded-md bg-background"
                    >
                      {timezones.map((tz) => (
                        <option key={tz} value={tz}>
                          {tz}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'security' && <SecuritySettings />}
        </div>
      </div>
    </div>
  );
};

export default Settings;
