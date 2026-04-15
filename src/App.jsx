import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductsPage from './page/ProductsPage'; // استيراد الصفحة من المسار الذي حددته

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* تحويل المسار الرئيسي تلقائياً إلى صفحة المنتجات */}
          <Route path="/" element={<Navigate to="/products" />} />
          
          {/* مسار صفحة المنتجات */}
          <Route path="/products" element={<ProductsPage />} />

          {/* يمكنك إضافة مسارات أخرى هنا لاحقاً */}
          {/* <Route path="/about" element={<AboutPage />} /> */}
          
          {/* صفحة الخطأ 404 في حال كتابة مسار غير موجود */}
          <Route path="*" element={
            <div className="flex h-screen items-center justify-center font-bold text-gray-500">
              404 - الصفحة غير موجودة
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
