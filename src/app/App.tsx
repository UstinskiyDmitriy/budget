import styles from './App.module.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from '../components/nav-bar/NavBar';
import Header from '../components/header/Header';
import Balance from '../components/balance/Balance';
import Expenses from '../pages/expenses/Expenses';
import Income from '../pages/income/Income';



function App() {

  return (
    <>
      <Router>
      <Header />
      <Balance />
      <NavBar />
      <main className={styles.main}>
        <Routes>
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/income" element={<Income />} />
        </Routes>
      </main>
    </Router>
    </>
  
  );
}

export default App;
