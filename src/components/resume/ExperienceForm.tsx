import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useResumeStore, Experience } from '@/store/resumeStore';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';

const experienceSchema = z.object({
  company: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  isCurrentRole: z.boolean().default(false),
  description: z.string().min(1, 'Job description is required'),
  location: z.string().optional(),
});

type ExperienceFormData = Omit<Experience, 'id' | 'description'> & {
  description: string;
};

export default function ExperienceForm() {
  const { resume, addExperience, updateExperience, deleteExperience } = useResumeStore();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      isCurrentRole: false,
      description: '',
      location: '',
    },
  });

  const onSubmit = (data: ExperienceFormData) => {
    const experienceData = {
      ...data,
      description: data.description.split('\n').filter(line => line.trim() !== ''),
    };

    if (editingId) {
      updateExperience(editingId, experienceData);
      toast({
        title: "Experience updated",
        description: "Your work experience has been updated successfully.",
      });
    } else {
      addExperience(experienceData);
      toast({
        title: "Experience added",
        description: "Your work experience has been added successfully.",
      });
    }

    form.reset();
    setEditingId(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (experience: Experience) => {
    setEditingId(experience.id);
    form.reset({
      ...experience,
      description: experience.description.join('\n'),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteExperience(id);
    toast({
      title: "Experience deleted",
      description: "The work experience has been removed.",
    });
  };

  const handleAddNew = () => {
    setEditingId(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Work Experience</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingId ? 'Edit Experience' : 'Add Work Experience'}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Google" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input placeholder="Software Engineer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="month" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input 
                            type="month" 
                            disabled={form.watch('isCurrentRole')}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="San Francisco, CA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="isCurrentRole"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>I currently work here</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="• Developed responsive web applications using React and TypeScript&#10;• Collaborated with cross-functional teams to deliver high-quality features&#10;• Improved application performance by 30% through code optimization"
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingId ? 'Update Experience' : 'Add Experience'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {resume.experiences.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No work experience added yet. Click "Add Experience" to get started.
          </p>
        ) : (
          <div className="space-y-4">
            {resume.experiences.map((experience) => (
              <div 
                key={experience.id} 
                className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{experience.position}</h3>
                    <p className="text-muted-foreground">{experience.company}</p>
                    <p className="text-sm text-muted-foreground">
                      {experience.startDate} - {experience.isCurrentRole ? 'Present' : experience.endDate}
                      {experience.location && ` • ${experience.location}`}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleEdit(experience)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleDelete(experience.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <ul className="text-sm space-y-1">
                  {experience.description.map((desc, index) => (
                    <li key={index}>• {desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}