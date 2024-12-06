import { Link, useLocation } from 'react-router-dom';
import styles from './NavBar.module.css';
import { ChartNoAxesCombined, HandCoins, Menu, Wallet } from 'lucide-react';

export default function NavBar() {
  const location = useLocation();

  const getLinkClass = (path: string) => {
    if (location.pathname === path) {
      switch (path) {
        case '/expenses':
          return styles.activeExpenses;
        case '/income':
          return styles.activeIncome;
        case '/goals':
          return styles.activeGoals;
        case '/menu':
          return styles.activeMenu;
        default:
          return '';
      }
    }
    
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <ul className={styles.navList}>
          <li>
            <Link to="/expenses" className={`${styles.link} ${getLinkClass('/expenses')}`}>
              <HandCoins />
              Расходы
            </Link>
          </li>
          <li>
            <Link to="/income" className={`${styles.link} ${getLinkClass('/income')}`}>
              <Wallet />
              Доходы
            </Link>
          </li>
          <li>
            <Link to="/goals" className={`${styles.link} ${getLinkClass('/goals')}`}>
              <ChartNoAxesCombined />
              Цели
            </Link>
          </li>
          <li>
            <Link to="/menu" className={`${styles.link} ${getLinkClass('/menu')}`}>
              <Menu />
              Меню
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}