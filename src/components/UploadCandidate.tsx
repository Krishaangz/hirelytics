
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useOrgStore } from '@/stores/orgStore';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, User, X, Loader2 } from 'lucide-react';

interface UploadCandidateProps {
  projectId: string;
  onClose: () => void;
}

const UploadCandidate = ({ projectId, onClose }: UploadCandidateProps) => {
  const [name, setName] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [characterFile, setCharacterFile] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addCandidate } = useOrgStore();
  const { toast } = useToast();

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file for the resume.",
        variant: "destructive",
      });
    }
  };

  const handleCharacterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/plain') {
      setCharacterFile(file);
      // Read file content for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setNotes(content.substring(0, 500) + (content.length > 500 ? '...' : ''));
      };
      reader.readAsText(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a TXT file for the character sketch.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter the candidate's name.",
        variant: "destructive",
      });
      return;
    }

    if (!resumeFile) {
      toast({
        title: "Resume required",
        description: "Please upload a PDF resume or portfolio.",
        variant: "destructive",
      });
      return;
    }

    if (!characterFile) {
      toast({
        title: "Character sketch required",
        description: "Please upload a TXT character sketch file.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      addCandidate(projectId, {
        name: name.trim(),
        resumeFile,
        characterFile,
      });

      toast({
        title: "Candidate uploaded!",
        description: `${name} has been added to your project.`,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Upload New Candidate</span>
          </DialogTitle>
          <DialogDescription>
            Each candidate requires both a resume (PDF) and a character sketch (TXT) for AI analysis.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Candidate Name */}
          <div className="space-y-2">
            <Label htmlFor="candidateName" className="text-sm font-medium">
              Candidate Name *
            </Label>
            <Input
              id="candidateName"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className="transition-all duration-200"
            />
          </div>

          {/* File Upload Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Resume Upload */}
            <div className="space-y-3">
              <Label className="flex items-center space-x-2 text-sm font-medium">
                <FileText className="w-4 h-4" />
                <span>Resume/Portfolio (PDF) *</span>
              </Label>
              <div className="relative border-2 border-dashed border-border rounded-lg p-6 text-center transition-all duration-200 hover:border-primary/50">
                {resumeFile ? (
                  <div className="space-y-2">
                    <FileText className="w-8 h-8 mx-auto text-primary" />
                    <p className="text-sm font-medium">{resumeFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setResumeFile(null)}
                      disabled={isLoading}
                    >
                      <X className="w-3 h-3 mr-1" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Drag & drop or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF files only
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeUpload}
                  disabled={isLoading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Character Sketch Upload */}
            <div className="space-y-3">
              <Label className="flex items-center space-x-2 text-sm font-medium">
                <User className="w-4 h-4" />
                <span>Character Sketch (TXT) *</span>
              </Label>
              <div className="relative border-2 border-dashed border-border rounded-lg p-6 text-center transition-all duration-200 hover:border-primary/50">
                {characterFile ? (
                  <div className="space-y-2">
                    <User className="w-8 h-8 mx-auto text-primary" />
                    <p className="text-sm font-medium">{characterFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(characterFile.size / 1024).toFixed(2)} KB
                    </p>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCharacterFile(null)}
                      disabled={isLoading}
                    >
                      <X className="w-3 h-3 mr-1" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Interview notes & insights
                    </p>
                    <p className="text-xs text-muted-foreground">
                      TXT files only
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept=".txt"
                  onChange={handleCharacterUpload}
                  disabled={isLoading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Notes Preview */}
          {notes && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Character Sketch Preview</Label>
              <Textarea
                value={notes}
                readOnly
                className="bg-muted text-sm resize-none"
                rows={4}
              />
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !resumeFile || !characterFile || !name.trim()}
              className="min-w-[120px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload Candidate'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadCandidate;
