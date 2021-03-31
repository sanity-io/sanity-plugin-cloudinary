export default {
  type: 'object',
  name: 'cloudinary',
  fields: [
    {
      type: 'array',
      name: 'assets',
      of: [{ type: 'cloudinary.asset' }],
    },
  ],
};
