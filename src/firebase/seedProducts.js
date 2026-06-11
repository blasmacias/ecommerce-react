// Seed script – run once to populate Firestore with sample products
// Usage: call seedProducts() from the browser console or a temp component

import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "./config";

const SAMPLE_PRODUCTS = [
  {
    name: "Auriculares Pro Studio",
    category: "audio",
    price: 129900,
    stock: 15,
    description:
      "Auriculares over-ear con cancelación de ruido activa. Driver de 40 mm, respuesta de frecuencia 20 Hz – 20 kHz. Batería de 30 horas. Plegables para fácil transporte.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    rating: 4.8,
  },
  {
    name: "Parlante Bluetooth Aqua",
    category: "audio",
    price: 49900,
    stock: 30,
    description:
      "Parlante portátil resistente al agua IPX7. Sonido 360°, 12 W RMS. Batería de 20 horas. Ideal para exteriores y piscina.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
    rating: 4.5,
  },
  {
    name: "Teclado Mecánico TKL",
    category: "periféricos",
    price: 89900,
    stock: 20,
    description:
      "Teclado mecánico tenkeyless con switches Cherry MX Red. Retroiluminación RGB por tecla. Marco de aluminio anodizado. Cable USB-C desmontable.",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&q=80",
    rating: 4.7,
  },
  {
    name: "Mouse Inalámbrico Precision",
    category: "periféricos",
    price: 34900,
    stock: 25,
    description:
      "Mouse ergonómico inalámbrico 2.4 GHz. Sensor óptico de 4000 DPI ajustable. Batería AA de hasta 18 meses. 6 botones programables.",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
    rating: 4.3,
  },
  {
    name: "Monitor Curvo 27\"",
    category: "monitores",
    price: 399900,
    stock: 8,
    description:
      "Panel VA curvo 1500R, resolución 2K (2560×1440). Tasa de refresco 165 Hz, tiempo de respuesta 1 ms. Compatible con FreeSync Premium.",
    image: "https://images.unsplash.com/photo-1527443224154-c4a573d5087d?w=600&q=80",
    rating: 4.9,
  },
  {
    name: "Webcam 4K StreamPro",
    category: "periféricos",
    price: 74900,
    stock: 12,
    description:
      "Cámara web 4K/30 fps con autoenfoque AI y corrección de iluminación. Micrófono estéreo con cancelación de ruido. Clip universal. Plug & play.",
    image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=600&q=80",
    rating: 4.6,
  },
  {
    name: "Hub USB-C 10 en 1",
    category: "accesorios",
    price: 29900,
    stock: 40,
    description:
      "Hub multipuerto: 4× USB-A 3.0, 2× USB-C (100 W PD), HDMI 4K, SD/microSD, Ethernet Gigabit. Carcasa de aluminio con disipación pasiva.",
    image: "https://images.unsplash.com/photo-1625948515291-469b61f6d82f?w=600&q=80",
    rating: 4.4,
  },
  {
    name: "Silla Gamer ErgoX",
    category: "mobiliario",
    price: 249900,
    stock: 5,
    description:
      "Silla gaming con soporte lumbar ajustable, reposabrazos 4D y reclinación hasta 155°. Espuma de alta densidad. Peso máximo 150 kg.",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80",
    rating: 4.7,
  },
  {
    name: "Mousepad XL Desk Mat",
    category: "accesorios",
    price: 9900,
    stock: 60,
    description:
      "Alfombrilla de escritorio 900×400 mm. Superficie de tela con textura optimizada para mouse. Base de goma antideslizante. Bordes cosidos.",
    image: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=600&q=80",
    rating: 4.5,
  },
  {
    name: "Micrófono Condenser USB",
    category: "audio",
    price: 69900,
    stock: 18,
    description:
      "Micrófono de condensador cardioide USB. Respuesta de frecuencia 20 Hz – 20 kHz, 16 bit / 48 kHz. Soporte articulado de metal incluido. Plug & play.",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&q=80",
    rating: 4.6,
  },
];

export async function seedProducts() {
  const colRef = collection(db, "products");
  // Clear existing
  const snapshot = await getDocs(colRef);
  const deletes = snapshot.docs.map((d) => deleteDoc(d.ref));
  await Promise.all(deletes);
  // Insert new
  const inserts = SAMPLE_PRODUCTS.map((p) => addDoc(colRef, p));
  const results = await Promise.all(inserts);
  console.log(`✅ Seeded ${results.length} products`);
  return results;
}
