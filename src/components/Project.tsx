
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useOrgStore } from '@/stores/orgStore';
import { usePlanStore } from '@/stores/planStore';
import { Upload, Users, BarChart3, FileText, User, Trash2, Settings } from 'lucide-react';
import UploadCandidate from '@/components/UploadCandidate';
import CandidateCard from '@/components/CandidateCard';
import ComparisonResults from '@/components/ComparisonResults';
import AIComparison from '@/components/AIComparison';
import { useToast } from '@/hooks/use-toast';

const Project = () => {
  const { currentProject, getCandidates, deleteProject } = useOrgStore();
  const { canRunComparison, recordComparison, limits, usage } = usePlanStore();
  const { toast } = useToast();
  const [showUpload, setShowUpload] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showAIConfig, setShowAIConfig] = useState(false);
  const [comparisonData, setComparisonData] = useState(null);

  const candidates = currentProject ? getCandidates(currentProject.id) : [];

  const handleCandidateSelect = (candidateId: string) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleDeleteProject = () => {
    if (currentProject && window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(currentProject.id);
      toast({
        title: "Project deleted",
        description: "The project has been deleted successfully.",
      });
    }
  };

  const handleAIAnalysisComplete = (results: any) => {
    setComparisonData(results);
    setShowResults(true);
    setShowAIConfig(false);
    recordComparison();
  };

  const handleRunComparison = () => {
    if (selectedCandidates.length < 2) {
      toast({
        title: "Select at least 2 candidates",
        description: "You need to select at least 2 candidates to run a comparison.",
        variant: "destructive",
      });
      return;
    }

    if (!canRunComparison()) {
      toast({
        title: "Comparison limit reached",
        description: "You've reached your comparison limit. Please upgrade your plan.",
        variant: "destructive",
      });
      return;
    }

    setShowAIConfig(true);
  };

  if (!currentProject) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="hover-scale">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No project selected</h3>
            <p className="text-muted-foreground text-center">
              Please select a project from the dashboard to continue
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults && comparisonData) {
    return (
      <ComparisonResults 
        data={comparisonData} 
        onBack={() => setShowResults(false)} 
      />
    );
  }

  if (showAIConfig) {
    const selectedCandidateData = candidates.filter(c => selectedCandidates.includes(c.id));
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-poppins font-bold">AI Analysis Configuration</h1>
          <Button variant="outline" onClick={() => setShowAIConfig(false)}>
            Back to Project
          </Button>
        </div>
        <AIComparison 
          candidates={selectedCandidateData}
          onAnalysisComplete={handleAIAnalysisComplete}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Project Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-poppins font-bold glow-text">{currentProject.name}</h1>
          <p className="text-muted-foreground">
            {candidates.length} candidate{candidates.length !== 1 ? 's' : ''} • 
            {usage.comparisonsThisWeek}/{limits.weeklyComparisons} comparisons used this week
          </p>
        </div>
        <Button 
          variant="destructive" 
          size="sm"
          onClick={handleDeleteProject}
          className="hover-scale"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Project
        </Button>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => setShowUpload(true)} className="hover-scale animate-pulse-glow">
          <Upload className="w-4 h-4 mr-2" />
          Upload Candidate
        </Button>
        <Button 
          variant="outline" 
          onClick={handleRunComparison}
          disabled={selectedCandidates.length < 2 || !canRunComparison()}
          className="hover-scale"
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Run AI Comparison ({selectedCandidates.length} selected)
        </Button>
      </div>

      {/* Usage Stats */}
      <Card className="card-gradient hover-scale">
        <CardHeader>
          <CardTitle className="text-lg">Usage Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center animate-bounce-in animate-delay-100">
              <p className="text-2xl font-bold glow-text">{candidates.length}</p>
              <p className="text-sm text-muted-foreground">Total Candidates</p>
            </div>
            <div className="text-center animate-bounce-in animate-delay-200">
              <p className="text-2xl font-bold glow-text">{selectedCandidates.length}</p>
              <p className="text-sm text-muted-foreground">Selected</p>
            </div>
            <div className="text-center animate-bounce-in animate-delay-300">
              <p className="text-2xl font-bold glow-text">{usage.comparisonsThisWeek}</p>
              <p className="text-sm text-muted-foreground">This Week</p>
            </div>
            <div className="text-center animate-bounce-in animate-delay-400">
              <p className="text-2xl font-bold glow-text">{limits.weeklyComparisons - usage.comparisonsThisWeek}</p>
              <p className="text-sm text-muted-foreground">Remaining</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidates Grid */}
      {candidates.length === 0 ? (
        <Card className="card-gradient hover-scale">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mb-4 animate-float" />
            <h3 className="font-semibold mb-2">No candidates yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Upload your first candidate to start building your talent pool
            </p>
            <Button onClick={() => setShowUpload(true)} className="hover-scale animate-pulse-glow">
              <Upload className="w-4 h-4 mr-2" />
              Upload First Candidate
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate, index) => (
            <div key={candidate.id} className={`animate-slide-up animate-delay-${(index % 5 + 1) * 100}`}>
              <CandidateCard
                candidate={candidate}
                isSelected={selectedCandidates.includes(candidate.id)}
                onSelect={() => handleCandidateSelect(candidate.id)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <UploadCandidate 
          projectId={currentProject.id}
          onClose={() => setShowUpload(false)} 
        />
      )}
    </div>
  );
};

export default Project;
