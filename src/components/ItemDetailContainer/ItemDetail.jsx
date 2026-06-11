import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import ItemCount from "./ItemCount";
import "./ItemDetail.css";

const formatPrice = (p) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(p);

export default function ItemDetail({ product }) {
  const { addItem, isInCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (qty) => {
    addItem(product, qty);
    setAdded(true);
  };

  const inCart = isInCart(product.id) || added;

  return (
    <div className="item-detail">
      <div className="item-detail__img-wrap">
        <img src={product.image} alt={product.name} className="item-detail__img" />
        <span className="badge badge-accent item-detail__cat">{product.category}</span>
      </div>

      <div className="item-detail__info">
        <h1 className="item-detail__name">{product.name}</h1>

        {product.rating && (
          <p className="item-detail__rating">★ {product.rating.toFixed(1)}</p>
        )}

        <p className="item-detail__price">{formatPrice(product.price)}</p>

        <p className="item-detail__desc">{product.description}</p>

        <div className="item-detail__stock">
          <span className={`badge ${product.stock > 0 ? "badge-success" : "badge-danger"}`}>
            {product.stock > 0 ? `${product.stock} disponibles` : "Sin stock"}
          </span>
        </div>

        <div className="item-detail__actions">
          {!inCart ? (
            <ItemCount stock={product.stock} onAdd={handleAdd} />
          ) : (
            <div className="item-detail__added">
              <span className="badge badge-success item-detail__added-badge">✓ Agregado al carrito</span>
              <div className="item-detail__added-btns">
                <Link to="/" className="btn btn-ghost">Seguir comprando</Link>
                <Link to="/cart" className="btn btn-primary">Ver carrito</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
