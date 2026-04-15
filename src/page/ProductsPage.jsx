import React from 'react';
import productsData from '../data/products.json';
import { ShoppingBag, ArrowUpLeft, Percent, Store, CheckCircle2, Sparkles } from 'lucide-react';

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-right pb-20 font-sans" dir="rtl">
      {/* CSS مخصص للتأثيرات التي يصعب تنفيذها بـ Tailwind فقط */}
      <style>{`
        .product-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .product-card:hover {
          box-shadow: 0 25px 50px -12px rgba(249, 115, 22, 0.15);
        }
        .image-container::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 40%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .product-card:hover .image-container::after {
          opacity: 1;
        }
      `}</style>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200 rotate-3 group-hover:rotate-0 transition-transform">
              <ShoppingBag className="text-white" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-gray-900 leading-none">رقة ستور</span>
              <span className="text-[10px] font-bold text-orange-500 tracking-[0.2em]">LUXURY SHOPPING</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-green-50 px-3 py-1.5 rounded-full flex items-center gap-2 border border-green-100">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-green-700">متصل الآن</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center md:text-right">
        <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-1 rounded-full mb-4">
          <Sparkles size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">وصلنا حديثاً</span>
        </div>
        <h2 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">أناقتك تبدأ من هنا</h2>
        <p className="text-gray-500 text-lg max-w-2xl font-medium leading-relaxed">
          اكتشف تشكيلة واسعة من المنتجات العصرية المختارة بعناية لتناسب ذوقك الرفيع.
        </p>
      </header>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {productsData.map((item) => (
            <div key={item.id} className="product-card group bg-white rounded-[2.5rem] p-4 border border-gray-50 relative overflow-hidden">
              
              {/* Image Card */}
              <div className="image-container relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gray-100">
                <img 
                  src={item.image} 
                  alt="Product" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Commission Tag */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-white/90 backdrop-blur-md shadow-sm px-4 py-2 rounded-2xl flex items-center gap-2 border border-white">
                    <Percent className="text-orange-500" size={14} />
                    <span className="text-sm font-black text-gray-900">{item.commission}</span>
                  </div>
                </div>

                {/* Quick Action Overlay (Optional) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                   <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/30">
                      <ShoppingBag className="text-white" size={30} />
                   </div>
                </div>
              </div>

              {/* Product Info Content */}
              <div className="mt-6 px-2 pb-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 bg-gray-100 rounded-md flex items-center justify-center">
                    <Store className="text-gray-400" size={12} />
                  </div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">المتجر: {item.storeId}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-6 line-clamp-1 group-hover:text-orange-500 transition-colors">
                   {item.name || "منتج أناقة عصري"}
                </h3>

                <div className="flex items-center justify-between border-t border-gray-50 pt-5">
                  <div>
                    <span className="text-[10px] text-gray-400 font-black block mb-1 uppercase">السعر النهائي</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-gray-900">{item.price}</span>
                      <span className="text-xs font-bold text-gray-400">ج.م</span>
                    </div>
                  </div>

                  <button className="bg-gray-900 text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-orange-500 transition-all duration-300 shadow-lg shadow-gray-200 group-hover:shadow-orange-200 group-hover:-rotate-12">
                    <ArrowUpLeft size={24} />
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
