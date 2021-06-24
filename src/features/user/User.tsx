import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { add, update, _delete, selectUser, userState } from "./userSlice";

export function User() {
  const handleUpdate = (user: userState) => {
    console.log(user);
  };

  const handleDelete = (user: userState) => {
    console.log(user);
  };

  const users = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const list = users.map((u) => (
    <li key={u.id}>
      {u.name}
      <button onClick={() => handleUpdate(u)}> edit</button>
      <button onClick={() => handleDelete(u)}> delete</button>
    </li>
  ));
  return (
    <div>
      <h3>Users</h3>
      <div>
        <h5>add new user</h5>
      </div>
      <div>
        <ul>{list}</ul>
      </div>
    </div>
  );
}
