
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useOrgStore } from '@/stores/orgStore';
import { usePlanStore } from '@/stores/planStore';
import { Upload, Users, BarChart3, FileText, User } from 'lucide-react';
import UploadCandidate from '@/components/UploadCandidate';
import CandidateCard from '@/components/CandidateCard';
import ComparisonResults from '@/components/ComparisonResults';
import { useToast } from '@/hooks/use-toast';

const Project = () => {
  const { currentProject, getCandidates } = useOrgStore();
  const { canRunComparison, recordComparison, limits, usage } = usePlanStore();
  const { toast } = useToast();
  const [showUpload, setShowUpload] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [comparisonData, setComparisonData] = useState(null);

  const candidates = currentProject ? getCandidates(currentProject.id) : [];

  const handleCandidateSelect = (candidateId: string) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleRunComparison = async () => {
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

    // Simulate AI comparison
    const selectedCandidateData = candidates.filter(c => selectedCandidates.includes(c.id));
    
    // Mock AI analysis
    const mockResults = {
      rankings: selectedCandidateData.map((candidate, index) => ({
        ...candidate,
        score: Math.floor(Math.random() * 30) + 70, // Random score 70-100
        rank: index + 1,
        skills: {
          technical: Math.floor(Math.random() * 30) + 70,
          communication: Math.floor(Math.random() * 30) + 70,
          leadership: Math.floor(Math.random() * 30) + 70,
          creativity: Math.floor(Math.random() * 30) + 70,
        },
        personality: {
          analytical: Math.floor(Math.random() * 50) + 50,
          collaborative: Math.floor(Math.random() * 50) + 50,
          innovative: Math.floor(Math.random() * 50) + 50,
        }
      })).sort((a, b) => b.score - a.score),
      insights: [
        "Top candidate shows strong technical skills and leadership potential",
        "Consider candidates with complementary skill sets for team diversity",
        "Cultural fit assessment indicates good alignment with company values"
      ]
    };

    setComparisonData(mockResults);
    setShowResults(true);
    recordComparison();
    
    toast({
      title: "Analysis complete!",
      description: "AI comparison has been generated successfully.",
    });
  };

  if (!currentProject) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
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

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Project Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-poppins font-bold">{currentProject.name}</h1>
        <p className="text-muted-foreground">
          {candidates.length} candidate{candidates.length !== 1 ? 's' : ''} • 
          {usage.comparisonsThisWeek}/{limits.weeklyComparisons} comparisons used this week
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => setShowUpload(true)}>
          <Upload className="w-4 h-4 mr-2" />
          Upload Candidate
        </Button>
        <Button 
          variant="outline" 
          onClick={handleRunComparison}
          disabled={selectedCandidates.length < 2 || !canRunComparison()}
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Run AI Comparison ({selectedCandidates.length} selected)
        </Button>
      </div>

      {/* Usage Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Usage Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{candidates.length}</p>
              <p className="text-sm text-muted-foreground">Total Candidates</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{selectedCandidates.length}</p>
              <p className="text-sm text-muted-foreground">Selected</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{usage.comparisonsThisWeek}</p>
              <p className="text-sm text-muted-foreground">This Week</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{limits.weeklyComparisons - usage.comparisonsThisWeek}</p>
              <p className="text-sm text-muted-foreground">Remaining</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidates Grid */}
      {candidates.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No candidates yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Upload your first candidate to start building your talent pool
            </p>
            <Button onClick={() => setShowUpload(true)}>
              <Upload className="w-4 h-4 mr-2" />
              Upload First Candidate
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              isSelected={selectedCandidates.includes(candidate.id)}
              onSelect={() => handleCandidateSelect(candidate.id)}
            />
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
