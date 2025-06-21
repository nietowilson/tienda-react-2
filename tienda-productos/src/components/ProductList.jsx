import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

function ProductList() {
  // Estados para manejar los datos y el estado de la aplicación
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect se ejecuta cuando el componente se monta
  useEffect(() => {
    // Función para obtener los productos de la API
    fetch('https://dummyjson.com/products?limit=15')
      .then((response) => {
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
          throw new Error('Error al cargar productos');
        }
        return response.json();
      })
      .then((data) => {
        // Guardar los productos en el estado
        setProducts(data.products);
      })
      .catch((err) => {
        // Manejar errores
        setError(err.message);
      })
      .finally(() => {
        // Siempre ejecutar esto al final
        setLoading(false);
      });
  }, []); // El array vacío significa que solo se ejecuta una vez

  // Mostrar mensaje de carga
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>🔄 Cargando productos...</p>
      </div>
    );
  }

  // Mostrar mensaje de error
  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
        <p>❌ Error: {error}</p>
      </div>
    );
  }

  // Mostrar la lista de productos
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1rem',
      padding: '1rem 0'
    }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;