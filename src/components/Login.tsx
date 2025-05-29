
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2, Zap, Sparkles } from 'lucide-react';

interface LoginProps {
  onNavigate: (page: string) => void;
}

const Login = ({ onNavigate }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Welcome back!",
          description: "You've been successfully logged in.",
        });
        onNavigate('dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again.",
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
    <div className="min-h-screen animated-bg flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6 animate-slide-up">
          <Button
            variant="ghost"
            onClick={() => onNavigate('landing')}
            className="mb-4 hover-scale"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <Card className="card-gradient backdrop-blur-sm border-2 animate-bounce-in">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <img 
                  src="/lovable-uploads/5817ff25-1590-4a8c-a4e6-b962fdefaec7.png" 
                  alt="Hirelytics" 
                  className="w-8 h-8"
                />
                <span className="text-2xl font-poppins font-bold text-primary">
                  Hirelytics
                </span>
              </div>
              <CardTitle className="text-2xl font-poppins glow-text">Welcome back</CardTitle>
              <CardDescription className="animate-fade-in animate-delay-200">
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2 animate-slide-in-right animate-delay-100">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="transition-all duration-300 focus:scale-105"
                  />
                </div>
                <div className="space-y-2 animate-slide-in-right animate-delay-200">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="transition-all duration-300 focus:scale-105"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full hover-scale animate-pulse-glow animate-delay-300" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>
              
              <div className="mt-6 text-center animate-fade-in animate-delay-400">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('signup')}
                    className="text-primary hover:underline font-medium story-link"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Animated Image */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8">
        <div className="relative w-full h-full max-w-lg">
          <div className="absolute inset-0 rounded-3xl overflow-hidden animate-float">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-1/4 left-1/4 animate-bounce-in animate-delay-100">
            <div className="w-16 h-16 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary animate-rotate" />
            </div>
          </div>
          
          <div className="absolute bottom-1/3 right-1/4 animate-bounce-in animate-delay-300">
            <div className="w-12 h-12 bg-accent/30 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
          </div>
          
          <div className="absolute bottom-1/4 left-1/3 text-center animate-slide-up animate-delay-500">
            <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border">
              <h3 className="font-semibold text-lg glow-text">Welcome Back!</h3>
              <p className="text-sm text-muted-foreground">Ready to make smarter hiring decisions?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
