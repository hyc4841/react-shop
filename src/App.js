import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [users, setUsers] = useState();

  useEffect(() => {
    async function getUser() {
      const response = await axios.get("http://localhost:8080/api/user");
      const data = response.data;

      setUsers(data);
    }

    getUser();
  }, []);

  return (
    <div>
      {
        users ? users.map((user) =>
          <div key={user.id}>
            <h3>{user.name} {user.age}</h3>
            <p>{user.memo}</p>
          </div>
        ) : null
      }
    </div>
  )
}