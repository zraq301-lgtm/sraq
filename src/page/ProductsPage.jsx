import React from 'react';
// التأكد من استيراد البيانات من المسار الصحيح
import productsData from '../data/products.json';
import { ShoppingBag, Star, ShoppingCart } from 'lucide-react';

const ProductsPage = () => {
  // دالة لمعالجة روابط الصور وضمان ظهورها
  const getCleanImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/400?text=No+Image";
    let link = url.trim();
    if (link.startsWith('//')) link = 'https:' + link;
    return link;
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-right pb-20 font-sans" dir="rtl">
      <style>{`
        .main-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
          gap: 25px;
        }
        @media (max-width: 640px) {
          .products-grid {
            grid-template-columns: repeat(1, 1fr);
          }
        }
        .clean-transparent-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 28px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .clean-transparent-card:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(249, 115, 22, 0.5);
          transform: translateY(-10px);
        }
        .fixed-img-container {
          width: 100%;
          height: 250px;
          background: white;
          position: relative;
          overflow: hidden;
        }
        .fixed-img-container img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 15px;
          transition: transform 0.5s ease;
        }
        .clean-transparent-card:hover .fixed-img-container img {
          transform: scale(1.05);
        }
        .title-style {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 3.2rem;
          line-height: 1.6rem;
          font-weight: 700;
          color: #f1f5f9;
          margin: 10px 0;
        }
      `}</style>

      {/* Navbar */}
      <nav className="border-b border-white/10 bg-[#0f172a]/80 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <ShoppingBag className="text-white" size={22} />
            </div>
            <h1 className="text-xl font-black text-white">رقة ستور</h1>
          </div>
          <div className="hidden sm:block">
             <span className="text-gray-400 text-sm ml-2">إجمالي المنتجات:</span>
             <span className="text-orange-500 font-bold">{productsData.length}</span>
          </div>
        </div>
      </nav>

      <main className="main-container mt-8">
        <header className="mb-10">
          <h2 className="text-3xl font-black text-white mb-2">أحدث العروض</h2>
          <div className="h-1 w-20 bg-orange-500 rounded-full"></div>
        </header>

        <div className="products-grid">
          {productsData.map((item) => (
            <div key={item.id} className="clean-transparent-card group">
              
              {/* Image Section */}
              <div className="fixed-img-container">
                <img 
                  src={getCleanImageUrl(item.picture)} 
                  alt={item.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://via.placeholder.com/400?text=Image+Not+Found";
                  }}
                />
                {item.category && (
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10">
                    {item.category}
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-yellow-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>

                  <h3 className="title-style text-base" title={item.name}>
                    {item.name}
                  </h3>
                </div>

                <div className="mt-4 flex items-end justify-between border-t border-white/5 pt-4">
                  <div>
                    <p className="text-gray-500 text-[10px] mb-1 font-bold">السعر الحالي</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-white">{item.price}</span>
                      <span className="text-xs font-bold text-orange-500 uppercase">{item.currencyId}</span>
                    </div>
                  </div>

                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg shadow-orange-500/20 active:scale-95"
                  >
                    <ShoppingCart size={20} />
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
