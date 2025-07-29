import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PersonalInfoForm from '@/components/coverLetter/PersonalInfoForm';
import CompanyInfoForm from '@/components/coverLetter/CompanyInfoForm';
import LetterContentForm from '@/components/coverLetter/LetterContentForm';
import CoverLetterPreview from '@/components/coverLetter/CoverLetterPreview';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useCoverLetterStore } from '@/store/coverLetterStore';
import { useToast } from '@/hooks/use-toast';

const CoverLetter = () => {
  const { resetCoverLetterData } = useCoverLetterStore();
  const { toast } = useToast();

  const handleReset = () => {
    resetCoverLetterData();
    toast({
      title: 'Cover Letter Reset',
      description: 'All fields have been cleared.',
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
              Cover Letter Generator
            </h1>
            <p className="text-muted-foreground mt-2">
              Create professional cover letters with live preview and PDF export
            </p>
          </div>
          <Button variant="outline" onClick={handleReset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="space-y-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="company">Company</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="mt-6">
                <PersonalInfoForm />
              </TabsContent>
              
              <TabsContent value="company" className="mt-6">
                <CompanyInfoForm />
              </TabsContent>
              
              <TabsContent value="content" className="mt-6">
                <LetterContentForm />
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-6">
            <CoverLetterPreview />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoverLetter;