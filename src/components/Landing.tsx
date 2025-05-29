
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Users, BarChart3, Shield, ArrowRight, Star, Zap } from 'lucide-react';

interface LandingProps {
  onNavigate: (page: string) => void;
}

const Landing = ({ onNavigate }: LandingProps) => {
  const [email, setEmail] = useState('');

  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Dual-File Analysis",
      description: "Upload resumes + character sketches for complete candidate insights"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      title: "AI-Powered Comparisons",
      description: "Get intelligent rankings and visual reports for better decisions"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Team Collaboration",
      description: "Create organizations and invite team members to collaborate"
    }
  ];

  const pricing = [
    {
      name: "Hire∅",
      price: "Free",
      period: "",
      features: ["5 candidates per comparison", "1 comparison per week", "Basic analytics"],
      popular: false
    },
    {
      name: "Hire+",
      price: "$5",
      period: "/month",
      features: ["10 candidates per comparison", "5 comparisons per week", "Advanced analytics", "Export reports"],
      popular: true
    },
    {
      name: "Hire%",
      price: "$10",
      period: "/month",
      features: ["20 candidates per comparison", "10 comparisons per week", "Premium analytics", "Priority support"],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Head of Talent, TechCorp",
      content: "Hirelytics transformed our hiring process. We now make data-driven decisions that result in better hires.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Startup Founder",
      content: "The AI analysis helped us identify candidates we would have overlooked. Game-changer for small teams.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/5817ff25-1590-4a8c-a4e6-b962fdefaec7.png" 
              alt="Hirelytics" 
              className="w-8 h-8"
            />
            <span className="text-2xl font-poppins font-bold text-primary">
              Hirelytics
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => onNavigate('login')}>
              Sign In
            </Button>
            <Button onClick={() => onNavigate('signup')}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Zap className="w-4 h-4" />
                <span>AI-Powered Hiring Platform</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-poppins font-bold leading-tight">
                <span className="text-foreground">Resumes show the past.</span>
                <br />
                <span className="text-primary">Sketches show the person.</span>
                <br />
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Let AI show the future.
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Get instant & engaging hiring assistance from real people, so that you can spend more time scaling your business and less energy finding the right fit for your team.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12"
              />
              <Button 
                size="lg" 
                onClick={() => onNavigate('signup')}
                className="h-12 px-8 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
              >
                START HIRING
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Vetted & Experienced</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>AI-Powered Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Free to Start</span>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-up animate-delay-200">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-3xl blur-2xl"></div>
            <Card className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-poppins font-semibold text-lg">Hand Picked Candidates</h3>
                    <span className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full font-medium">
                      AI Ranked
                    </span>
                  </div>
                  
                  {[
                    { name: "Mario G.", role: "Digital Marketing Sales", score: 96, status: "top pick" },
                    { name: "Patricia S.", role: "UX Writer", score: 89, status: "qualified" },
                    { name: "Sarah O.", role: "Product Designer", score: 84, status: "qualified" }
                  ].map((candidate, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-lg smooth-transition hover:shadow-md">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {candidate.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{candidate.name}</p>
                          <p className="text-sm text-muted-foreground">{candidate.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-primary">{candidate.score}%</div>
                        <div className="text-xs text-muted-foreground capitalize">{candidate.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-white/50 to-blue-50/50 dark:from-slate-800/50 dark:to-slate-700/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-4xl font-poppins font-bold">Why Choose Hirelytics?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Let data compose your hires with our AI-powered candidate analysis platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="smooth-transition hover:shadow-lg hover:-translate-y-1 card-gradient animate-bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 space-y-4 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-poppins font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-poppins font-bold">Trusted by Teams Worldwide</h2>
            <p className="text-xl text-muted-foreground">See what our customers are saying</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-gradient smooth-transition hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50/50 to-white/50 dark:from-slate-800/50 dark:to-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-poppins font-bold">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground">Choose the plan that fits your hiring needs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricing.map((plan, index) => (
              <Card key={index} className={`relative smooth-transition hover:shadow-lg hover:-translate-y-2 card-gradient ${plan.popular ? 'ring-2 ring-primary scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="p-8 space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-poppins font-bold">{plan.name}</h3>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => onNavigate('signup')}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-4xl font-poppins font-bold text-white">
              Ready to Transform Your Hiring Process?
            </h2>
            <p className="text-xl text-white/90">
              Join thousands of companies making smarter hiring decisions with AI-powered insights.
            </p>
            <Button 
              size="lg"
              onClick={() => onNavigate('signup')}
              className="bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg font-semibold"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <img 
              src="/lovable-uploads/5817ff25-1590-4a8c-a4e6-b962fdefaec7.png" 
              alt="Hirelytics" 
              className="w-8 h-8"
            />
            <span className="text-2xl font-poppins font-bold">Hirelytics</span>
          </div>
          <div className="text-center text-white/70">
            <p>&copy; 2024 Hirelytics. Let data compose your hires.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
