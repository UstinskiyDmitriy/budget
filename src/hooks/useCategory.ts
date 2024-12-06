import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useCategory() {
  const location = useLocation();
  const [type, setType] = useState<string[]>([]);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    const incomeCategories = ["Зарплата", "Фриланс", "Инвестиции", "Долги","Прочее"];
    const expenseCategories = ["Еда", "Транспорт", "Развлечения","Кредиты","Лекарства","Жильё","Автомобиль","Мобильная связь","Домашний интернет","Одежда"];
    if (location.pathname === "/expenses") {
      setType(expenseCategories);
    } else if (location.pathname === "/income") {
      setType(incomeCategories);
    }
  }, [location.pathname]);

  const handleCategoryToggle = (state: boolean) => setShowCategories(state);

  return { type, showCategories, handleCategoryToggle };
}
