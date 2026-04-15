import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { ShoppingCart, ExternalLink, Tag, Store, AlertCircle } from 'lucide-react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // استدعاء الملف مباشرة من مجلد public
    // في Vite، الملفات في public يتم الوصول إليها عبر المسار الأساسي '/'
    fetch('/Ali_01.csv')
      .then((response) => {
        if (!response.ok) {
          throw new Error('لم يتم العثور على ملف المنتجات في public/Ali_01.csv');
        }
        return response.text();
      })
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          delimiter: "|", // الفاصل المستخدم في ملفك بناءً على التحليل
          skipEmptyLines: true,
          complete: (results) => {
            if (results.data && results.data.length > 0) {
              // تنظيف البيانات من المسافات المخفية في أسماء الأعمدة
              const cleanData = results.data.map(item => {
                const newItem = {};
                Object.keys(item).forEach(key => {
                  const cleanKey = key.trim();
                  newItem[cleanKey] = item[key]?.trim();
                });
                return newItem;
              });
              setProducts(cleanData);
            }
            setLoading(false);
          },
          error: (err) => {
            setError("خطأ في تحليل بيانات الملف");
            setLoading(false);
          }
        });
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
        <AlertCircle className="text-red-500 mb-4" size={48} />
        <h2 className="text-xl font-bold text-gray-800">حدث خطأ</h2>
        <p className="text-gray-600 mt-2">{error}</p>
        <p className="text-sm text-gray-400 mt-4">تأكد من وجود الملف في المسار: public/Ali_01.csv</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm mb-8 sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-black text-gray-800 flex items-center gap-2">
            <ShoppingCart className="text-orange-500" />
            متجر رقة
          </h1>
          <div className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-bold">
            {products.length} منتج متوفر
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              {/* Product Image Area */}
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img 
                  src={product['الصورة'] || 'https://via.placeholder.com/300?text=No+Image'} 
                  alt="منتج"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=Image+Error'; }}
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 backdrop-blur-sm text-green-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                    <Tag size={12} />
                    عمولة: {product['العمولة'] || '%0'}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                  <Store size={14} />
                  <span>متجر: {product['معرف المتجر'] || 'غير معروف'}</span>
                </div>
                
                <h3 className="text-gray-800 font-bold text-md mb-4 line-clamp-2 h-12">
                   منتج رقم {index + 1} - عرض مميز
                </h3>

                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="text-gray-400 text-xs mb-0.5">السعر</p>
                    <p className="text-xl font-black text-gray-900 leading-none">
                      {product['السعر'] || '0.00'} 
                      <span className="text-xs font-normal text-gray-500 mr-1">ج.م</span>
                    </p>
                  </div>
                  
                  <button className="bg-orange-500 text-white p-3 rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-100">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
