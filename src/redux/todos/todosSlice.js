import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const api = "https://jsonplaceholder.typicode.com/todos"

export const getTodosAsync = createAsyncThunk("/todos/getTodosAsync", async () => {
    const res = await axios(api);
    return res.data;
})

export const toggleTodoAsync = createAsyncThunk("/todos/toggleTodoAsync", async (id) => {
    await axios.patch(`${api}/${id}`)
    return id
})

export const deleteTodoAsync = createAsyncThunk("/todos/deleteTodoAsync", async (id) => {
    await axios.delete(`${api}/${id}`)
    return id
})

export const addTodoAsync = createAsyncThunk("/todos/addTodoAsync", async (data) => {
    const res = await axios.post(`${api}`, data)
    return res.data
})

const todosSlice = createSlice({
    name: "todos",
    initialState: {
        items: [],
        activeFilter: "all",
        getStatus: "idle",
        addStatus: "idle",
    },
    reducers: {
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload
        },
        clearCompleted: (state, action) => {
            state.items = state.items.filter(item => item.completed === false)
        }, 
    },
    extraReducers(builder) {
        builder
            .addCase(getTodosAsync.pending, (state, action) => {
                state.getStatus = "pending"
            })
            .addCase(getTodosAsync.fulfilled, (state, action) => {
                state.items = action.payload
                state.getStatus = "succeeded"
            })
            .addCase(getTodosAsync.rejected, (state, action) => {
                state.getStatus = "failed"
            })
            .addCase(addTodoAsync.pending, (state, action) => {
                state.addStatus = "pending"
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                const { title } = action.payload
                state.items.push({ userId: 1, id: nanoid(), title, completed: false })
                state.addStatus = "succeeded"
            })
            .addCase(addTodoAsync.rejected, (state, action) => {
                state.addStatus = "failed"
            })
            .addCase(toggleTodoAsync.fulfilled, (state, action) => {
                const { id } = action.payload
                const index = state.items.findIndex(item => item.id === id)
                state.items[index].completed = !state.items[index].completed
            })
            .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                const id = action.payload
                const filtered = state.items.filter((item) => item.id !== id)
                state.items = filtered
            })
    }
})


export default todosSlice.reducer

export const { changeActiveFilter, clearCompleted } = todosSlice.actions

export const selectTodos = (state) => state.todos.items
