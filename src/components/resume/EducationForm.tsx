import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useResumeStore, Education } from '@/store/resumeStore';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';

const educationSchema = z.object({
  institution: z.string().min(1, 'Institution name is required'),
  degree: z.string().min(1, 'Degree is required'),
  field: z.string().min(1, 'Field of study is required'),
  graduationDate: z.string().min(1, 'Graduation date is required'),
  gpa: z.string().optional(),
});

type EducationFormData = Omit<Education, 'id'>;

export default function EducationForm() {
  const { resume, addEducation, updateEducation, deleteEducation } = useResumeStore();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: '',
      degree: '',
      field: '',
      graduationDate: '',
      gpa: '',
    },
  });

  const onSubmit = (data: EducationFormData) => {
    if (editingId) {
      updateEducation(editingId, data);
      toast({
        title: "Education updated",
        description: "Your education information has been updated successfully.",
      });
    } else {
      addEducation(data);
      toast({
        title: "Education added",
        description: "Your education information has been added successfully.",
      });
    }

    form.reset();
    setEditingId(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (education: Education) => {
    setEditingId(education.id);
    form.reset(education);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteEducation(id);
    toast({
      title: "Education deleted",
      description: "The education entry has been removed.",
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
        <CardTitle>Education</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingId ? 'Edit Education' : 'Add Education'}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="institution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution</FormLabel>
                        <FormControl>
                          <Input placeholder="Harvard University" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="degree"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Input placeholder="Bachelor of Science" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="field"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Field of Study</FormLabel>
                        <FormControl>
                          <Input placeholder="Computer Science" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="graduationDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Graduation Date</FormLabel>
                        <FormControl>
                          <Input type="month" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gpa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GPA (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="3.8/4.0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingId ? 'Update Education' : 'Add Education'}
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
        {resume.education.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No education added yet. Click "Add Education" to get started.
          </p>
        ) : (
          <div className="space-y-4">
            {resume.education.map((education) => (
              <div 
                key={education.id} 
                className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{education.degree} in {education.field}</h3>
                    <p className="text-muted-foreground">{education.institution}</p>
                    <p className="text-sm text-muted-foreground">
                      Graduated: {education.graduationDate}
                      {education.gpa && ` • GPA: ${education.gpa}`}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleEdit(education)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleDelete(education.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}