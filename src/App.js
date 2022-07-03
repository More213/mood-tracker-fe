import styles from './App.scss';
import Toolbar from './components/toolbar/toolbar'
import Categories from './components/categories/categories';

function App() {
  
  return (
    <div className={styles.App}>
      {<Toolbar/>}
      {<Categories/>}
    </div>
  );
}

export default App;
