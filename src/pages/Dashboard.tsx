import { useJobStore } from '@/store/jobStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const { jobs, getJobsByStatus, getTotalJobs } = useJobStore();

  const stats = [
    {
      title: 'Total Applications',
      value: getTotalJobs(),
      icon: Briefcase,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Applied',
      value: getJobsByStatus('applied').length,
      icon: Clock,
      color: 'text-status-applied-foreground',
      bgColor: 'bg-status-applied/10',
    },
    {
      title: 'Interviewing',
      value: getJobsByStatus('interviewing').length,
      icon: TrendingUp,
      color: 'text-status-interviewing-foreground',
      bgColor: 'bg-status-interviewing/10',
    },
    {
      title: 'Offers',
      value: getJobsByStatus('offered').length,
      icon: CheckCircle,
      color: 'text-status-offered-foreground',
      bgColor: 'bg-status-offered/10',
    },
  ];

  const recentJobs = jobs
    .sort((a, b) => new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Track your job applications and manage your career journey
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Applications */}
      <Card className="gradient-card border-0 shadow-soft">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">
            Recent Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentJobs.length === 0 ? (
            <div className="text-center py-8">
              <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No job applications yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Start tracking your applications to see them here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-foreground">{job.position}</h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium status-${job.status}`}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(job.applicationDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}