
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useAuthStore } from '@/stores/authStore';
import { useTranslation } from '@/utils/translations';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  MessageCircle, 
  Book, 
  Video, 
  HelpCircle,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

interface HelpCenterProps {
  onNavigate: (page: string) => void;
}

const HelpCenter = ({ onNavigate }: HelpCenterProps) => {
  const { settings } = useAuthStore();
  const { t } = useTranslation(settings.language);
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqs = [
    {
      question: "How does AI candidate analysis work?",
      answer: "Our AI analyzes resumes, character sketches, and job requirements using advanced natural language processing and machine learning algorithms. It evaluates technical skills, experience, cultural fit, and growth potential to provide comprehensive candidate insights."
    },
    {
      question: "What file formats are supported for uploads?",
      answer: "We currently support PDF files for resumes and TXT files for character sketches. This ensures optimal text extraction and analysis quality."
    },
    {
      question: "How secure is my candidate data?",
      answer: "We use enterprise-grade encryption (AES-256) and follow SOC 2 Type II standards. All data is encrypted in transit and at rest, with strict access controls and regular security audits."
    },
    {
      question: "Can I customize the AI analysis criteria?",
      answer: "Yes! You can adjust weights for different skills, set specific requirements, and customize the evaluation criteria based on your organization's needs and company culture."
    },
    {
      question: "How accurate are the AI recommendations?",
      answer: "Our AI has a 94% accuracy rate in candidate-role matching. The system continuously learns and improves from hiring outcomes and feedback."
    },
    {
      question: "What pricing plans are available?",
      answer: "We offer Starter ($29/month), Professional ($99/month), and Enterprise (custom pricing) plans. Each includes different features and candidate analysis limits."
    },
    {
      question: "How do I invite team members to my organization?",
      answer: "Go to your Dashboard, click 'Invite Members', and share the generated invite code. Team members can join using this code during signup or in their account settings."
    },
    {
      question: "Can I export analysis results?",
      answer: "Yes, you can export candidate comparisons, individual reports, and analytics in PDF, CSV, or JSON formats from the project dashboard."
    }
  ];

  const guides = [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of Hirelytics in 10 minutes",
      duration: "10 min read",
      category: "Beginner"
    },
    {
      title: "Advanced AI Configuration",
      description: "Customize analysis parameters for your needs",
      duration: "15 min read",
      category: "Advanced"
    },
    {
      title: "Team Collaboration",
      description: "Work effectively with your hiring team",
      duration: "8 min read",
      category: "Intermediate"
    },
    {
      title: "API Integration",
      description: "Connect Hirelytics with your existing tools",
      duration: "20 min read",
      category: "Developer"
    }
  ];

  const videos = [
    {
      title: "Platform Overview",
      description: "Complete walkthrough of Hirelytics features",
      duration: "12:34"
    },
    {
      title: "Uploading Your First Candidate",
      description: "Step-by-step candidate upload process",
      duration: "5:42"
    },
    {
      title: "Understanding AI Analysis",
      description: "How to interpret and use AI recommendations",
      duration: "8:15"
    },
    {
      title: "Setting Up Your Organization",
      description: "Best practices for team setup and permissions",
      duration: "6:28"
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="secondary" className="mb-4">
            Help Center
          </Badge>
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6">
            How can we help you?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Find answers, get support, and learn how to make the most of Hirelytics.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-6 mb-12 animate-slide-up">
          <Card className="text-center cursor-pointer smooth-transition hover:shadow-lg">
            <CardContent className="pt-6">
              <Book className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Documentation</h3>
              <p className="text-sm text-muted-foreground">Comprehensive guides and tutorials</p>
            </CardContent>
          </Card>
          <Card className="text-center cursor-pointer smooth-transition hover:shadow-lg">
            <CardContent className="pt-6">
              <Video className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Video Tutorials</h3>
              <p className="text-sm text-muted-foreground">Step-by-step video guides</p>
            </CardContent>
          </Card>
          <Card className="text-center cursor-pointer smooth-transition hover:shadow-lg">
            <CardContent className="pt-6">
              <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Get instant help from our team</p>
            </CardContent>
          </Card>
          <Card className="text-center cursor-pointer smooth-transition hover:shadow-lg">
            <CardContent className="pt-6">
              <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Contact Support</h3>
              <p className="text-sm text-muted-foreground">Send us a detailed message</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="faq" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5" />
                  <span>Frequently Asked Questions</span>
                </CardTitle>
                <CardDescription>
                  Find quick answers to common questions about Hirelytics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                {filteredFaqs.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No FAQs found matching your search.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guides Tab */}
          <TabsContent value="guides" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {guides.map((guide, index) => (
                <Card key={index} className="cursor-pointer smooth-transition hover:shadow-lg">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline">{guide.category}</Badge>
                      <span className="text-sm text-muted-foreground">{guide.duration}</span>
                    </div>
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {videos.map((video, index) => (
                <Card key={index} className="cursor-pointer smooth-transition hover:shadow-lg">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Video className="w-5 h-5 text-primary" />
                      <span className="text-sm text-muted-foreground">{video.duration}</span>
                    </div>
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                    <CardDescription>{video.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm">
                      Watch Video
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    We'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Name</label>
                        <Input
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Email</label>
                        <Input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Subject</label>
                      <Input
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Message</label>
                      <Textarea
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>Support Hours</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-medium">9 AM - 6 PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium">10 AM - 4 PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-muted-foreground">Closed</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Other Ways to Reach Us</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">Email Support</div>
                        <div className="text-sm text-muted-foreground">support@hirelytics.com</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">Phone Support</div>
                        <div className="text-sm text-muted-foreground">+1 (555) 123-4567</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">Live Chat</div>
                        <div className="text-sm text-muted-foreground">Available during support hours</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">Quick Tip</div>
                        <div className="text-sm text-muted-foreground">
                          For faster support, include your organization ID and a detailed description of the issue.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HelpCenter;
