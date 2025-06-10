-- tenant table insert
INSERT INTO tenants (
  id, name, email, status,
  subscription_start, subscription_end,
  plan, created_at, updated_at
) VALUES (
  'abc123',                             -- id (8-character string)
  'Acme Corp',                          -- name
  'admin@acmecorp.com',                -- email
  1,                                   -- status: 1 = Active
  '2025-01-01 00:00:00',               -- subscription_start
  '2026-01-01 00:00:00',               -- subscription_end
  'pro',                               -- plan
  CURRENT_TIMESTAMP,                   -- created_at
  CURRENT_TIMESTAMP                    -- updated_at
);

select * from tenants;

-- roles table
INSERT INTO roles (id, tenant_id, name, created_at) VALUES
  (1, 'abc123', 'Admin', '2025-06-10T10:00:00Z');

select * from roles;

-- permission table
INSERT INTO permissions (name, created_at) VALUES
  ('create_user', '2025-06-10T09:59:00Z'),
  ('delete_user', '2025-06-10T10:00:00Z'),
  ('update_user', '2025-06-10T10:01:00Z');

select * from permissions;

-- role_permission table
INSERT INTO role_permissions (role_id, permission_id, created_at) VALUES
  (1, 1, '2025-06-10T10:04:00Z'),  -- Admin can create user
  (1, 2, '2025-06-10T10:04:10Z'),  -- Admin can delete user
  (1, 3, '2025-06-10T10:04:20Z');  -- Admin can update profile

-- get the role with the permissions
select * from role_permissions join role_id;

-- get the roles and permissions
select r.name as role_name, 
	   p.name as permission_name,
	   r.tenant_id
from role_permissions rp
join roles r on rp.role_id = r.id
join permissions p on rp.permission_id = p.id
order by r.name, p.name;