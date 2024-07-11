import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dataUrl } from "../data/utils.js";

const initialState = {
  tasksData: [],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncTask.fulfilled, (state, { payload }) => {
        state.tasksData = payload;
      })
      .addCase(deleteAsyncTask.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.tasksData = state.tasksData.filter(
          (task) => task.id !== deletedId
        );
      });
  },
});

// obtenir les données
export const fetchAsyncTask = createAsyncThunk("tasks/fetch", async () => {
  const url = `${dataUrl}`;
  const options = {
    method: "GET",
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
});

// supprimer une tâche
export const deleteAsyncTask = createAsyncThunk(
  "tasks/delete",
  async (taskId) => {
    const url = `${dataUrl}${taskId}`;
    const options = {
      method: "delete",
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return taskId;
      } else {
        throw new Error("La suppression a échoué");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getAllTasks = (state) => state?.tasks?.tasksData;
export default taskSlice.reducer;
