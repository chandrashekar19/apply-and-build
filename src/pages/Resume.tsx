import Layout from '@/components/Layout';

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
        
        <div className="bg-card rounded-lg border p-6">
          <p className="text-muted-foreground">Resume builder coming soon...</p>
        </div>
      </div>
    </Layout>
  );
};

export default Resume;