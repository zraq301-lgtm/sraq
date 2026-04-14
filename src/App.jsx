import React, { useEffect, useState } from 'react';
import { client } from './lib/sanity'; // ملف الربط اللي عملناه
import { ShoppingCart, ShoppingBag } from 'lucide-react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب البيانات من Sanity عند فتح الصفحة
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = '*[_type == "product"]'; // استعلام لجلب كل المنتجات
        const data = await client.fetch(query);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">جاري تحميل المنتجات...</div>;

  return (
    <div className="bg-gray-50 min-h-screen dir-rtl" dir="rtl">
      {/* الشريط العلوي */}
      <nav className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <ShoppingBag /> متجر الرقة
          </h1>
          <div className="relative">
            <ShoppingCart className="text-gray-600 cursor-pointer" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">0</span>
          </div>
        </div>
      </nav>

      {/* عرض المنتجات */}
      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-xl font-semibold mb-6">أحدث المنتجات</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* صورة المنتج */}
              <div className="h-48 bg-gray-200">
                {product.image && (
                  <img 
                    src={product.image.url} // تأكد من ضبط الرابط في Sanity
                    alt={product.title} 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              {/* تفاصيل المنتج */}
              <div className="p-4">
                <h3 className="font-bold text-gray-800 text-lg mb-1">{product.title}</h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold">{product.price} ج.م</span>
                  <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                    إضافة للسلة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
