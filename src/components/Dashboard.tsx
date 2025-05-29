
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';
import { useOrgStore } from '@/stores/orgStore';
import { usePlanStore } from '@/stores/planStore';
import { Plus, Building2, FolderPlus, Users, BarChart3, Trash2, Clock } from 'lucide-react';
import CreateOrgModal from '@/components/CreateOrgModal';
import JoinOrgModal from '@/components/JoinOrgModal';
import CreateProjectModal from '@/components/CreateProjectModal';
import { useToast } from '@/hooks/use-toast';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const { user } = useAuthStore();
  const { organizations, projects, currentOrg, setCurrentOrg, setCurrentProject, deleteOrganization, deleteProject } = useOrgStore();
  const { currentPlan, limits, usage, upgradePlan } = usePlanStore();
  const { toast } = useToast();
  const [showCreateOrg, setShowCreateOrg] = useState(false);
  const [showJoinOrg, setShowJoinOrg] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  const userOrgs = organizations.filter(org => org.members.includes(user?.id || ''));
  const orgProjects = currentOrg ? projects.filter(p => p.organizationId === currentOrg.id) : [];

  const handleSelectProject = (project: any) => {
    setCurrentProject(project);
    onNavigate('project');
  };

  const handleDeleteOrg = (orgId: string, orgName: string) => {
    if (window.confirm(`Are you sure you want to delete "${orgName}"? This will also delete all associated projects.`)) {
      deleteOrganization(orgId);
      toast({
        title: "Organization deleted",
        description: `${orgName} has been deleted successfully.`,
      });
    }
  };

  const handleDeleteProject = (projectId: string, projectName: string) => {
    if (window.confirm(`Are you sure you want to delete "${projectName}"?`)) {
      deleteProject(projectId);
      toast({
        title: "Project deleted",
        description: `${projectName} has been deleted successfully.`,
      });
    }
  };

  const handleUpgradePlan = (newPlan: 'hire+' | 'hire%') => {
    upgradePlan(newPlan);
    setShowPricing(false);
    toast({
      title: "Plan upgraded",
      description: `Successfully upgraded to ${newPlan === 'hire+' ? 'Hire+' : 'Hire%'}!`,
    });
  };

  const planNames = {
    hire0: 'Hire∅ (Free)',
    'hire+': 'Hire+ ($5/month)',
    'hire%': 'Hire% ($10/month)'
  };

  const formatTimezone = () => {
    const timezone = user?.preferences.timezone || 'UTC';
    const time = new Date().toLocaleTimeString('en-US', { 
      timeZone: timezone,
      hour12: true,
      hour: '2-digit',
      minute: '2-digit'
    });
    return `${time} (${timezone})`;
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-poppins font-bold">Welcome back, {user?.name}!</h1>
        <div className="flex items-center space-x-4 text-muted-foreground">
          <p>{currentOrg ? `Managing ${currentOrg.name}` : 'Get started by creating or joining an organization'}</p>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{formatTimezone()}</span>
          </div>
        </div>
      </div>

      {/* Plan Status */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Current Plan: {planNames[currentPlan]}</span>
          </CardTitle>
          <CardDescription>
            {usage.comparisonsThisWeek}/{limits.weeklyComparisons} comparisons used this week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Candidate Limit</p>
              <p className="text-2xl font-bold">{limits.candidateLimit}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Weekly Comparisons</p>
              <p className="text-2xl font-bold">{usage.comparisonsThisWeek}/{limits.weeklyComparisons}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Today's Comparisons</p>
              <p className="text-2xl font-bold">{usage.comparisonsToday}/{limits.dailyComparisons}</p>
            </div>
          </div>
          {currentPlan === 'hire0' && (
            <div className="mt-4">
              <Button onClick={() => setShowPricing(true)}>
                Upgrade Plan
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Organizations Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-poppins font-semibold">Organizations</h2>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setShowJoinOrg(true)}>
              <Users className="w-4 h-4 mr-2" />
              Join Organization
            </Button>
            <Button onClick={() => setShowCreateOrg(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Organization
            </Button>
          </div>
        </div>

        {userOrgs.length === 0 ? (
          <Card className="card-gradient">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Building2 className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">No organizations yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Create your first organization or join an existing one to get started
              </p>
              <div className="space-x-2">
                <Button onClick={() => setShowCreateOrg(true)}>
                  Create Organization
                </Button>
                <Button variant="outline" onClick={() => setShowJoinOrg(true)}>
                  Join Organization
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userOrgs.map((org) => (
              <Card 
                key={org.id} 
                className={`cursor-pointer smooth-transition hover:shadow-md card-gradient ${
                  currentOrg?.id === org.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setCurrentOrg(org)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Building2 className="w-5 h-5" />
                      <span>{org.name}</span>
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteOrg(org.id, org.name);
                      }}
                      className="hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardDescription>
                    {org.members.length} member{org.members.length !== 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Invite Code: <code className="bg-muted px-2 py-1 rounded">{org.inviteCode}</code>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Projects Section */}
      {currentOrg && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-poppins font-semibold">Projects</h2>
            <Button onClick={() => setShowCreateProject(true)}>
              <FolderPlus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>

          {orgProjects.length === 0 ? (
            <Card className="card-gradient">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FolderPlus className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">No projects yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Create your first project to start analyzing candidates
                </p>
                <Button onClick={() => setShowCreateProject(true)}>
                  Create Project
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orgProjects.map((project) => (
                <Card 
                  key={project.id} 
                  className="cursor-pointer smooth-transition hover:shadow-md card-gradient"
                  onClick={() => handleSelectProject(project)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{project.name}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProject(project.id, project.name);
                        }}
                        className="hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <CardDescription>
                      {project.candidates?.length || 0} candidate{(project.candidates?.length || 0) !== 1 ? 's' : ''}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Created {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Pricing Modal */}
      {showPricing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Choose Your Plan</CardTitle>
              <CardDescription>Upgrade to unlock more features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Hire∅",
                    price: "Free",
                    period: "",
                    features: ["5 candidates per comparison", "1 comparison per week", "Basic analytics"],
                    plan: "hire0" as const,
                    current: currentPlan === 'hire0'
                  },
                  {
                    name: "Hire+",
                    price: "$5",
                    period: "/month",
                    features: ["10 candidates per comparison", "5 comparisons per week", "Advanced analytics", "Export reports"],
                    plan: "hire+" as const,
                    current: currentPlan === 'hire+'
                  },
                  {
                    name: "Hire%",
                    price: "$10",
                    period: "/month",
                    features: ["20 candidates per comparison", "10 comparisons per week", "Premium analytics", "Priority support"],
                    plan: "hire%" as const,
                    current: currentPlan === 'hire%'
                  }
                ].map((plan) => (
                  <Card key={plan.name} className={`${plan.current ? 'ring-2 ring-primary' : ''}`}>
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <div className="text-2xl font-bold">
                        {plan.price}<span className="text-sm font-normal">{plan.period}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="text-sm">{feature}</li>
                        ))}
                      </ul>
                      {plan.current ? (
                        <Button variant="outline" disabled className="w-full">
                          Current Plan
                        </Button>
                      ) : plan.plan !== 'hire0' ? (
                        <Button onClick={() => handleUpgradePlan(plan.plan)} className="w-full">
                          Upgrade to {plan.name}
                        </Button>
                      ) : (
                        <Button variant="outline" disabled className="w-full">
                          Current Plan
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <Button variant="outline" onClick={() => setShowPricing(false)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modals */}
      <CreateOrgModal 
        open={showCreateOrg} 
        onOpenChange={setShowCreateOrg} 
      />
      <JoinOrgModal 
        open={showJoinOrg} 
        onOpenChange={setShowJoinOrg} 
      />
      {currentOrg && (
        <CreateProjectModal 
          open={showCreateProject} 
          onOpenChange={setShowCreateProject} 
        />
      )}
    </div>
  );
};

export default Dashboard;
