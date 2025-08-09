'use client';
import { useRolePermission } from '@/contexts/rolePermissionContext';
import AddProjectForm from '@/modules/project/AddProject';
import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';
import { AccessDeniedCard } from '@invoice/ui/PermissionDeniedCard';

function AddProject() {
  const { hasPermission } = useRolePermission();

  return hasPermission(
    `${ApplicationModules.project}:${ModuleOperations.create}`
  ) ? (
    <>
      <AddProjectForm />
    </>
  ) : (
    <AccessDeniedCard />
  );
}

export default AddProject;
