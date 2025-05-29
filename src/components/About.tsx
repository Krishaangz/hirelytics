
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/authStore';
import { useTranslation } from '@/utils/translations';
import { 
  Users, 
  Target, 
  Brain, 
  Zap, 
  Shield, 
  Award,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface AboutProps {
  onNavigate: (page: string) => void;
}

const About = ({ onNavigate }: AboutProps) => {
  const { settings } = useAuthStore();
  const { t } = useTranslation(settings.language);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze candidate profiles, skills, and compatibility with unprecedented accuracy."
    },
    {
      icon: Target,
      title: "Precision Matching",
      description: "Our intelligent matching system considers technical skills, cultural fit, and growth potential for optimal hiring decisions."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process hundreds of candidates in minutes, not weeks. Get instant insights and recommendations."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption and privacy controls ensure your candidate data remains secure and compliant."
    }
  ];

  const stats = [
    { label: "Active Organizations", value: "10,000+" },
    { label: "Candidates Analyzed", value: "2.5M+" },
    { label: "Time Saved", value: "85%" },
    { label: "Accuracy Rate", value: "94%" }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former VP of Engineering at Google. 15+ years in AI and machine learning."
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder",
      bio: "Ex-Principal Engineer at Microsoft. Expert in scalable systems and data architecture."
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of AI Research",
      bio: "PhD in Computer Science from MIT. Published 50+ papers on natural language processing."
    },
    {
      name: "David Kim",
      role: "VP of Product",
      bio: "Former Product Lead at LinkedIn. 12+ years in HR technology and user experience."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="secondary" className="mb-4">
            About Hirelytics
          </Badge>
          <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Revolutionizing Hiring
            <br />
            with AI Intelligence
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We're on a mission to transform how organizations discover, evaluate, and hire top talent 
            through the power of artificial intelligence and data-driven insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => onNavigate('dashboard')}>
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => onNavigate('help')}>
              Learn More
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-slide-up">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <div className="mb-16 animate-fade-in">
          <Card className="card-gradient">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-poppins font-bold mb-4">Our Mission</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    To eliminate bias and inefficiency in hiring by providing organizations with 
                    AI-powered tools that identify the best candidates based on merit, potential, 
                    and cultural alignment.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>Reduce hiring time by 85%</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>Improve candidate quality by 60%</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>Eliminate unconscious bias</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&h=600" 
                    alt="Team collaboration" 
                    className="rounded-lg shadow-xl w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold mb-4">Why Choose Hirelytics?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our cutting-edge technology and user-centric design make hiring smarter, faster, and more effective.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="smooth-transition hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Led by industry veterans from top tech companies, our team combines deep technical expertise 
              with a passion for solving complex hiring challenges.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="card-gradient">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-poppins font-bold mb-4">Ready to Transform Your Hiring?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of organizations already using Hirelytics to find their perfect candidates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => onNavigate('dashboard')}>
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => onNavigate('help')}>
                  Contact Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
