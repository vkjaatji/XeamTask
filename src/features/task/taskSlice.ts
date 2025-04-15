import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Task {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

interface State {
  tasks: Task[];
}

const initialState: State = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, {payload}: PayloadAction<any>) => {
      state.tasks.push({
        id: new Date().getMilliseconds(),
        completed: false,
        ...payload,
      });
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const {addTask, deleteTask, toggleTask, setTasks} = taskSlice.actions;
export default taskSlice.reducer;
