import { createSlice, nanoid } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    loading: false,
    todos: [],
  },

  reducers: (create) => ({
    deleteTodo: create.reducer((state, action) => {
      state.todos.splice(action.payload, 1)
    }),
    addTodo: create.preparedReducer(
      (text) => {
        const id = nanoid()
        return { payload: { id, text } }
      },
      // action type is inferred from prepare callback
      (state, action) => {
        state.todos.push(action.payload)
      },
    ),
    fetchTodo: create.asyncThunk(
      async (id, thunkApi) => {
        const res = await fetch(`myApi/todos?id=${id}`)
        return await res.json()
      },
      {
        pending: (state) => {
          state.loading = true
        },
        rejected: (state, action) => {
          state.loading = false
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.todos.push(action.payload)
        },
      },
    ),

    
  }),



})

export const { addTodo, deleteTodo, fetchTodo } = todosSlice.actions