
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2, Rocket, Users, Brain } from 'lucide-react';

interface SignupProps {
  onNavigate: (page: string) => void;
}

const Signup = ({ onNavigate }: SignupProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuthStore();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = await signup(name, email, password);
      if (success) {
        toast({
          title: "Account created!",
          description: "Welcome to Hirelytics. Let's get started.",
        });
        onNavigate('dashboard');
      } else {
        toast({
          title: "Signup failed",
          description: "Please try again with different credentials.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen animated-bg flex">
      {/* Left Side - Signup Form */}
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
              <CardTitle className="text-2xl font-poppins glow-text">Create your account</CardTitle>
              <CardDescription className="animate-fade-in animate-delay-200">
                Start making smarter hiring decisions today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2 animate-slide-in-right animate-delay-100">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isLoading}
                    className="transition-all duration-300 focus:scale-105"
                  />
                </div>
                <div className="space-y-2 animate-slide-in-right animate-delay-200">
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
                <div className="space-y-2 animate-slide-in-right animate-delay-300">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="transition-all duration-300 focus:scale-105"
                  />
                </div>
                <div className="space-y-2 animate-slide-in-right animate-delay-400">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="transition-all duration-300 focus:scale-105"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full hover-scale animate-pulse-glow animate-delay-500" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4 mr-2" />
                      Create Account
                    </>
                  )}
                </Button>
              </form>
              
              <div className="mt-6 text-center animate-fade-in animate-delay-600">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('login')}
                    className="text-primary hover:underline font-medium story-link"
                  >
                    Sign in
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
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
              alt="Innovation and teamwork"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-1/4 right-1/4 animate-bounce-in animate-delay-100">
            <div className="w-16 h-16 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-primary animate-pulse" />
            </div>
          </div>
          
          <div className="absolute bottom-1/3 left-1/4 animate-bounce-in animate-delay-300">
            <div className="w-12 h-12 bg-accent/30 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
          </div>
          
          <div className="absolute bottom-1/4 right-1/3 text-center animate-slide-up animate-delay-500">
            <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border">
              <h3 className="font-semibold text-lg glow-text">Join Thousands!</h3>
              <p className="text-sm text-muted-foreground">Start your smart hiring journey</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
