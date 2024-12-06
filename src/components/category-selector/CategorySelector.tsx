import styles from "./CategorySelector.module.css";

interface CategorySelectorProps {
  categories: string[];
  onSelect: (category: string) => void;
}

export default function CategorySelector({ categories, onSelect }: CategorySelectorProps) {
  return (
    <div className={styles.category}>
      <h4>Выберите категорию:</h4>
      {categories.map((category) => (
        <div key={category} className={styles.categoryButtonWrapper}>
          <button className={styles.categoryButton} onClick={() => onSelect(category)}>
            {category}
          </button>
        </div>
      ))}
    </div>
  );
}
