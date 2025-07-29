import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCoverLetterStore } from '@/store/coverLetterStore';

const CompanyInfoForm = () => {
  const { coverLetterData, updateCoverLetterData } = useCoverLetterStore();

  const handleInputChange = (field: string, value: string) => {
    updateCoverLetterData({ [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company & Position Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={coverLetterData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              placeholder="Company Inc."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hiringManagerName">Hiring Manager Name</Label>
            <Input
              id="hiringManagerName"
              value={coverLetterData.hiringManagerName}
              onChange={(e) => handleInputChange('hiringManagerName', e.target.value)}
              placeholder="Mr./Ms. Manager Name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              value={coverLetterData.jobTitle}
              onChange={(e) => handleInputChange('jobTitle', e.target.value)}
              placeholder="Software Developer"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              value={coverLetterData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              placeholder="MM/DD/YYYY"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyInfoForm;