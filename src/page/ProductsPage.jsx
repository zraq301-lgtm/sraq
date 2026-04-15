import React from 'react';
import productsData from '../data/products.json';
import { ShoppingBag, ArrowUpLeft, Tag, Star, ExternalLink } from 'lucide-react';

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-[#f0f2f5] pb-10 font-sans" dir="rtl">
      {/* CSS إجباري لتوحيد الأحجام ومنع التمدد الزائد */}
      <style>{`
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); /* توحيد عرض الكروت */
          gap: 12px;
          padding: 12px;
        }
        @media (min-width: 768px) {
          .grid-container {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 20px;
          }
        }
        .product-image-fixed {
          width: 100%;
          height: 180px; /* ارتفاع ثابت للصورة لا يتغير أبداً */
          object-fit: cover; /* قص الصورة لتناسب المربع دون تمطيط */
        }
        .product-title-fixed {
          display: -webkit-box;
          -webkit-line-clamp: 2; /* سطرين فقط */
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 40px; /* ارتفاع ثابت للنص */
          font-size: 0.85rem;
          line-height: 1.2rem;
          margin-bottom: 8px;
        }
        .card-shadow {
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
      `}</style>

      {/* Navigation */}
      <nav className="bg-white sticky top-0 z-50 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center">
            <ShoppingBag className="text-white" size={18} />
          </div>
          <span className="text-lg font-bold text-gray-800">رقة ستور</span>
        </div>
        <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-md">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-green-700">متصل</span>
        </div>
      </nav>

      <header className="px-5 py-6">
        <h2 className="text-xl font-black text-gray-900">أحدث المنتجات</h2>
      </header>

      {/* Grid Container */}
      <main className="grid-container max-w-7xl mx-auto">
        {productsData.map((item) => (
          <div key={item.id} className="bg-white rounded-xl overflow-hidden card-shadow flex flex-col h-full border border-gray-100">
            
            {/* الجزء العلوي: الصورة */}
            <div className="relative">
              <img 
                src={item.image_url} 
                alt="product" 
                className="product-image-fixed bg-gray-50"
              />
              <span className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-[9px] px-2 py-0.5 rounded-md uppercase">
                {item.category}
              </span>
            </div>

            {/* الجزء السفلي: البيانات */}
            <div className="p-3 flex flex-col flex-grow">
              <div className="flex items-center gap-1 mb-1 text-yellow-400">
                <Star size={10} fill="currentColor" />
                <span className="text-[10px] text-gray-400 font-bold">5.0</span>
              </div>

              <h3 className="product-title-fixed font-bold text-gray-800 text-right leading-tight">
                {item.name}
              </h3>

              <div className="mt-auto pt-3 border-t border-gray-50 flex items-end justify-between">
                <div>
                  <span className="text-[9px] text-gray-400 block mb-0.5 font-bold">السعر</span>
                  <div className="flex items-center gap-1">
                    <span className="text-base font-black text-orange-600 tracking-tight">{item.price}</span>
                    <span className="text-[10px] font-bold text-gray-500">{item.currency}</span>
                  </div>
                </div>

                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default ProductsPage;
