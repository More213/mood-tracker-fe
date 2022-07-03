import axios from 'axios';
const ROOT = 'http://localhost:3000/'

export const fetchCategories = async (query) => {
  try {
      return await axios.get(`${ROOT}getCategories`);
  } catch(e) {
      console.log('e: ', e);
  }
};
export const fetchNewCategories = async (category) => {
  try {
    return await axios.post(`${ROOT}post`, category)
  } catch(e) {
    console.log('e: ', e);
  }
}
export const fetchNewTodo = async (category) => {
  try {
    return await axios.post(`${ROOT}postTodo`, category)
  } catch(e) {
    console.log('e: ', e);
  }
}
export const fetchCheckTodo = async (category) => {
  try {
    return await axios.post(`${ROOT}checkTodo`, category)
  } catch(e) {
    console.log('e: ', e);
  }
}