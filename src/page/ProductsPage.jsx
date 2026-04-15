import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { ShoppingCart, ExternalLink, Tag, Store, AlertCircle } from 'lucide-react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // استدعاء الملف من مجلد public
    fetch('/Ali_01.csv')
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          delimiter: "|", // الفاصل المستخدم في ملفك
          skipEmptyLines: true,
          complete: (results) => {
            // تنظيف الأسماء من المسافات الزائدة
            const cleanData = results.data.map(item => {
              const newItem = {};
              Object.keys(item).forEach(key => {
                newItem[key.trim()] = item[key]?.trim();
              });
              return newItem;
            });
            setProducts(cleanData);
            setLoading(false);
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
            setLoading(false);
          }
        });
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12" dir="rtl">
      {/* Header Section */}
      <header className="bg-white shadow-sm mb-8 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-black text-gray-800 flex items-center gap-2">
            <ShoppingCart className="text-orange-500" />
            متجر رقة
          </h1>
          <div className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-bold">
            {products.length} منتج متاح
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4">
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <AlertCircle className="mx-auto text-gray-300 mb-4" size={64} />
            <p className="text-gray-500 text-xl">لم يتم العثور على منتجات حالياً.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img 
                    src={product['الصورة'] || 'https://via.placeholder.com/300'} 
                    alt="Product"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/90 backdrop-blur-sm text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                      <Tag size={12} />
                      خصم {product['العمولة']}
                    </span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                    <Store size={14} />
                    <span>معرف المتجر: {product['معرف المتجر']}</span>
                  </div>
                  
                  <h3 className="text-gray-800 font-bold text-lg mb-4 line-clamp-1">
                    منتج مميز من {product['معرف المتجر']}
                  </h3>

                  <div className="flex items-center justify-between border-t pt-4">
                    <div>
                      <p className="text-gray-400 text-xs mb-0.5">السعر الحالي</p>
                      <p className="text-xl font-black text-orange-600">{product['السعر']} <span className="text-sm font-normal text-gray-500">ج.م</span></p>
                    </div>
                    
                    <button className="bg-gray-900 text-white p-3 rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-gray-200 group-hover:shadow-orange-200">
                      <ExternalLink size={20} />
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

export default ProductsPage;
