import React, {useEffect, useState} from 'react';
import styles from './categories.module.scss';
import { fetchCategories, fetchNewCategories, fetchCheckTodo} from '../../api/index.js'
import { Card, Checkbox } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import {getCategories, checkTodo} from '../../store/categorySlise'


const Categories = () => {
  const categoriesSelector = useSelector(getCategories)
  const [categories, setCategories] = useState( categoriesSelector.payload.categories)

  const dispatch = useDispatch()

  useEffect(() => {
    fetchCategories().then((res) => {
      dispatch(getCategories(res.data))
      setCategories(res.data)
    })
  }, [])
  
  useEffect(() => {
    setCategories(categoriesSelector.payload.categories)
  }, [categoriesSelector])
  
  const handleChecked = (category) => {
    fetchCheckTodo(category)
    .then((res) => {
      const updateTodo = categories.map((category) => {
        if(category._id === res.data.categoryId) {
          const newCat = category.todos.map((todo) => {
              if(todo._id === res.data.todoId) {
                  return {
                      ...todo,
                      isCompleted: res.data.isCompleted
                  }
              }
              return todo
          })
          return {
              ...category,
              todos: newCat
          }
          }
          return category
      })
      setCategories(
        updateTodo
      )
    })
  }

  const CategoryCard = ({title = '', todos = [], categoryId = ''}) => {
    return (
      <Card className={styles.category} title={title}>
        <div className={styles.todoList}>
        {todos.map((todo) => (
          <Checkbox 
          checked={todo.isCompleted}
          onChange={() => handleChecked({
            todoId: todo._id,
            categoryId: categoryId,
            isCompleted: !todo.isCompleted,
            atUpdate: todo.atUpdate,
          })}
          >
            {todo.text}
          </Checkbox>
        ))}
        </div>
      </Card>
    )
  }
  
    return (
        <div className={styles.categoryWrap}>
          {categories.map((category)=> (
            <CategoryCard title={category.title} todos={category.todos} categoryId={category._id}/>
          ))}
        </div>
     )  
}

export default Categories;