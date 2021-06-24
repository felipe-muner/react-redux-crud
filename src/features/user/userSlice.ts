import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface userState {
  id: number;
  name: string;
  salary: number;
  gender: "M" | "F" | "D";
}

const initialState: { users: userState[] } = {
  users: [
    { id: 1, name: "felipe muner", salary: 1000, gender: "M" },
    { id: 2, name: "luiza muner", salary: 500, gender: "F" },
  ],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<userState>) => {
      state.users.push(action.payload);
    },
    update: (state, action: PayloadAction<userState>) => {
      const user = state.users.find((u) => u.id === action.payload.id);
      console.log(user);
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    _delete: (state, action: PayloadAction<number>) => {
      state.users.filter((u) => u.id !== action.payload);
    },
  },
});

export const { add, update, _delete } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.user.users

export default userSlice.reducer;
