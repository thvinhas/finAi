// components/CategoryItem.jsx
import CategoryActions from "./CategoryActions";

export default function CategoryItem({ category, onEdit, onUpdate }) {
  const { name, type } = category;

  return (
    <div style={{ border: "1px solid #ccc", padding: "8px", margin: "8px 0" }}>
      <div>
        <strong>{name}</strong> - {type}
      </div>
      <CategoryActions
        onEdit={() => onEdit(category)}
        onUpdate={onUpdate}
        category={category}
      />
    </div>
  );
}
