import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PersonalInfoForm from '@/components/resume/PersonalInfoForm';
import ExperienceForm from '@/components/resume/ExperienceForm';
import EducationForm from '@/components/resume/EducationForm';
import SkillsForm from '@/components/resume/SkillsForm';
import ResumePreview from '@/components/resume/ResumePreview';

const Resume = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            Resume Builder
          </h1>
          <p className="text-muted-foreground mt-2">
            Create and customize your professional resume
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="space-y-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="mt-6">
                <PersonalInfoForm />
              </TabsContent>
              
              <TabsContent value="experience" className="mt-6">
                <ExperienceForm />
              </TabsContent>
              
              <TabsContent value="education" className="mt-6">
                <EducationForm />
              </TabsContent>
              
              <TabsContent value="skills" className="mt-6">
                <SkillsForm />
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-6">
            <ResumePreview />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resume;