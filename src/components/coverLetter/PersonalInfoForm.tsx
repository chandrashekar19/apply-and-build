import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCoverLetterStore } from '@/store/coverLetterStore';

const PersonalInfoForm = () => {
  const { coverLetterData, updateCoverLetterData } = useCoverLetterStore();

  const handleInputChange = (field: string, value: string) => {
    updateCoverLetterData({ [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={coverLetterData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Your full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={coverLetterData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your.email@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={coverLetterData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={coverLetterData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="City, State, ZIP"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;