import { ChartPie } from 'lucide-react'
import styles from './Header.module.css'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header() {
  const [title, setTitle] = useState('')
  const location = useLocation()

 useEffect(() => {
  switch(location.pathname){
    case "/expenses":
    setTitle('Расходы')
    break
    case "/income":
      setTitle('Доходы')
      break
      case "/goals":
        setTitle('Цели')
        break
        case "/menu":
          setTitle('Меню')
          break
  }
 },[location])

  return (
    <header className={styles.main}>
      <div className={styles.wrapper}>
        <div></div>
        <div><p className={styles.title}>{title}</p></div>
        <ChartPie className={styles.chart}/>
      </div>
    </header>
  )
}
