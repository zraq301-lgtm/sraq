import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { ShoppingBag, ExternalLink, Percent, store, ArrowUpRight, Loader2 } from 'lucide-react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/Ali_01.csv')
      .then(res => res.text())
      .then(csvData => {
        Papa.parse(csvData, {
          delimiter: "|", // الفاصل المستخدم في ملفك
          skipEmptyLines: true,
          complete: (results) => {
            // تحويل المصفوفة الناتجة إلى كائنات بناءً على ترتيب ملفك
            const mappedData = results.data.map(row => ({
              commission: row[0]?.trim(), // العمود الأول: العمولة
              price: row[1]?.trim(),      // العمود الثاني: السعر
              storeId: row[2]?.trim(),    // العمود الثالث: معرف المتجر
              image: row[3]?.trim()       // العمود الرابع: رابط الصورة
            }));
            setProducts(mappedData);
            setLoading(false);
          }
        });
      });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <Loader2 className="animate-spin text-orange-600 mb-4" size={50} />
      <p className="text-slate-600 font-medium animate-pulse">جاري تحضير المنتجات...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20" dir="rtl">
      {/* Header القسم العلوي */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 p-2 rounded-xl shadow-lg shadow-orange-200">
              <ShoppingBag className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">متجر سراق</h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-bold text-slate-700">{products.length} منتج نشط</span>
          </div>
        </div>
      </header>

      {/* Main Content محتوى المتجر */}
      <main className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index} className="group relative bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              
              {/* صورة المنتج */}
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={product.image} 
                  alt="Product" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-sm flex items-center gap-1.5 border border-white">
                    <div className="bg-orange-600 rounded-full p-1 text-white">
                      <Percent size={10} strokeWidth={4} />
                    </div>
                    <span className="text-xs font-black text-slate-800">عمولة {product.commission}</span>
                  </div>
                </div>
              </div>

              {/* تفاصيل المنتج */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <store size={14} />
                  </div>
                  <span className="text-xs font-medium text-slate-500 tracking-wide uppercase">متجر: {product.storeId}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-5 leading-snug group-hover:text-orange-600 transition-colors">
                  منتج عصري - {index + 1}
                </h3>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">السعر الحالي</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900">{product.price}</span>
                      <span className="text-sm font-bold text-slate-500">ج.م</span>
                    </div>
                  </div>
                  
                  <button className="relative overflow-hidden bg-slate-900 text-white p-4 rounded-2xl transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200 group/btn active:scale-95">
                    <ArrowUpRight className="relative z-10 group-hover/btn:rotate-45 transition-transform duration-300" size={22} />
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
