import { useParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import ItemList from "./ItemList";
import "./ItemListContainer.css";

const CATEGORY_LABELS = {
  audio: "Audio",
  "periféricos": "Periféricos",
  monitores: "Monitores",
  accesorios: "Accesorios",
  mobiliario: "Mobiliario",
};

export default function ItemListContainer() {
  const { category } = useParams();
  const { products, loading, error } = useProducts(category || null);

  const title = category ? CATEGORY_LABELS[category] || category : "Todos los productos";

  return (
    <section className="item-list-container container">
      <div className="item-list-container__header">
        <h1 className="item-list-container__title">{title}</h1>
        {!loading && !error && (
          <p className="item-list-container__count">
            {products.length} producto{products.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {loading && (
        <div className="loader-wrap">
          <div className="spinner" />
          <p>Cargando productos…</p>
        </div>
      )}

      {error && (
        <div className="empty-state">
          <p className="empty-icon">⚠️</p>
          <h2>Error al cargar</h2>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="empty-state">
          <p className="empty-icon">📦</p>
          <h2>Sin productos</h2>
          <p>No hay productos en esta categoría.</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <ItemList products={products} />
      )}
    </section>
  );
}
