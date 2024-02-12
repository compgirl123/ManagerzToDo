import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from "../App";

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('https://managerztododb.onrender.com/to');
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);


export const addTask = createAsyncThunk(
  'todos/addTask',
  async (newTask, thunkAPI) => {
    try {
      const response = await fetch(`https://managerztododb.onrender.com/add`, {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newTask }),
      });

      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  }
);

export const deleteTask = createAsyncThunk(
  'todos/deleteTask',
  async (taskIdToDelete, thunkAPI) => {
    try {
     const response = await fetch(`https://managers-todos0.onrender.com/deleteTask`, {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskIdToDelete ),
      });

      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  }
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    tasks: [],
  },
  reducers: {},
  extraReducers:(builder) =>{
    builder
    .addCase(fetchTodos.pending,(state)=>{
      console.log("HERE");
      console.log('pending');
    })
    .addCase(fetchTodos.fulfilled,(state,action)=>{
      console.log('fulfilled');
      state.tasks.push(...action.payload);
    })
    .addCase(fetchTodos.rejected,(state)=>{
      console.log('rejected');
    })
    .addCase(addTask.fulfilled, (state, action) => {
      console.log('Task added:', action.payload);
    })
    .addCase(deleteTask.fulfilled, (state, action) => {
      console.log('Task deleted:', action.payload);
      console.log(action.payload);
    })
  }
});


export default todosSlice.reducer;
