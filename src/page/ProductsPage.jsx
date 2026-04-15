import React from 'react';
import productsData from '../data/products.json'; // استيراد البيانات مباشرة
import { ShoppingBag, ArrowUpLeft, Percent, Store, CheckCircle2 } from 'lucide-react';

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-[#fcfcfc] text-right pb-20" dir="rtl">
      {/* Navigation */}
      <nav className="bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200">
              <ShoppingBag className="text-white" size={22} />
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tight">رقة ستور</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">الحالة</span>
              <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                <CheckCircle2 size={12} /> متصل الآن
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <h2 className="text-4xl font-black text-gray-900 mb-2">أحدث المنتجات</h2>
        <p className="text-gray-500 font-medium">استكشف مجموعتنا المختارة بعناية لأجلك.</p>
      </header>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {productsData.map((item) => (
            <div key={item.id} className="group bg-white rounded-[2.5rem] p-4 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
              
              {/* Image Card */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gray-50">
                <img 
                  src={item.image} 
                  alt="Product" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-white/95 backdrop-blur shadow-xl px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/50">
                    <Percent className="text-orange-500" size={14} />
                    <span className="text-sm font-black text-gray-900">{item.commission}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="mt-6 px-2 pb-2">
                <div className="flex items-center gap-2 mb-3 text-gray-400">
                  <Store size={14} />
                  <span className="text-[11px] font-bold uppercase tracking-wider">متجر: {item.storeId}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-6 line-clamp-1 group-hover:text-orange-500 transition-colors">
                   منتج أناقة عصري
                </h3>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 font-black block mb-1">السعر</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-gray-900">{item.price}</span>
                      <span className="text-xs font-bold text-gray-400">ج.م</span>
                    </div>
                  </div>

                  <button className="bg-gray-900 text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-orange-500 transition-all duration-300 shadow-xl shadow-gray-100 group-hover:shadow-orange-100">
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
