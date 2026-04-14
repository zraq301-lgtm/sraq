import React, { useEffect, useState } from 'react';
import { client } from './lib/sanity';
import { ShoppingBag, ShoppingCart, Loader2, Package } from 'lucide-react';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب البيانات من Sanity
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product"]{
          _id,
          title,
          price,
          description,
          "imageUrl": image.asset->url,
          "externalUrl": image.url
        }`;
        const data = await client.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">جاري تحميل المتجر...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-right" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <ShoppingBag size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">متجر الرقة</h1>
          </div>
          
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <ShoppingCart size={24} />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">0</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8 border-b pb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="text-blue-600" /> أحدث المنتجات
          </h2>
          <span className="text-sm text-gray-500 font-medium">{products.length} منتج</span>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed">
            <p className="text-gray-400">لا توجد منتجات حالياً. ابدأ برفع ملف الـ NDJSON في لوحة التحكم.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <img 
                    src={product.imageUrl || product.externalUrl || 'https://via.placeholder.com/400'} 
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1 h-12 line-clamp-2">{product.title}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-black text-blue-600">{product.price} <small className="text-xs font-normal">ج.م</small></span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm">
                      إضافة للسلة
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
