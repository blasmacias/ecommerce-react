import Item from "./Item";
import "./ItemList.css";

export default function ItemList({ products }) {
  return (
    <div className="item-list">
      {products.map((p) => (
        <Item key={p.id} {...p} />
      ))}
    </div>
  );
}
