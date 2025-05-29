
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/hooks/use-toast';
import { Shield, Key, Trash2, Smartphone } from 'lucide-react';

const SecuritySettings = () => {
  const { user, logout } = useAuthStore();
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    // Mock password change
    toast({
      title: "Password changed",
      description: "Your password has been updated successfully.",
    });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleEnable2FA = () => {
    if (twoFAEnabled) {
      setTwoFAEnabled(false);
      toast({
        title: "2FA Disabled",
        description: "Two-factor authentication has been disabled.",
      });
    } else {
      setTwoFAEnabled(true);
      toast({
        title: "2FA Enabled",
        description: "Two-factor authentication has been enabled.",
      });
    }
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation !== 'DELETE') {
      toast({
        title: "Error",
        description: "Please type 'DELETE' to confirm account deletion.",
        variant: "destructive",
      });
      return;
    }

    if (window.confirm('Are you absolutely sure you want to delete your account? This action cannot be undone.')) {
      logout();
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5" />
            <span>Change Password</span>
          </CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
          <Button onClick={handleChangePassword}>Update Password</Button>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5" />
            <span>Two-Factor Authentication</span>
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                2FA is {twoFAEnabled ? 'enabled' : 'disabled'}
              </p>
              <p className="text-sm text-muted-foreground">
                {twoFAEnabled 
                  ? 'Your account is protected with two-factor authentication' 
                  : 'Enable 2FA for enhanced security'
                }
              </p>
            </div>
            <Button 
              variant={twoFAEnabled ? "destructive" : "default"}
              onClick={handleEnable2FA}
            >
              {twoFAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Delete Account */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-destructive">
            <Trash2 className="w-5 h-5" />
            <span>Delete Account</span>
          </CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-destructive/10 rounded-lg">
            <p className="text-sm text-destructive font-medium">
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="delete-confirmation">
              Type "DELETE" to confirm account deletion
            </Label>
            <Input
              id="delete-confirmation"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="Type DELETE here"
            />
          </div>
          <Button 
            variant="destructive" 
            onClick={handleDeleteAccount}
            disabled={deleteConfirmation !== 'DELETE'}
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;
