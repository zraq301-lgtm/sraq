export default {
  name: 'product',
  title: 'المنتجات',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'اسم المنتج',
      type: 'string',
    },
    {
      name: 'price',
      title: 'السعر',
      type: 'number',
    },
    {
      name: 'description',
      title: 'وصف المنتج',
      type: 'text',
    },
    {
      name: 'image',
      title: 'صورة المنتج',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'category',
      title: 'القسم',
      type: 'string',
    }
  ]
}
