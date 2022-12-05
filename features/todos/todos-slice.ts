import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface Todo {
  id: number
  title: string
  descriptions: string
  status: "unCompleted" | "completed"
}

export interface NewStatus {
  newStatus: "completed" | "unCompleted"
  id: number
}

export interface InitialState {
  todos: Todo[]
}


const initialState: InitialState = {
  todos: [
    // { id: 1, title: "work", descriptions: "tttt", status: "unCompleted" },
    // { id: 2, title: "work-1", descriptions: "bbbb", status: "unCompleted" },
    // { id: 3, title: "work-2", descriptions: "cccc", status: "completed" },
    // { id: 4, title: "work-3", descriptions: "gggg", status: "completed" },

  ]
}



export const counterSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ title: string; descriptions: string; }>) => {
      state.todos.push({
        ...action.payload,
        status: "unCompleted",
        id: Math.random()
      })
    },
    deletTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)

    },
    onCompletById: (state, action: PayloadAction<NewStatus>) => {
      const findedById = state.todos.find(todo => todo.id === action.payload.id)!
      findedById.status = action.payload.newStatus

    },
    onUnCompletById: (state, action: PayloadAction<NewStatus>) => {
      const findedById = state.todos.find(todo => todo.id === action.payload.id)!
      findedById.status = action.payload.newStatus

    },
    editTodo: (state, action: PayloadAction<{ title: string; descriptions: string; id: number | null }>) => {
      const findedById = state.todos.find(todo => todo.id === action.payload.id)!
      findedById.title = action.payload.title
      findedById.descriptions = action.payload.descriptions
    },

  },
})

// Action creators are generated for each case reducer function
export const { addTodo, editTodo, deletTodo, onCompletById, onUnCompletById } = counterSlice.actions

export default counterSlice.reducer