
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface LoginProps {
  onNavigate: (page: string) => void;
}

const Login = ({ onNavigate }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = login(email, password);
      if (success) {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        onNavigate('dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Image */}
        <div className="hidden lg:block">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&h=600"
              alt="AI Analytics Dashboard"
              className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h2 className="text-3xl font-poppins font-bold mb-2">
                Welcome Back to Hirelytics
              </h2>
              <p className="text-lg opacity-90">
                Continue analyzing and finding the perfect candidates
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto animate-fade-in">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <img 
                src="/lovable-uploads/5817ff25-1590-4a8c-a4e6-b962fdefaec7.png" 
                alt="Hirelytics" 
                className="w-10 h-10"
              />
              <span className="text-2xl font-poppins font-bold text-primary">
                Hirelytics
              </span>
            </div>
            <h1 className="text-3xl font-poppins font-bold mb-2">Sign In</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          <Card className="card-gradient">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="pr-10 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <button
                    onClick={() => onNavigate('signup')}
                    className="text-primary hover:underline font-medium"
                    disabled={isLoading}
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate('landing')}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              disabled={isLoading}
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
