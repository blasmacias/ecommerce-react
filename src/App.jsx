import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Cart from "./components/Cart/Cart";
import CheckoutForm from "./components/CheckoutForm/CheckoutForm";
import "./styles/global.css";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/category/:category" element={<ItemListContainer />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="*" element={
              <div className="empty-state container" style={{paddingTop:"4rem"}}>
                <p className="empty-icon">404</p>
                <h2>Página no encontrada</h2>
                <a href="/" className="btn btn-primary" style={{marginTop:"1rem"}}>Volver al inicio</a>
              </div>
            } />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  );
}
