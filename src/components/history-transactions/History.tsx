import {ReactNode, useState } from 'react';
import styles from './History.module.css'

interface HistoryProps {
  title: string;
  children: ReactNode;
}

export default function History({title, children}: HistoryProps) {
  const [isOpen, setOpen] = useState(false)
  const open = () => {
    setOpen(!isOpen)
  }
  return (
    <div className={styles.main}>
      <h2 onClick={open} className={styles.title}>{`${!isOpen ? 'Открыть' : 'Закрыть'} ${title}`}</h2>
      {isOpen && (
        <div className={styles.card_container}>
        {children}
        </div>
        
      )}
      
    </div>
  )
}
