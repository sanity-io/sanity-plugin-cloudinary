export type CloudinaryAssetContextCustom = {
  alt: string;
  caption: string;
};

export default {
  type: 'object',
  name: 'cloudinary.assetContextCustom',
  fields: [
    {
      type: 'string',
      name: 'alt',
    },
    {
      type: 'string',
      name: 'caption',
    },
  ],
};
