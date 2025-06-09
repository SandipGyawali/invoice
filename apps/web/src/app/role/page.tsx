/**
 * Role based example
 */
// const user = { role: "user", id: "2" };
// const authorId = "1";

// function Page() {
//   return (
//     <div className="w-[200px] h-[200px] bg-blue-500">
//       Hello
//       <br />
//       {(user.role === "admin" ||
//         user.role === "moderator" ||
//         user.id === authorId) && <button className="bg-red-500">Delete</button>}
//     </div>
//   );
// }

/**
 * Role based access control
 */

const ROLES = {
  admin: [
    "view:comments",
    "create:comments",
    "update:comments",
    "delete:comments",
  ],
  moderator: ["view:comments", "create:comments"],
  user: ["view:comments", "delete:ownComments", "update:ownComments"],
} as const;

type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

function hashPermission(
  user: { id: string; role: Role },
  permission: Permission
) {
  return (ROLES[user.role] as readonly Permission[]).includes(permission);
}

export default function Page() {
  return (
    <div className="w-[200px] h-[200px] bg-blue-500">
      Hello
      <br />
      {hashPermission({ id: "1", role: "user" }, "delete:comments") && (
        <button className="bg-red-500">Delete</button>
      )}
    </div>
  );
}
