import { useState } from "react";
import "./ItemCount.css";

export default function ItemCount({ stock, onAdd }) {
  const [count, setCount] = useState(1);

  const decrement = () => setCount((c) => Math.max(1, c - 1));
  const increment = () => setCount((c) => Math.min(stock, c + 1));

  return (
    <div className="item-count">
      <div className="item-count__controls">
        <button className="item-count__btn" onClick={decrement} disabled={count <= 1}>−</button>
        <span className="item-count__value">{count}</span>
        <button className="item-count__btn" onClick={increment} disabled={count >= stock}>+</button>
      </div>
      <button
        className="btn btn-primary item-count__add"
        onClick={() => onAdd(count)}
        disabled={stock === 0}
      >
        {stock === 0 ? "Sin stock" : "Agregar al carrito"}
      </button>
    </div>
  );
}
