import React from 'react';
import productsData from '../data/products.json'; 
import { ShoppingBag, ArrowUpLeft, Percent, Tag, CheckCircle2, Star } from 'lucide-react';

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-right pb-20 font-sans" dir="rtl">
      {/* CSS مخصص لتحسين مظهر كروت المنتجات */}
      <style>{`
        .product-card {
          transition: all 0.3s ease;
          border: 1px solid rgba(0,0,0,0.03);
        }
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
      `}</style>

      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-100">
              <ShoppingBag className="text-white" size={22} />
            </div>
            <span className="text-2xl font-black text-gray-900">رقة ستور</span>
          </div>
          <div className="bg-green-50 px-3 py-1 rounded-full border border-green-100 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-green-700">متصل الآن</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-black text-gray-900 mb-2">أحدث المعروضات</h2>
        <p className="text-gray-500">تصفح أفضل المنتجات المختارة من AliExpress بجودة عالية.</p>
      </header>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productsData.map((item) => (
            <div key={item.id} className="product-card group bg-white rounded-3xl overflow-hidden flex flex-col">
              
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img 
                  src={item.image_url} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Badge القسم */}
                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-bold text-gray-600 shadow-sm border border-gray-100 flex items-center gap-1">
                    <Tag size={10} className="text-orange-500" />
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                    ID: {item.id.slice(-6)}
                  </span>
                  <div className="flex text-yellow-400">
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                  </div>
                </div>

                {/* اسم المنتج من الـ JSON */}
                <h3 className="text-sm font-bold text-gray-800 mb-4 line-clamp-2 h-10 group-hover:text-orange-600 transition-colors">
                  {item.name}
                </h3>

                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold mb-1">سعر المنتج</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black text-gray-900">{item.price}</span>
                      <span className="text-[10px] font-bold text-gray-500">{item.currency}</span>
                    </div>
                  </div>

                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-900 text-white p-3 rounded-xl hover:bg-orange-500 transition-all shadow-md hover:shadow-orange-200"
                  >
                    <ArrowUpLeft size={20} />
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
