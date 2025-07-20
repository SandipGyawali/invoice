'use client';
import Loader from '@/components/Loader';
import { formatDate } from '@/utils/formatDate';
import { useTRPC } from '@/utils/trpc';
import { Badge } from '@invoice/ui/badge';
import { Button } from '@invoice/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@invoice/ui/card';
import { cn } from '@invoice/ui/lib/utils';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart3,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  PlayCircle,
  Plus,
  CircleOffIcon,
  FileX,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AddTask } from '@/modules/project/AddTask';
import { UpdateTask } from '@/modules/project/UpdateTask';

interface Task {
  id: number;
  projectId: number;
  title: string;
  description: string | null;
  endDate: Date | null;
  priority: 'high' | 'medium' | 'low' | null;
  tStatus: 'in_progress' | 'completed' | 'not_started' | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface ProjectInterface {
  id: number;
  tenantId: string | null;
  name: string;
  clientId: number | null;
  description: string | null;
  startDate: Date;
  endDate: Date | null;
  pStatus: 'in_progress' | 'completed' | 'not_started' | null;
  status: '0' | null;
  statusFTR: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-red-100 text-red-800 border-red-200',
};

const statusIcons = {
  not_started: Circle,
  in_progress: PlayCircle,
  completed: CheckCircle2,
};

const statusColors = {
  not_started: 'text-gray-500',
  in_progress: 'text-blue-500',
  completed: 'text-green-500',
};

export function EmptyKanbanColumn() {
  return (
    <Card className="mb-3 hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4 flex flex-col items-center gap-5">
        <FileX className="w-8 h-8" />
        <p className="text-sm font-medium">No tasks found </p>
      </CardContent>
    </Card>
  );
}

export default function Page() {
  const trpc = useTRPC();
  const params = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [project, setProject] = useState<ProjectInterface | null>(null);
  const [openAddTask, setOpenAddTask] = useState<boolean>(false);

  const {
    data: projectList,
    isSuccess: projectFetchSuccess,
    isLoading: projectIsLoading,
  } = useQuery(
    trpc.project.listProjects.queryOptions({
      id: Number(params.id),
      tenantId: 'e1065a8c',
    })
  );
  const {
    data: taskList,
    isSuccess,
    isLoading: taskIsLoading,
    refetch: refetchTasks,
  } = useQuery(
    trpc.tasks.getByProjectId.queryOptions({
      projectId: Number(params.id ?? ''),
    })
  );

  useEffect(() => {
    if (isSuccess) {
      setTasks(taskList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, setTasks]);

  useEffect(() => {
    setProject(projectList?.[0] as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectFetchSuccess, setProject]);

  if (projectIsLoading && taskIsLoading)
    return <Loader className="w-full h-full" />;

  const getTasksByStatus = (status: Task['tStatus']): Array<Task> => {
    return taskList?.filter((task) => task.tStatus === status) ?? [];
  };

  const notStartedTasks = getTasksByStatus('not_started');
  const inProgressTasks = getTasksByStatus('in_progress');
  const doneTasks = getTasksByStatus('completed');

  const TaskCard = ({ task }: { task: Task }) => {
    const StatusIcon = statusIcons[task.tStatus];

    return (
      <Card className="mb-3 hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-medium text-sm">{task.title}</h3>
            <UpdateTask refetch={() => refetchTasks()} taskData={task} />
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            {task.description}
          </p>

          <div className="flex items-center justify-between mb-3">
            <Badge
              variant="outline"
              className={cn(
                `text-xs`,
                task?.priority && priorityColors[task.priority]
              )}
            >
              {task.priority}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {task?.endDate && formatDate(task?.endDate?.toString())}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center" />
            <StatusIcon className={cn(`h-4 w-4`, statusColors[task.tStatus])} />
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="w-full flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">
                {project?.name}
              </h1>
              <p className="text-sm mt-1">{project?.description}</p>
            </div>
            <AddTask
              onOpenState={() => setOpenAddTask((prev) => !prev)}
              state={openAddTask}
              projectData={project}
              refetch={refetchTasks}
            />
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Tasks
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tasks.length}</div>
                <p className="text-xs text-muted-foreground">
                  Active project tasks
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Not Started
                </CardTitle>
                <CircleOffIcon className="h-4 w-4 mr-2" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-600">
                  {notStartedTasks?.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {(
                    (notStartedTasks?.length ?? 0 / tasks.length) * 100
                  ).toFixed(0)}
                  % of total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  In Progress
                </CardTitle>
                <Clock className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {inProgressTasks?.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {(
                    (inProgressTasks?.length ?? 0 / tasks.length) * 100
                  ).toFixed(0)}
                  % of total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {doneTasks?.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {((doneTasks?.length ?? 0 / tasks.length) * 100).toFixed(0)}%
                  of total
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Not Started Column */}
          <div className="rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <CircleOffIcon className="h-4.5 w-4.5 mr-2" />
                <h2 className="font-semibold">Not Started</h2>
                <Badge variant="default" className="ml-2">
                  {notStartedTasks?.length}
                </Badge>
              </div>
              <Button variant="ghost" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {notStartedTasks && notStartedTasks.length == 0 ? (
                <EmptyKanbanColumn />
              ) : (
                notStartedTasks?.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))
              )}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <PlayCircle className="h-5 w-5 text-blue-500 mr-2" />
                <h2 className="font-semibold">In Progress</h2>
                <Badge variant="default" className="ml-2">
                  {inProgressTasks?.length}
                </Badge>
              </div>
              <Button variant="ghost" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {inProgressTasks && inProgressTasks.length == 0 ? (
                <EmptyKanbanColumn />
              ) : (
                inProgressTasks?.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))
              )}
            </div>
          </div>

          {/* Done Column */}
          <div className="rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500f mr-2" />
                <h2 className="font-semibold">Done</h2>
                <Badge variant="default" className="ml-2">
                  {doneTasks?.length}
                </Badge>
              </div>
              <Button variant="ghost" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {doneTasks && doneTasks.length == 0 ? (
                <EmptyKanbanColumn />
              ) : (
                doneTasks?.map((task, index) => (
                  <TaskCard key={`${task.title}-${index}`} task={task} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
