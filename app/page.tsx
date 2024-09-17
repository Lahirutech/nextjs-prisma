import styles from "./page.module.css";
import { getUsers } from "./actions/user";

interface User {
  id: string;
  email: string;
}

interface GetUsersResponse {
  message: User[];
  status: number;
}
export const runtime = "edge";

export default async function UserList() {
  const { message: users, status }: GetUsersResponse = await getUsers();

  if (status !== 200) {
    return <div className={styles.errorContainer}>Failed to fetch users</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User List</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>ID</th>
              <th className={styles.tableHeader}>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.id}>
                <td className={styles.tableCell}>{user.id}</td>
                <td className={styles.tableCell}>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
