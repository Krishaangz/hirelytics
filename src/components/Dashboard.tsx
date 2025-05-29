
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';
import { useOrgStore } from '@/stores/orgStore';
import { usePlanStore } from '@/stores/planStore';
import { Plus, Building2, FolderPlus, Users, BarChart3 } from 'lucide-react';
import CreateOrgModal from '@/components/CreateOrgModal';
import JoinOrgModal from '@/components/JoinOrgModal';
import CreateProjectModal from '@/components/CreateProjectModal';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const { user } = useAuthStore();
  const { organizations, projects, currentOrg, setCurrentOrg, setCurrentProject } = useOrgStore();
  const { currentPlan, limits, usage } = usePlanStore();
  const [showCreateOrg, setShowCreateOrg] = useState(false);
  const [showJoinOrg, setShowJoinOrg] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);

  const userOrgs = organizations.filter(org => org.members.includes(user?.id || ''));
  const orgProjects = currentOrg ? projects.filter(p => p.organizationId === currentOrg.id) : [];

  const handleSelectProject = (project: any) => {
    setCurrentProject(project);
    onNavigate('project');
  };

  const planNames = {
    hire0: 'Hire∅ (Free)',
    'hire+': 'Hire+ ($5/month)',
    'hire%': 'Hire% ($10/month)'
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-poppins font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">
          {currentOrg ? `Managing ${currentOrg.name}` : 'Get started by creating or joining an organization'}
        </p>
      </div>

      {/* Plan Status */}
      <Card>
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
              <Button onClick={() => onNavigate('pricing')}>
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
          <Card>
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
                className={`cursor-pointer transition-colors hover:bg-accent ${
                  currentOrg?.id === org.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setCurrentOrg(org)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="w-5 h-5" />
                    <span>{org.name}</span>
                  </CardTitle>
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
            <Card>
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
                  className="cursor-pointer transition-colors hover:bg-accent"
                  onClick={() => handleSelectProject(project)}
                >
                  <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
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
