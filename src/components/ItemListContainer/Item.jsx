import { Link } from "react-router-dom";
import "./Item.css";

const formatPrice = (p) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(p);

export default function Item({ id, name, price, image, category, stock, rating }) {
  return (
    <article className="item-card">
      <Link to={`/item/${id}`} className="item-card__img-wrap">
        <img src={image} alt={name} className="item-card__img" loading="lazy" />
        {stock === 0 && <span className="item-card__out-of-stock">Sin stock</span>}
        <span className="item-card__category badge badge-accent">{category}</span>
      </Link>

      <div className="item-card__body">
        <Link to={`/item/${id}`}>
          <h3 className="item-card__name">{name}</h3>
        </Link>

        <div className="item-card__footer">
          <p className="item-card__price">{formatPrice(price)}</p>
          {rating && (
            <span className="item-card__rating">
              ★ {rating.toFixed(1)}
            </span>
          )}
        </div>

        <Link to={`/item/${id}`} className="btn btn-secondary item-card__cta">
          Ver detalle
        </Link>
      </div>
    </article>
  );
}
