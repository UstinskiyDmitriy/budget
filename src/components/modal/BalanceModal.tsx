import { Modal, Space } from 'antd';
import { useState } from 'react';
import styles from './BalanceModal.module.css';

interface BalanceModalProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
  updateBalance: (balance: number) => void; 
}

const BalanceModal = ({ open, setOpen, updateBalance }: BalanceModalProps) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) { 
      setInputValue(value);
    }
  };

  const handleOk = () => {
    const newBalance = parseInt(inputValue, 10) || 0;
    
    updateBalance(newBalance); 
    setOpen(false); 
  };

  const handleCancel = () => {
    setOpen(false); 
  };

  return (
    <>
      <Space>
        <Modal
          title="Баланс"
          open={open}
          onOk={handleOk} 
          onCancel={handleCancel} 
          okText="Добавить"
          cancelText="Закрыть"
        >
          <input
            type="text"
            placeholder="Добавьте баланс"
            className={styles.input}
            value={inputValue} 
            onChange={handleInputChange} 
          />
        </Modal>
      </Space>
    </>
  );
};

export default BalanceModal;
