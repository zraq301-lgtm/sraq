import React, { useEffect, useState } from 'react';
import { client } from './lib/sanity'; // تأكد أن المسار مطابق لمكان ملف sanity.js
import { ShoppingCart, ShoppingBag, Loader2 } from 'lucide-react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // جلب البيانات مع التأكد من جلب رابط الصورة سواء كانت ملفاً مرفوعاً أو رابطاً نصياً
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
        setLoading(false);
      } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-gray-600 font-medium">جاري تجهيز متجر الرقة...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen" dir="rtl">
      {/* الشريط العلوي */}
      <nav className="bg-white shadow-sm p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <ShoppingBag /> متجر الرقة
          </h1>
          <div className="relative cursor-pointer hover:scale-110 transition-transform">
            <ShoppingCart className="text-gray-600" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 shadow-sm">0</span>
          </div>
        </div>
      </nav>

      {/* محتوى المتجر */}
      <main className="max-w-6xl mx-auto p-6">
        <header className="mb-10 text-center sm:text-right">
          <h2 className="text-3xl font-bold text-gray-800">أحدث المنتجات</h2>
          <p className="text-gray-500">استكشف تشكيلتنا الجديدة المختارة بعناية</p>
        </header>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
              {/* حاوية الصورة */}
              <div className="h-56 bg-gray-100 relative overflow-hidden">
                <img 
                  src={product.imageUrl || product.externalUrl || 'https://via.placeholder.com/300x300?text=No+Image'} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* تفاصيل المنتج */}
              <div className="p-5">
                <h3 className="font-bold text-gray-800 text-lg mb-2 h-14 line-clamp-2 leading-tight">
                  {product.title}
                </h3>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">السعر</span>
                    <span className="text-blue-600 font-extrabold text-xl">{product.price} <small className="text-xs font-normal">ج.م</small></span>
                  </div>
                  <button className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 shadow-md hover:shadow-blue-200 transition-all active:scale-95">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* تذييل بسيط */}
      <footer className="py-10 text-center text-gray-400 border-top mt-10">
        <p>© 2026 متجر الرقة - جميع الحقوق محفوظة</p>
      </footer>
    </div>
  );
}

export default App;
