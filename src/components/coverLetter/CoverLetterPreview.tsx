import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useCoverLetterStore } from '@/store/coverLetterStore';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

const CoverLetterPreview = () => {
  const { coverLetterData } = useCoverLetterStore();
  const { toast } = useToast();

  const downloadPDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = margin;
    
    // Helper function to add text with word wrapping
    const addText = (text: string, fontSize: number = 11, bold: boolean = false) => {
      pdf.setFontSize(fontSize);
      if (bold) pdf.setFont('helvetica', 'bold');
      else pdf.setFont('helvetica', 'normal');
      
      const lines = pdf.splitTextToSize(text, pageWidth - 2 * margin);
      pdf.text(lines, margin, yPosition);
      yPosition += lines.length * (fontSize * 0.4) + 5;
    };

    // Header with personal info
    addText(coverLetterData.fullName, 16, true);
    addText(`${coverLetterData.email} | ${coverLetterData.phone}`);
    addText(coverLetterData.address);
    yPosition += 10;

    // Date
    addText(coverLetterData.date);
    yPosition += 10;

    // Company info
    if (coverLetterData.hiringManagerName) {
      addText(coverLetterData.hiringManagerName);
    }
    addText(coverLetterData.companyName);
    yPosition += 10;

    // Subject line
    addText(`Re: Application for ${coverLetterData.jobTitle} Position`, 11, true);
    yPosition += 10;

    // Letter content
    if (coverLetterData.introduction) {
      addText(coverLetterData.introduction);
      yPosition += 5;
    }
    
    if (coverLetterData.bodyParagraph1) {
      addText(coverLetterData.bodyParagraph1);
      yPosition += 5;
    }
    
    if (coverLetterData.bodyParagraph2) {
      addText(coverLetterData.bodyParagraph2);
      yPosition += 5;
    }
    
    if (coverLetterData.conclusion) {
      addText(coverLetterData.conclusion);
      yPosition += 10;
    }

    // Closing
    addText('Sincerely,');
    yPosition += 15;
    addText(coverLetterData.fullName, 11, true);

    pdf.save(`${coverLetterData.fullName}_Cover_Letter.pdf`);
    
    toast({
      title: 'PDF Downloaded',
      description: 'Your cover letter has been downloaded successfully.',
    });
  };

  return (
    <Card className="h-fit">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Preview</CardTitle>
        <Button onClick={downloadPDF} size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </CardHeader>
      <CardContent>
        <div className="bg-white p-8 shadow-lg text-black min-h-[800px] text-sm leading-relaxed">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold">{coverLetterData.fullName || 'Your Name'}</h1>
            <p>{coverLetterData.email} | {coverLetterData.phone}</p>
            <p>{coverLetterData.address}</p>
          </div>

          {/* Date */}
          <div className="mb-6">
            <p>{coverLetterData.date}</p>
          </div>

          {/* Company Information */}
          <div className="mb-6">
            {coverLetterData.hiringManagerName && (
              <p>{coverLetterData.hiringManagerName}</p>
            )}
            <p>{coverLetterData.companyName || 'Company Name'}</p>
          </div>

          {/* Subject */}
          <div className="mb-6">
            <p className="font-semibold">
              Re: Application for {coverLetterData.jobTitle || 'Position Title'} Position
            </p>
          </div>

          {/* Letter Content */}
          <div className="space-y-4">
            {coverLetterData.introduction && (
              <p>{coverLetterData.introduction}</p>
            )}
            
            {coverLetterData.bodyParagraph1 && (
              <p>{coverLetterData.bodyParagraph1}</p>
            )}
            
            {coverLetterData.bodyParagraph2 && (
              <p>{coverLetterData.bodyParagraph2}</p>
            )}
            
            {coverLetterData.conclusion && (
              <p>{coverLetterData.conclusion}</p>
            )}
          </div>

          {/* Closing */}
          <div className="mt-8">
            <p>Sincerely,</p>
            <div className="mt-8">
              <p className="font-semibold">{coverLetterData.fullName || 'Your Name'}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoverLetterPreview;