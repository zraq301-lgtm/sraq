import React from 'react';
import productsData from '../data/products.json';
import { ShoppingBag, Star, ExternalLink, Tag } from 'lucide-react';

const ProductsPage = () => {
  // دالة للتأكد من أن رابط الصورة يعمل بشكل صحيح
  const formatImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/300"; // صورة بديلة في حال عدم وجود رابط
    if (url.startsWith('//')) return `https:${url}`; // إذا كان الرابط يبدأ بـ // أضف https:
    return url;
  };

  return (
    <div className="min-h-screen bg-[#f4f7f9] pb-12 font-sans" dir="rtl">
      {/* تنسيق CSS صارم لتوحيد الأحجام ومنع التمدد الخاطئ */}
      <style>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr); /* عمودين في الموبايل */
          gap: 12px;
          padding: 12px;
        }
        @media (min-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); /* توزيع تلقائي في الشاشات الكبيرة */
            gap: 20px;
          }
        }
        .image-box {
          width: 100%;
          aspect-ratio: 1 / 1; /* جعل الصورة مربعة تماماً */
          overflow: hidden;
          background-color: #fff;
        }
        .image-box img {
          width: 100%;
          height: 100%;
          object-fit: contain; /* عرض المنتج بالكامل داخل المربع دون قص أو تمطيط */
        }
        .title-clamp {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 2.5rem; /* توحيد ارتفاع النص */
          font-size: 0.8rem;
          line-height: 1.25rem;
          font-weight: 700;
          margin: 8px 0;
        }
      `}</style>

      {/* Header */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 px-4 py-3 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <ShoppingBag className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-black text-gray-800">رقة ستور</h1>
          </div>
          <div className="bg-green-50 px-3 py-1 rounded-full flex items-center gap-2 border border-green-100">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold text-green-700">متصل الآن</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto mt-4">
        <div className="product-grid">
          {productsData.map((item) => (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
              
              {/* قسم الصورة */}
              <div className="image-box relative p-2 border-b border-gray-50">
                <img 
                  src={formatImageUrl(item.image_url)} 
                  alt={item.name} 
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-orange-500 text-white text-[8px] px-2 py-0.5 rounded font-bold uppercase">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* تفاصيل المنتج */}
              <div className="p-3 flex flex-col flex-grow">
                {/* تقييم افتراضي */}
                <div className="flex items-center gap-1 mb-1 text-yellow-400">
                   {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                </div>

                {/* الاسم من ملف JSON */}
                <h3 className="title-clamp text-gray-800 text-right">
                  {item.name}
                </h3>

                {/* السعر والزر */}
                <div className="mt-auto pt-2 border-t border-gray-50 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-gray-400 block font-bold">السعر</span>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-lg font-black text-gray-900">{item.price}</span>
                      <span className="text-[10px] font-bold text-gray-500">{item.currency}</span>
                    </div>
                  </div>

                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-900 hover:bg-orange-600 text-white p-2 rounded-lg transition-all"
                  >
                    <ExternalLink size={16} />
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
