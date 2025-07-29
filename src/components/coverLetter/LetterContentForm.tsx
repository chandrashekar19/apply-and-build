import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCoverLetterStore } from '@/store/coverLetterStore';

const LetterContentForm = () => {
  const { coverLetterData, updateCoverLetterData } = useCoverLetterStore();

  const handleInputChange = (field: string, value: string) => {
    updateCoverLetterData({ [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Letter Content</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="introduction">Introduction Paragraph</Label>
          <Textarea
            id="introduction"
            value={coverLetterData.introduction}
            onChange={(e) => handleInputChange('introduction', e.target.value)}
            placeholder="Dear [Hiring Manager], I am writing to express my interest in the [Position] role at [Company]..."
            className="min-h-[100px]"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bodyParagraph1">First Body Paragraph</Label>
          <Textarea
            id="bodyParagraph1"
            value={coverLetterData.bodyParagraph1}
            onChange={(e) => handleInputChange('bodyParagraph1', e.target.value)}
            placeholder="Highlight your relevant experience and skills that match the job requirements..."
            className="min-h-[100px]"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bodyParagraph2">Second Body Paragraph</Label>
          <Textarea
            id="bodyParagraph2"
            value={coverLetterData.bodyParagraph2}
            onChange={(e) => handleInputChange('bodyParagraph2', e.target.value)}
            placeholder="Demonstrate your knowledge of the company and explain why you want to work there..."
            className="min-h-[100px]"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="conclusion">Conclusion Paragraph</Label>
          <Textarea
            id="conclusion"
            value={coverLetterData.conclusion}
            onChange={(e) => handleInputChange('conclusion', e.target.value)}
            placeholder="Thank you for considering my application. I look forward to hearing from you..."
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LetterContentForm;