import { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useResumeStore } from '@/store/resumeStore';
import { Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import html2pdf from 'html2pdf.js';

export default function ResumePreview() {
  const { resume } = useResumeStore();
  const { toast } = useToast();
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;

    try {
      const opt = {
        margin: 0.5,
        filename: `${resume.personalInfo.name || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(resumeRef.current).save();
      
      toast({
        title: "PDF downloaded",
        description: "Your resume has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error downloading your resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const isEmpty = !resume.personalInfo.name && 
    resume.experiences.length === 0 && 
    resume.education.length === 0 && 
    resume.skills.length === 0;

  return (
    <Card className="h-fit">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Resume Preview</CardTitle>
        <Button 
          onClick={handleDownloadPDF}
          disabled={isEmpty}
          size="sm"
        >
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <div className="text-center py-12 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Start filling out your information to see the preview</p>
          </div>
        ) : (
          <div 
            ref={resumeRef}
            className="bg-white text-black p-8 shadow-lg min-h-[11in] font-serif"
            style={{ width: '8.5in', margin: '0 auto' }}
          >
            {/* Header */}
            <div className="text-center mb-6 border-b-2 border-gray-300 pb-4">
              <h1 className="text-3xl font-bold mb-2">{resume.personalInfo.name}</h1>
              <div className="text-sm space-y-1">
                <div className="flex justify-center space-x-4">
                  {resume.personalInfo.email && (
                    <span>{resume.personalInfo.email}</span>
                  )}
                  {resume.personalInfo.phone && (
                    <span>{resume.personalInfo.phone}</span>
                  )}
                </div>
                <div className="flex justify-center space-x-4">
                  {resume.personalInfo.location && (
                    <span>{resume.personalInfo.location}</span>
                  )}
                  {resume.personalInfo.linkedin && (
                    <span>{resume.personalInfo.linkedin}</span>
                  )}
                  {resume.personalInfo.portfolio && (
                    <span>{resume.personalInfo.portfolio}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            {resume.personalInfo.summary && (
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-2 border-b border-gray-300">
                  PROFESSIONAL SUMMARY
                </h2>
                <p className="text-sm leading-relaxed">{resume.personalInfo.summary}</p>
              </div>
            )}

            {/* Experience */}
            {resume.experiences.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-3 border-b border-gray-300">
                  PROFESSIONAL EXPERIENCE
                </h2>
                <div className="space-y-4">
                  {resume.experiences.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="font-bold">{exp.position}</h3>
                          <p className="font-semibold">{exp.company}</p>
                        </div>
                        <div className="text-right text-sm">
                          <p>{formatDate(exp.startDate)} - {exp.isCurrentRole ? 'Present' : formatDate(exp.endDate)}</p>
                          {exp.location && <p>{exp.location}</p>}
                        </div>
                      </div>
                      <ul className="text-sm space-y-1 ml-4">
                        {exp.description.map((desc, index) => (
                          <li key={index} className="list-disc">{desc}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {resume.education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-3 border-b border-gray-300">
                  EDUCATION
                </h2>
                <div className="space-y-3">
                  {resume.education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                        <p className="font-semibold">{edu.institution}</p>
                        {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                      </div>
                      <div className="text-right text-sm">
                        <p>{formatDate(edu.graduationDate)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {resume.skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-3 border-b border-gray-300">
                  SKILLS
                </h2>
                <div className="space-y-2">
                  {['technical', 'soft', 'language'].map((category) => {
                    const categorySkills = resume.skills.filter(skill => skill.category === category);
                    if (categorySkills.length === 0) return null;
                    
                    const categoryLabels = {
                      technical: 'Technical',
                      soft: 'Soft Skills',
                      language: 'Languages',
                    };

                    return (
                      <div key={category}>
                        <span className="font-semibold">{categoryLabels[category as keyof typeof categoryLabels]}: </span>
                        <span className="text-sm">
                          {categorySkills.map((skill, index) => (
                            <span key={skill.id}>
                              {skill.name}
                              {skill.proficiency && ` (${skill.proficiency})`}
                              {index < categorySkills.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}