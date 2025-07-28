import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useResumeStore, Skill } from '@/store/resumeStore';
import { useToast } from '@/hooks/use-toast';
import { Plus, X } from 'lucide-react';

const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  category: z.enum(['technical', 'soft', 'language']),
  proficiency: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
});

type SkillFormData = Omit<Skill, 'id'>;

export default function SkillsForm() {
  const { resume, addSkill, deleteSkill } = useResumeStore();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: '',
      category: 'technical',
      proficiency: 'intermediate',
    },
  });

  const onSubmit = (data: SkillFormData) => {
    addSkill(data);
    toast({
      title: "Skill added",
      description: "Your skill has been added successfully.",
    });
    form.reset();
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteSkill(id);
    toast({
      title: "Skill removed",
      description: "The skill has been removed.",
    });
  };

  const handleAddNew = () => {
    form.reset();
    setIsDialogOpen(true);
  };

  const groupedSkills = resume.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categoryLabels = {
    technical: 'Technical Skills',
    soft: 'Soft Skills',
    language: 'Languages',
  };

  const proficiencyColors = {
    beginner: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    intermediate: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    advanced: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    expert: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Skills</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Skill</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill Name</FormLabel>
                      <FormControl>
                        <Input placeholder="React.js" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="soft">Soft Skills</SelectItem>
                          <SelectItem value="language">Language</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="proficiency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proficiency (Optional)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select proficiency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    Add Skill
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
        {resume.skills.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No skills added yet. Click "Add Skill" to get started.
          </p>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedSkills).map(([category, skills]) => (
              <div key={category}>
                <h3 className="font-semibold mb-3">{categoryLabels[category as keyof typeof categoryLabels]}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge 
                      key={skill.id} 
                      variant="secondary"
                      className={`group relative ${
                        skill.proficiency ? proficiencyColors[skill.proficiency] : ''
                      }`}
                    >
                      {skill.name}
                      {skill.proficiency && (
                        <span className="ml-1 text-xs opacity-75">
                          ({skill.proficiency})
                        </span>
                      )}
                      <button
                        onClick={() => handleDelete(skill.id)}
                        className="ml-2 hover:text-destructive transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}