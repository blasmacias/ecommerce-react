import { useCart } from "../../context/CartContext";
import "./CartItem.css";

const formatPrice = (p) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(p);

export default function CartItem({ id, name, price, image, quantity }) {
  const { removeItem } = useCart();

  return (
    <div className="cart-item">
      <img src={image} alt={name} className="cart-item__img" />
      <div className="cart-item__info">
        <h3 className="cart-item__name">{name}</h3>
        <p className="cart-item__price">{formatPrice(price)} × {quantity}</p>
      </div>
      <div className="cart-item__right">
        <p className="cart-item__subtotal">{formatPrice(price * quantity)}</p>
        <button className="cart-item__remove" onClick={() => removeItem(id)} title="Eliminar">✕</button>
      </div>
    </div>
  );
}
