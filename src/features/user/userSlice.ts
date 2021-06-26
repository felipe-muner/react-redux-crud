import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
export interface userState {
  id: number;
  name: string;
  salary: number;
  gender: "M" | "F" | "D";
}

const initialState: { users: userState[]; usersApi: userState[] } = {
  users: [
    { id: 1, name: "felipe muner", salary: 1000, gender: "M" },
    { id: 2, name: "luiza muner", salary: 500, gender: "F" },
  ],
  usersApi: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    add: (state, action: any) => {
      state.users.push({
        id: state.users.length + 1,
        ...action.payload,
      });
    },
    initUsers: (state, action: PayloadAction<userState[]>) => {
      state.usersApi = action.payload;
    },
    update: (state, action: PayloadAction<userState>) => {
      let user = state.users.find((u) => u.id === action.payload.id);
      if (user) {
        user.name = action.payload.name + " Edited";
        user.salary = Math.random();
      }
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    _delete: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
    },
  },
});

export const { add, update, _delete, initUsers } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.user;

export const getUsers = (): AppThunk => async (dispatch, getState) => {
  // const currentValue = selectCount(getState());
  const usersApi = await (
    await fetch("https://jsonplaceholder.typicode.com/users")
  ).json();
  console.log(usersApi);
  dispatch(initUsers(usersApi));
};

export default userSlice.reducer;
