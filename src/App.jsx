import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // استدعاء ملف الـ CSV (تأكد من وضع الملف في مجلد public)
    fetch('/Ali_01.csv')
      .then(response => response.text())
      .then(csvData => {
        Papa.parse(csvData, {
          header: true, // لتحويل أول سطر في الملف إلى مفاتيح (keys)
          skipEmptyLines: true,
          complete: (results) => {
            setProducts(results.data);
          },
        });
      });
  }, []);

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>قائمة المنتجات</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {products.map((product, index) => (
          <div key={index} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
            {/* استبدل "اسم_العمود" بالأسماء الموجودة في ملفك فعلياً */}
            <h3>{product['معرف المتجر']}</h3>
            <p>العمولة: {product['العمولة']}</p>
            {/* إذا كان هناك رابط صورة في الملف */}
            {product['image_column'] && <img src={product['image_column']} alt="product" style={{width: '100%'}} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
