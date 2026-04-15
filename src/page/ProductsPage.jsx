import React from 'react';
import productsData from '../data/products.json'; 
import { ShoppingBag, ArrowUpLeft, Percent, Tag, Star, ExternalLink } from 'lucide-react';

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-[#F3F4F6] text-right pb-20 font-sans" dir="rtl">
      {/* CSS مخصص لضبط المسافات والنصوص */}
      <style>{`
        .product-name {
          display: -webkit-box;
          -webkit-line-clamp: 2; /* عرض سطرين فقط للاسم مهما كان طويلاً */
          -webkit-box-orient: vertical;  
          overflow: hidden;
          height: 2.8rem; /* تثبيت الارتفاع لتوحيد شكل الكروت */
          line-height: 1.4rem;
        }
        .product-card {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .product-card:hover {
          transform: translateY(-5px);
        }
      `}</style>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-orange-200 shadow-lg">
              <ShoppingBag className="text-white" size={20} />
            </div>
            <span className="text-xl font-black text-gray-800">رقة ستور</span>
          </div>
          <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[11px] font-bold text-green-700">متصل الآن</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-4 pt-10 pb-6">
        <h2 className="text-3xl font-black text-gray-900 mb-2">أحدث المنتجات</h2>
        <p className="text-gray-500 text-sm">تم تحديث القائمة بناءً على آخر الإضافات.</p>
      </header>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {productsData.map((item) => (
            <div key={item.id} className="product-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full">
              
              {/* Image Container - مساحة ثابتة للصورة */}
              <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
                <img 
                  src={item.image_url} 
                  alt={item.name} 
                  className="w-full h-full object-cover" // أهم سطر لجعل كل الصور بنفس الحجم
                  loading="lazy"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[9px] font-bold text-gray-700 shadow-sm border border-gray-100 flex items-center gap-1">
                    <Tag size={10} className="text-orange-500" />
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3 md:p-4 flex flex-col flex-grow">
                {/* ID & Stars */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-medium text-gray-400">ID: {item.id.slice(-6)}</span>
                  <div className="flex text-yellow-400 scale-75 origin-left">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                </div>

                {/* اسم المنتج - ثابت الارتفاع */}
                <h3 className="product-name text-xs md:text-sm font-bold text-gray-800 mb-3 leading-tight text-right">
                  {item.name}
                </h3>

                {/* Price & Action */}
                <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold">السعر</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-black text-orange-600">{item.price}</span>
                      <span className="text-[9px] font-bold text-gray-500">{item.currency}</span>
                    </div>
                  </div>

                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-900 text-white p-2.5 rounded-xl hover:bg-orange-600 transition-colors shadow-md"
                  >
                    <ExternalLink size={18} />
                  </a>
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
