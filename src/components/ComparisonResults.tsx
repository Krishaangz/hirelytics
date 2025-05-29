
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Trophy, TrendingUp } from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface ComparisonResultsProps {
  data: any;
  onBack: () => void;
}

const ComparisonResults = ({ data, onBack }: ComparisonResultsProps) => {
  const { rankings, insights } = data;

  // Prepare chart data
  const skillsData = rankings[0]?.skills ? Object.entries(rankings[0].skills).map(([skill, value]) => ({
    skill: skill.charAt(0).toUpperCase() + skill.slice(1),
    [rankings[0]?.name || 'Candidate 1']: value,
    [rankings[1]?.name || 'Candidate 2']: rankings[1]?.skills?.[skill] || 0,
    [rankings[2]?.name || 'Candidate 3']: rankings[2]?.skills?.[skill] || 0,
  })) : [];

  const scoreData = rankings.map((candidate: any) => ({
    name: candidate.name.split(' ')[0], // First name only for chart
    score: candidate.score,
  }));

  const personalityData = rankings[0]?.personality ? Object.entries(rankings[0].personality).map(([trait, value]) => ({
    trait: trait.charAt(0).toUpperCase() + trait.slice(1),
    value: value as number,
  })) : [];

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const handleExportPDF = () => {
    // Mock PDF export functionality
    alert('PDF export functionality would be implemented here');
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Candidates
          </Button>
          <div>
            <h1 className="text-3xl font-poppins font-bold">AI Comparison Results</h1>
            <p className="text-muted-foreground">
              Analysis of {rankings.length} candidates completed
            </p>
          </div>
        </div>
        <Button onClick={handleExportPDF}>
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>

      {/* Winner Card */}
      <Card className="border-primary bg-gradient-to-r from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-primary" />
            <span>Top Recommended Candidate</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">{rankings[0]?.name}</h3>
              <p className="text-muted-foreground">Overall AI Score: {rankings[0]?.score}/100</p>
            </div>
            <Badge variant="default" className="text-lg px-4 py-2">
              #1 MATCH
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Rankings */}
      <Card>
        <CardHeader>
          <CardTitle>Candidate Rankings</CardTitle>
          <CardDescription>Ranked by overall AI compatibility score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rankings.map((candidate: any, index: number) => (
              <div key={candidate.id} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold">{candidate.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Strong technical skills • Good cultural fit
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{candidate.score}</p>
                  <p className="text-sm text-muted-foreground">AI Score</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Skills Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Skills Comparison</CardTitle>
            <CardDescription>Technical and soft skills analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={skillsData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name={rankings[0]?.name}
                  dataKey={rankings[0]?.name}
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.1}
                />
                <Radar
                  name={rankings[1]?.name}
                  dataKey={rankings[1]?.name}
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.1}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Score Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Scores</CardTitle>
            <CardDescription>AI-calculated compatibility scores</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scoreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Personality Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Personality Traits</CardTitle>
            <CardDescription>Character analysis from interview notes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={personalityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ trait, value }) => `${trait}: ${value}%`}
                >
                  {personalityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>AI Insights</span>
            </CardTitle>
            <CardDescription>Key recommendations from the analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {insights.map((insight: string, index: number) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-sm">{insight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComparisonResults;
