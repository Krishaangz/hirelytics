
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, User, Calendar, Check } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  resumeFile: File | null;
  characterFile: File | null;
  uploadedAt: string;
}

interface CandidateCardProps {
  candidate: Candidate;
  isSelected: boolean;
  onSelect: () => void;
}

const CandidateCard = ({ candidate, isSelected, onSelect }: CandidateCardProps) => {
  const uploadDate = new Date(candidate.uploadedAt).toLocaleDateString();

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary bg-accent' : ''
      }`}
      onClick={onSelect}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{candidate.name}</CardTitle>
            <CardDescription className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>Uploaded {uploadDate}</span>
            </CardDescription>
          </div>
          {isSelected && (
            <Badge variant="default" className="ml-2">
              <Check className="w-3 h-3 mr-1" />
              Selected
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* File Status */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-sm">Resume/Portfolio</span>
            <Badge variant={candidate.resumeFile ? "default" : "destructive"} className="text-xs">
              {candidate.resumeFile ? "✓ PDF" : "Missing"}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-primary" />
            <span className="text-sm">Character Sketch</span>
            <Badge variant={candidate.characterFile ? "default" : "destructive"} className="text-xs">
              {candidate.characterFile ? "✓ TXT" : "Missing"}
            </Badge>
          </div>
        </div>

        {/* File Details */}
        {candidate.resumeFile && (
          <div className="text-xs text-muted-foreground">
            Resume: {candidate.resumeFile.name} ({(candidate.resumeFile.size / 1024 / 1024).toFixed(1)}MB)
          </div>
        )}
        
        {candidate.characterFile && (
          <div className="text-xs text-muted-foreground">
            Character: {candidate.characterFile.name} ({(candidate.characterFile.size / 1024).toFixed(1)}KB)
          </div>
        )}

        {/* Selection Status */}
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            {isSelected ? 'Selected for comparison' : 'Click to select for AI comparison'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
