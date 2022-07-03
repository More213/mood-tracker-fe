import React, { useEffect, useState } from 'react';
// import './index.css';
import styles from './toolbar.module.scss';
import Modal from 'react-modal/lib/components/Modal';
import {Input, Select, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories, addNewTodo, addNewCategory } from '../../store/categorySlise';
import { fetchNewCategories, fetchNewTodo } from '../../api/index'
const Option = Select.Option;

const Toolbar = () => {
    const [show, setShow] = useState(false)
    const categoriesSelector = useSelector(getCategories)
    const [isNewCategory, setIsNewCategory] = useState(true)
    const [defaultValue, setDefaultValue] = useState('newCat')
    const [todo, setTodo] = useState('')
    const [categoriTitle, setCategoryTitle] = useState('')
    const [categoriID, setCategoryId] = useState(null)
    const [isDisable, setIsDisable] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        if(todo === '' || categoriTitle === '') {
            setIsDisable(true)
        } else {
            setIsDisable(false)
        }
    }, [todo, categoriTitle])

    useEffect(() => {
        if(!!categoriID) {
            let selectCategori = categoriesSelector.payload.categories?.find((el) => el._id === categoriID)
            console.log(selectCategori.title)
            setCategoryTitle(selectCategori.title)
        }
    }, [categoriID])

    const handleOpenModal =() => {
        setShow(!show)
    }

    const handleClose = (status) => {
        setShow(status)
    }

    const handleSelect = (value) => {
        if(value === "newCat") {
            setIsNewCategory(true)
            setCategoryId(null)
            setCategoryTitle('')
            setDefaultValue(value)
        
        } else {
            setIsNewCategory(false)
            setCategoryId(value)
            setDefaultValue(value)
        }
    }


    const CastomSelect = ({categories = []}) => { 
        return (
            <Select 
            className={styles.input}
            defaultValue={defaultValue} onChange={(el) => handleSelect(el)} >
                {categories.payload.categories?.map((category) => (
                    <Option value={category._id} >{category.title}</Option>
                ))} 
                <Option value="newCat">Новая категория</Option>
            </Select>
        )}

    const sendNewCategory = () => {
        if(!!categoriID) {
            let selectCategori = categoriesSelector.payload.categories?.find((el) => el._id === categoriID)
            fetchNewTodo({
                _id: selectCategori._id,
                title: selectCategori.title,
                todos: [{
                  _id: null,
                  text: todo,
                  isCompleted: false
                  }]
                })
            .then((res) => {
                dispatch(addNewTodo(res.data))
            })
        } else {
            fetchNewCategories({
                _id: null,
                title: categoriTitle,
                todos: [{
                    _id: null,
                    text: todo,
                    isCompleted: false
                }]
            })
            .then((res) => {
                dispatch(addNewCategory(res.data))
            }) 
        }
        setShow(false)
    }

    return (
        <div className={styles.toolbar}>
            <h1>hi</h1>
            <button 
            onClick={handleOpenModal}
            className={styles.btn}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            </button>
            <Modal
            isOpen={show}

            ariaHideApp={false}

            className={styles.modal}
            overlayClassName={styles.overlay}
            >
            <div className={styles.modalContainer}>
                <div className={styles.wrapContent}>
                    <div  className={styles.title}>
                    <h2>Новая задача</h2>
                    </div>
                    <div className={styles.wrapInput}>
                    
                        <Input 
                        className={styles.input}
                        onChange={(el) => setTodo(el.target.value)}
                        placeholder="Название задачи" />

                        {<CastomSelect categories={categoriesSelector}/>}

                        {isNewCategory ? 
                        <Input 
                        className={styles.input}
                        onChange={(el) => setCategoryTitle(el.target.value)}
                        placeholder="Категория" /> 
                        : null}
                    <div className={styles.wrapButton}>
                        <Button type="primary"
                        className={styles.btnModal}
                         onClick={() => handleClose(false)}>Отмена</Button>
                        <Button type="primary" 
                        className={styles.btnModal}
                        onClick={() => sendNewCategory()} disabled={isDisable}>Ok</Button>
                    </div>
                    </div>
                </div>
            </div>
            </Modal>    
        </div>
     )  
}

export default Toolbar;
