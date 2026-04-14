import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NextStudio } from 'sanity/studio';
import sanityConfig from '../sanity.config'; // الملف اللي عملناه الخطوة اللي فاتت
import StoreFront from './components/StoreFront'; // هننقل كود المتجر القديم هنا

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* رابط لوحة التحكم */}
        <Route
          path="/studio/*"
          element={<NextStudio config={sanityConfig} />}
        />
        {/* رابط المتجر الرئيسي */}
        <Route path="/" element={<StoreFront />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
