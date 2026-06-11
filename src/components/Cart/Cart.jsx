import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import "./Cart.css";

const formatPrice = (p) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(p);

export default function Cart() {
  const { cartItems, totalPrice, totalQuantity, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <section className="cart-container container">
        <h1 className="cart__title">Tu carrito</h1>
        <div className="empty-state">
          <p className="empty-icon">🛒</p>
          <h2>Carrito vacío</h2>
          <p>Todavía no agregaste ningún producto.</p>
          <Link to="/" className="btn btn-primary">Ir al catálogo</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-container container">
      <div className="cart__header">
        <h1 className="cart__title">Tu carrito</h1>
        <button className="btn btn-danger" onClick={clearCart}>Vaciar carrito</button>
      </div>

      <div className="cart__layout">
        <div className="cart__items">
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>

        <aside className="cart__summary">
          <h2 className="cart__summary-title">Resumen</h2>

          <div className="cart__summary-rows">
            <div className="cart__summary-row">
              <span>Productos</span>
              <span>{totalQuantity} unidades</span>
            </div>
            <div className="cart__summary-row cart__summary-total">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <Link to="/checkout" className="btn btn-primary cart__checkout-btn">
            Finalizar compra
          </Link>
          <Link to="/" className="btn btn-ghost cart__continue-btn">
            Seguir comprando
          </Link>
        </aside>
      </div>
    </section>
  );
}
