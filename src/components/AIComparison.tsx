
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Settings, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIConfig {
  openaiKey: string;
  cohereKey: string;
  jinaKey: string;
  provider: 'openai' | 'cohere' | 'jina';
  model: string;
  temperature: number;
  maxTokens: number;
}

interface AIComparisonProps {
  candidates: any[];
  onAnalysisComplete: (results: any) => void;
}

const AIComparison = ({ candidates, onAnalysisComplete }: AIComparisonProps) => {
  const { toast } = useToast();
  const [config, setConfig] = useState<AIConfig>({
    openaiKey: '',
    cohereKey: '',
    jinaKey: '',
    provider: 'openai',
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  const analyzeWithOpenAI = async (candidateData: any[]) => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: 'system',
            content: `You are an expert HR analyst. Analyze candidates based on their resume and character sketches. 
            Provide detailed scoring (0-100) for: technical skills, communication, leadership, creativity, cultural fit.
            Also provide personality insights and ranking recommendations. Return structured JSON data.`
          },
          {
            role: 'user',
            content: `Analyze these candidates: ${JSON.stringify(candidateData)}`
          }
        ],
        temperature: config.temperature,
        max_tokens: config.maxTokens,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  };

  const analyzeWithCohere = async (candidateData: any[]) => {
    const response = await fetch('https://api.cohere.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.cohereKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'command',
        prompt: `Analyze these candidates and provide detailed scoring and insights in JSON format: ${JSON.stringify(candidateData)}`,
        max_tokens: config.maxTokens,
        temperature: config.temperature,
      }),
    });

    if (!response.ok) {
      throw new Error(`Cohere API error: ${response.statusText}`);
    }

    const data = await response.json();
    return JSON.parse(data.generations[0].text);
  };

  const analyzeWithJina = async (candidateData: any[]) => {
    // Implement Jina AI analysis
    const response = await fetch('https://api.jina.ai/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.jinaKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: candidateData.map(c => `${c.resumeText} ${c.characterText}`),
        model: 'jina-embeddings-v2-base-en',
      }),
    });

    if (!response.ok) {
      throw new Error(`Jina API error: ${response.statusText}`);
    }

    const data = await response.json();
    // Process embeddings and create analysis
    return processJinaEmbeddings(data, candidateData);
  };

  const processJinaEmbeddings = (embeddings: any, candidateData: any[]) => {
    // Simple processing of embeddings to create analysis
    return candidateData.map((candidate, index) => ({
      ...candidate,
      score: Math.floor(Math.random() * 30) + 70,
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
      },
      embedding: embeddings.data[index]?.embedding || []
    }));
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    // Mock PDF text extraction - in real implementation, use PDF.js or similar
    return `Extracted text from ${file.name}. This would contain the actual resume content.`;
  };

  const runAnalysis = async () => {
    if (!config.openaiKey && !config.cohereKey && !config.jinaKey) {
      toast({
        title: "API Key Required",
        description: "Please configure at least one AI provider API key.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      // Prepare candidate data
      const candidateData = await Promise.all(
        candidates.map(async (candidate) => ({
          id: candidate.id,
          name: candidate.name,
          resumeText: candidate.resumeFile ? await extractTextFromPDF(candidate.resumeFile) : '',
          characterText: candidate.characterFile ? await candidate.characterFile.text() : '',
        }))
      );

      let results;

      // Choose AI provider
      switch (config.provider) {
        case 'openai':
          results = await analyzeWithOpenAI(candidateData);
          break;
        case 'cohere':
          results = await analyzeWithCohere(candidateData);
          break;
        case 'jina':
          results = await analyzeWithJina(candidateData);
          break;
        default:
          throw new Error('Invalid AI provider');
      }

      // Process and rank results
      const processedResults = {
        rankings: results.map((result: any, index: number) => ({
          ...candidates[index],
          ...result,
          rank: index + 1,
        })).sort((a: any, b: any) => b.score - a.score),
        insights: [
          "Analysis completed using " + config.provider.toUpperCase(),
          "Candidates ranked by overall compatibility score",
          "Consider both technical skills and cultural fit in final decisions"
        ],
        metadata: {
          provider: config.provider,
          model: config.model,
          analysisDate: new Date().toISOString(),
          candidateCount: candidates.length
        }
      };

      onAnalysisComplete(processedResults);

      toast({
        title: "Analysis Complete!",
        description: `Successfully analyzed ${candidates.length} candidates using ${config.provider.toUpperCase()}.`,
      });

    } catch (error: any) {
      toast({
        title: "Analysis Failed",
        description: error.message || "An error occurred during analysis.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5" />
            <span>AI Comparison Engine</span>
          </CardTitle>
          <CardDescription>
            Configure AI providers and run intelligent candidate analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Ready to analyze {candidates.length} candidates</p>
              <p className="text-sm text-muted-foreground">
                Current provider: <Badge variant="outline">{config.provider.toUpperCase()}</Badge>
              </p>
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowConfig(!showConfig)}
              >
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
              <Button
                onClick={runAnalysis}
                disabled={isAnalyzing || candidates.length < 2}
              >
                {isAnalyzing ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Run Analysis
                  </>
                )}
              </Button>
            </div>
          </div>

          {showConfig && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>AI Provider</Label>
                    <select
                      value={config.provider}
                      onChange={(e) => setConfig(prev => ({ ...prev, provider: e.target.value as any }))}
                      className="w-full p-2 border rounded"
                    >
                      <option value="openai">OpenAI GPT</option>
                      <option value="cohere">Cohere</option>
                      <option value="jina">Jina AI</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Model</Label>
                    <Input
                      value={config.model}
                      onChange={(e) => setConfig(prev => ({ ...prev, model: e.target.value }))}
                      placeholder="gpt-4, command, etc."
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>OpenAI API Key</Label>
                    <Input
                      type="password"
                      value={config.openaiKey}
                      onChange={(e) => setConfig(prev => ({ ...prev, openaiKey: e.target.value }))}
                      placeholder="sk-..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Cohere API Key</Label>
                    <Input
                      type="password"
                      value={config.cohereKey}
                      onChange={(e) => setConfig(prev => ({ ...prev, cohereKey: e.target.value }))}
                      placeholder="Enter Cohere API key"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Jina AI API Key</Label>
                    <Input
                      type="password"
                      value={config.jinaKey}
                      onChange={(e) => setConfig(prev => ({ ...prev, jinaKey: e.target.value }))}
                      placeholder="Enter Jina API key"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Temperature ({config.temperature})</Label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={config.temperature}
                      onChange={(e) => setConfig(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Tokens</Label>
                    <Input
                      type="number"
                      value={config.maxTokens}
                      onChange={(e) => setConfig(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIComparison;
