import { useState } from "react";
import { Link } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useCart } from "../../context/CartContext";
import "./CheckoutForm.css";

const INITIAL = { name: "", email: "", confirmEmail: "", phone: "" };

export default function CheckoutForm() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [orderId, setOrderId] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "El nombre es obligatorio.";
    if (!form.email.includes("@")) e.email = "Email inválido.";
    if (form.email !== form.confirmEmail) e.confirmEmail = "Los emails no coinciden.";
    if (!/^\d{7,}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Teléfono inválido.";
    return e;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    if (cartItems.length === 0) return;

    setStatus("loading");
    try {
      const order = {
        buyer: { name: form.name, email: form.email, phone: form.phone },
        items: cartItems.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
        total: totalPrice,
        date: serverTimestamp(),
      };
      const ref = await addDoc(collection(db, "orders"), order);
      setOrderId(ref.id);
      clearCart();
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (cartItems.length === 0 && status !== "success") {
    return (
      <section className="checkout-container container">
        <div className="empty-state">
          <p className="empty-icon">🛒</p>
          <h2>Carrito vacío</h2>
          <p>No hay productos para comprar.</p>
          <Link to="/" className="btn btn-primary">Ir al catálogo</Link>
        </div>
      </section>
    );
  }

  if (status === "success") {
    return (
      <section className="checkout-container container">
        <div className="checkout-success">
          <div className="checkout-success__icon">✓</div>
          <h1>¡Compra realizada!</h1>
          <p>Tu orden fue registrada con éxito.</p>
          <div className="checkout-success__id">
            <span>ID de orden</span>
            <code>{orderId}</code>
          </div>
          <p className="checkout-success__sub">
            Guardá este número para el seguimiento de tu pedido.
          </p>
          <Link to="/" className="btn btn-primary">Volver al inicio</Link>
        </div>
      </section>
    );
  }

  const formatPrice = (p) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(p);

  return (
    <section className="checkout-container container">
      <h1 className="checkout__title">Finalizar compra</h1>

      <div className="checkout__layout">
        {/* Form */}
        <div className="checkout__form-wrap">
          <h2 className="checkout__section-title">Datos del comprador</h2>

          <div className="checkout__fields">
            {[
              { name: "name", label: "Nombre completo", type: "text", placeholder: "Juan Pérez" },
              { name: "email", label: "Email", type: "email", placeholder: "juan@email.com" },
              { name: "confirmEmail", label: "Confirmar email", type: "email", placeholder: "juan@email.com" },
              { name: "phone", label: "Teléfono", type: "tel", placeholder: "1123456789" },
            ].map(({ name, label, type, placeholder }) => (
              <div key={name} className="checkout__field">
                <label htmlFor={name} className="checkout__label">{label}</label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  value={form[name]}
                  onChange={handleChange}
                  className={`checkout__input ${errors[name] ? "checkout__input--error" : ""}`}
                />
                {errors[name] && <p className="checkout__error">{errors[name]}</p>}
              </div>
            ))}
          </div>

          {status === "error" && (
            <p className="checkout__server-error">
              Ocurrió un error al procesar tu orden. Intentá de nuevo.
            </p>
          )}
        </div>

        {/* Order summary */}
        <aside className="checkout__summary">
          <h2 className="checkout__section-title">Tu pedido</h2>
          <div className="checkout__summary-items">
            {cartItems.map((item) => (
              <div key={item.id} className="checkout__summary-item">
                <span className="checkout__summary-name">{item.name}</span>
                <span className="checkout__summary-qty">×{item.quantity}</span>
                <span className="checkout__summary-sub">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="checkout__summary-total">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          <button
            className="btn btn-primary checkout__submit"
            onClick={handleSubmit}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Procesando…" : "Confirmar orden"}
          </button>
          <Link to="/cart" className="btn btn-ghost checkout__back">
            ← Volver al carrito
          </Link>
        </aside>
      </div>
    </section>
  );
}
