'use client';
import { useTRPC } from '@/utils/trpc';
import { Badge } from '@invoice/ui/badge';
import { Button } from '@invoice/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@invoice/ui/card';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart3,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  PlayCircle,
  Plus,
  MoreHorizontal,
  CircleOffIcon,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  projectId: number;
  description: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  endDate: string;
  tStatus: 'not_started' | 'in_progress' | 'completed';
}

// {
//   "id": 1,
//   "projectId": 1,
//   "title": "Design Database Schema",
//   "description": "Create the tables and relationships for invoices, clients, and payments.",
//   "endDate": "2025-07-17T04:56:25.779Z",
//   "priority": "low",
//   "tStatus": "completed",
//   "createdAt": "2025-07-15T04:56:25.779Z",
//   "updatedAt": "2025-07-15T04:56:25.779Z"
// }

const initialTasks = [
  {
    id: '1',
    title: 'Design System Setup',
    description: 'Create a comprehensive design system for the project',
    priority: 'high',
    assignee: 'John Doe',
    dueDate: '2024-01-15',
    status: 'not-started',
  },
  {
    id: '2',
    title: 'User Authentication',
    description: 'Implement login and registration functionality',
    priority: 'high',
    assignee: 'Jane Smith',
    dueDate: '2024-01-20',
    status: 'not-started',
  },
  {
    id: '3',
    title: 'Dashboard Layout',
    description: 'Create responsive dashboard layout',
    priority: 'medium',
    assignee: 'Mike Johnson',
    dueDate: '2024-01-18',
    status: 'not-started',
  },
  {
    id: '4',
    title: 'API Integration',
    description: 'Connect frontend with backend APIs',
    priority: 'high',
    assignee: 'Sarah Wilson',
    dueDate: '2024-01-25',
    status: 'in-progress',
  },
  {
    id: '5',
    title: 'Database Schema',
    description: 'Design and implement database structure',
    priority: 'medium',
    assignee: 'Tom Brown',
    dueDate: '2024-01-22',
    status: 'in-progress',
  },
  {
    id: '6',
    title: 'Testing Framework',
    description: 'Set up unit and integration testing',
    priority: 'medium',
    assignee: 'Lisa Davis',
    dueDate: '2024-01-30',
    status: 'in-progress',
  },
  {
    id: '7',
    title: 'Project Setup',
    description: 'Initialize project structure and dependencies',
    priority: 'high',
    assignee: 'John Doe',
    dueDate: '2024-01-10',
    status: 'done',
  },
  {
    id: '8',
    title: 'Requirements Analysis',
    description: 'Gather and document project requirements',
    priority: 'medium',
    assignee: 'Jane Smith',
    dueDate: '2024-01-12',
    status: 'done',
  },
];

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

export default function Page() {
  const trpc = useTRPC();
  const params = useParams();
  const [tasks, setTasks] = useState(initialTasks);

  const { data: projectList } = useQuery(
    trpc.project.listProjects.queryOptions({
      id: Number(params.id),
      tenantId: 'e1065a8c',
    })
  );
  const { data: taskList } = useQuery(
    trpc.tasks.getByProjectId.queryOptions({
      projectId: Number(params.id ?? ''),
    })
  );

  console.log(projectList);
  console.log(taskList);

  const getTasksByStatus = (status: Task['tStatus']) => {
    return taskList?.filter((task) => task.tStatus === status);
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
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            {task.description}
          </p>

          <div className="flex items-center justify-between mb-3">
            <Badge
              variant="outline"
              className={`text-xs ${priorityColors[task.priority]}`}
            >
              {task.priority}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {task.endDate}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-xs text-muted-foreground">
                {/* {task.t} */}
              </span>
            </div>
            <StatusIcon className={`h-4 w-4 ${statusColors[task.tStatus]}`} />
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Project Kanban</h1>
              <p className="text-sm mt-1">Track your project progress</p>
            </div>
            <Button>
              <Plus />
              Add Task
            </Button>
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
              {notStartedTasks?.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
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
              {inProgressTasks?.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
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
              {taskList?.map((task, index) => (
                <TaskCard key={`${task.title}-${index}`} task={task} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
