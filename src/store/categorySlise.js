import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  categories: [],
}
export const categorySlise = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getCategories: (state, action) => {
      state.categories = action.payload
    },
    addNewCategory:  (state, action) => {
      state.categories = [...state.categories, action.payload]
    },
    addNewTodo: (state, action) => {
      const newTodo = {
        text: action.payload.text,
        isCompleted: action.payload.isCompleted,
        atUpdate: action.payload.atUpdate,
        _id:action.payload._id,
      }
    const newCategoriesState = state.categories.map((category ) => {
          if(category._id === action.payload.categoryId) {
          return {
              ...category,
              todos: [...category.todos, newTodo]}
          }
          return category
          })
          
          state.categories = newCategoriesState
          },
        }
      })

export const { getCategories, addNewCategory, addNewTodo} = categorySlise.actions

export default categorySlise.reducer