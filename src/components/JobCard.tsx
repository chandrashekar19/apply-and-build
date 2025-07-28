import { JobApplication, JobStatus } from '@/store/jobStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreVertical, Edit, Trash2, MapPin, DollarSign } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface JobCardProps {
  job: JobApplication;
  onEdit: (job: JobApplication) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: JobStatus) => void;
}

const statusConfig = {
  applied: {
    label: 'Applied',
    className: 'status-applied',
  },
  interviewing: {
    label: 'Interviewing',
    className: 'status-interviewing',
  },
  offered: {
    label: 'Offered',
    className: 'status-offered',
  },
  rejected: {
    label: 'Rejected',
    className: 'status-rejected',
  },
};

export default function JobCard({ job, onEdit, onDelete, onStatusChange }: JobCardProps) {
  const statusInfo = statusConfig[job.status];

  return (
    <Card className="hover:shadow-medium transition-all duration-200 gradient-card border-0 animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-foreground">
              {job.position}
            </CardTitle>
            <p className="text-primary font-medium">{job.company}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={cn('px-2 py-1 text-xs font-medium', statusInfo.className)}>
              {statusInfo.label}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(job)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(job.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <span>Applied: {new Date(job.applicationDate).toLocaleDateString()}</span>
        </div>
        
        {(job.location || job.salary) && (
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {job.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {job.location}
              </div>
            )}
            {job.salary && (
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                {job.salary}
              </div>
            )}
          </div>
        )}
        
        {job.notes && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {job.notes}
          </p>
        )}
        
        <div className="flex gap-2 pt-2">
          {(['applied', 'interviewing', 'offered', 'rejected'] as JobStatus[]).map((status) => (
            <Button
              key={status}
              variant={job.status === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => onStatusChange(job.id, status)}
              className="text-xs"
            >
              {statusConfig[status].label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}