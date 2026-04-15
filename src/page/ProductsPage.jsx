import React from 'react';
import productsData from '../data/products.json';
import { ShoppingBag, Star, ArrowUpLeft, Tag, ShoppingCart } from 'lucide-react';

const ProductsPage = () => {
  // دالة متطورة لضمان عمل صور AliExpress
  const getCleanImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/400?text=No+Image";
    let link = url.trim();
    // إذا كان الرابط يبدأ بـ // أضف https:
    if (link.startsWith('//')) link = 'https:' + link;
    // التأكد من أن الرابط لا يحتوي على مسافات زائدة
    return link;
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-right pb-20 font-sans" dir="rtl">
      {/* CSS مخصص لضبط عرض الكروت وحجم الصور */}
      <style>{`
        .main-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
        }
        .products-grid {
          display: grid;
          /* جعل الكروت عريضة وواضحة */
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
          gap: 25px;
        }
        @media (max-width: 640px) {
          .products-grid {
            grid-template-columns: repeat(1, 1fr); /* كارد واحد عريض جداً في الموبايل */
          }
        }
        .clean-transparent-card {
          background: rgba(255, 255, 255, 0.03); /* شفافية نقية بدون ضباب */
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 28px;
          transition: all 0.4s ease;
          overflow: hidden;
        }
        .clean-transparent-card:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(249, 115, 22, 0.4);
          transform: translateY(-10px);
        }
        .fixed-img-container {
          width: 100%;
          height: 280px; /* زيادة حجم الصورة */
          background: #f8fafc;
          position: relative;
        }
        .fixed-img-container img {
          width: 100%;
          height: 100%;
          object-fit: contain; /* عرض المنتج كاملاً دون قص */
          padding: 10px;
        }
        .title-style {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 3rem;
          line-height: 1.5rem;
          font-weight: 800;
          color: #f1f5f9;
          margin: 15px 0;
        }
      `}</style>

      {/* Navbar */}
      <nav className="border-b border-white/10 bg-[#0f172a]/80 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <ShoppingBag className="text-white" size={26} />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">رقة ستور</h1>
          </div>
          <div className="bg-orange-500/10 text-orange-400 px-4 py-2 rounded-full border border-orange-500/20 text-sm font-bold">
             متاح للطلب الآن
          </div>
        </div>
      </nav>

      <main className="main-container">
        <header className="mb-12">
          <h2 className="text-4xl font-black text-white mb-3">قائمة المنتجات</h2>
          <div className="h-1.5 w-24 bg-orange-500 rounded-full"></div>
        </header>

        <div className="products-grid">
          {productsData.map((item) => (
            <div key={item.id} className="clean-transparent-card group">
              
              {/* Image Section */}
              <div className="fixed-img-container">
                <img 
                  src={getCleanImageUrl(item.image_url)} 
                  alt={item.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://via.placeholder.com/400?text=Image+Not+Found";
                  }}
                />
                <div className="absolute bottom-4 right-4 bg-orange-500 text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-lg">
                  {item.category}
                </div>
              </div>

              {/* Body Section */}
              <div className="p-6">
                <div className="flex items-center gap-1 text-yellow-500 mb-2">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <span className="text-gray-400 text-xs mr-2">(5.0)</span>
                </div>

                <h3 className="title-style text-lg">
                  {item.name}
                </h3>

                <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/5">
                  <div>
                    <span className="text-gray-400 text-[11px] font-bold block mb-1">السعر الحصري</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white">{item.price}</span>
                      <span className="text-sm font-bold text-orange-500">{item.currency}</span>
                    </div>
                  </div>

                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-white hover:bg-orange-500 text-black hover:text-white rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl group-hover:scale-110"
                  >
                    <ShoppingCart size={24} />
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
