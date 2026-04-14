import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { importTools } from 'sanity-plugin-import-tools'; // الأداة اللي هنرفع منها الملف

export default defineConfig({
  name: 'default',
  title: 'Raqqa Store Admin',

  projectId: '4gsl11lz', // كود مشروعك
  dataset: 'production',
  basePath: '/studio', // هذا السطر هو اللي بيخلي الرابط يشتغل

  plugins: [
    deskTool(),
    importTools(), // تفعيل زر الرفع
  ],

  schema: {
    types: [
      {
        name: 'product',
        title: 'المنتجات',
        type: 'document',
        fields: [
          { name: 'title', type: 'string', title: 'الاسم' },
          { name: 'price', type: 'number', title: 'السعر' },
          { name: 'description', type: 'text', title: 'الوصف' },
          { name: 'image', type: 'image', title: 'الصورة' },
        ],
      },
    ],
  },
});
