export type CloudinaryAssetContext = {
  custom: object;
};
  
export default {
  type: 'object',
  name: 'cloudinary.assetContext',
  fields: [
    {
      type: 'cloudinary.assetContextCustom',
      name: 'custom',
    },
  ],
};
