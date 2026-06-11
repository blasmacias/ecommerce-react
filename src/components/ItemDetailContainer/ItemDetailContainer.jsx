import { useParams, Link } from "react-router-dom";
import { useProduct } from "../../hooks/useProducts";
import ItemDetail from "./ItemDetail";
import "./ItemDetailContainer.css";

export default function ItemDetailContainer() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);

  return (
    <section className="item-detail-container container">
      <nav className="breadcrumb">
        <Link to="/">Inicio</Link>
        <span>›</span>
        {product && <Link to={`/category/${product.category}`}>{product.category}</Link>}
        {product && <><span>›</span><span>{product.name}</span></>}
      </nav>

      {loading && (
        <div className="loader-wrap">
          <div className="spinner" />
          <p>Cargando producto…</p>
        </div>
      )}

      {error && (
        <div className="empty-state">
          <p className="empty-icon">⚠️</p>
          <h2>No encontrado</h2>
          <p>{error}</p>
          <Link to="/" className="btn btn-primary">Volver al catálogo</Link>
        </div>
      )}

      {!loading && !error && product && <ItemDetail product={product} />}
    </section>
  );
}
