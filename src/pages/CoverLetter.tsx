import Layout from '@/components/Layout';

const CoverLetter = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            Cover Letter Generator
          </h1>
          <p className="text-muted-foreground mt-2">
            Generate personalized cover letters with AI assistance
          </p>
        </div>
        
        <div className="bg-card rounded-lg border p-6">
          <p className="text-muted-foreground">Cover letter generator coming soon...</p>
        </div>
      </div>
    </Layout>
  );
};

export default CoverLetter;