import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  add,
  getUsers,
  update,
  _delete,
  selectUser,
  userState,
} from "./userSlice";

export function User() {
  const { users } = useAppSelector(selectUser);
  const { usersApi } = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const handleAdd = () => {
    dispatch(add({ name: "jose", gender: "M", salary: 3000 }));
  };

  const asyncThunkExample = () => {
    dispatch(getUsers());
  };

  const handleUpdate = (user: userState) => {
    dispatch(update(user));
  };

  const handleDelete = (user: userState) => {
    dispatch(_delete(user.id));
  };

  const list = users.map((u) => (
    <li key={u.id}>
      {u.id} - {u.name} - {u.salary}
      <button onClick={() => handleUpdate(u)}> edit</button>
      <button onClick={() => handleDelete(u)}> delete</button>
    </li>
  ));
  return (
    <div>
      <h3>Users</h3>
      <div>
        <h5>add new user</h5>
        <button onClick={() => handleAdd()}>Add User</button>
      </div>
      <div>
        <ul>{list}</ul>
      </div>
      <div>
        <h5>thunk example</h5>
        <button onClick={() => asyncThunkExample()}>async get data</button>
        <h3>after click over async get data</h3>
        {JSON.stringify(usersApi)}
      </div>
    </div>
  );
}
