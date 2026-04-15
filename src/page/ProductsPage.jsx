import React from 'react';
import productsData from '../data/products.json';
import { ShoppingBag, Star, ExternalLink, Box } from 'lucide-react';

const ProductsPage = () => {
  // دالة متطورة لإصلاح روابط الصور المكسورة في AliExpress
  const fixImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/300?text=No+Image";
    // إزالة أي مسافات أو رموز غريبة وإضافة البروتوكول
    let cleanedUrl = url.trim();
    if (cleanedUrl.startsWith('//')) {
      cleanedUrl = 'https:' + cleanedUrl;
    } else if (!cleanedUrl.startsWith('http')) {
      cleanedUrl = 'https://' + cleanedUrl;
    }
    return cleanedUrl;
  };

  return (
    <div className="min-h-screen bg-fixed text-right pb-12 font-sans" dir="rtl" 
         style={{ 
           backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // خلفية ملونة لإظهار تأثير الزجاج
           minHeight: '100vh' 
         }}>
      
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 24px;
          transition: all 0.3s ease;
        }
        .glass-card:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-5px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          padding: 15px;
        }
        @media (min-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 25px;
          }
        }
        .img-container {
          width: 100%;
          aspect-ratio: 1/1;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .img-container img {
          width: 100%;
          height: 100%;
          object-fit: contain; /* لضمان عدم قص أجزاء المنتج */
        }
        .title-line {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 2.6rem;
          color: white;
          font-weight: bold;
          font-size: 0.85rem;
          margin-top: 10px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }
      `}</style>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 p-4">
        <div className="max-w-7xl mx-auto glass-card py-3 px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <ShoppingBag className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-black text-white">رقة ستور</h1>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full border border-white/30">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-white">متصل الآن</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto mt-6 px-4">
        <div className="product-grid">
          {productsData.map((item) => (
            <div key={item.id} className="glass-card p-3 flex flex-col h-full">
              
              {/* Image Section */}
              <div className="img-container shadow-inner">
                <img 
                  src={fixImageUrl(item.image_url)} 
                  alt={item.name}
                  onError={(e) => { e.target.src = "https://via.placeholder.com/300?text=Image+Error"; }}
                />
              </div>

              {/* Content Section */}
              <div className="flex flex-col flex-grow mt-3">
                <div className="flex justify-between items-center">
                  <span className="bg-white/30 text-white text-[9px] px-2 py-0.5 rounded-md font-bold backdrop-blur-sm border border-white/20">
                    {item.category}
                  </span>
                  <div className="flex text-yellow-300">
                    <Star size={10} fill="currentColor" />
                    <Star size={10} fill="currentColor" />
                    <Star size={10} fill="currentColor" />
                  </div>
                </div>

                <h3 className="title-line">
                  {item.name}
                </h3>

                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-white">
                    <span className="text-[10px] opacity-70 block mb-0.5">السعر</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black">{item.price}</span>
                      <span className="text-[10px] font-medium opacity-80">{item.currency}</span>
                    </div>
                  </div>

                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white text-indigo-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
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
