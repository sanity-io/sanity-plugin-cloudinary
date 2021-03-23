export type CloudinaryAssetDerived = {
  raw_transformation: string;
  url: string;
  secure_url: string;
};

export default {
  type: 'object',
  name: 'cloudinary.assetDerived',
  fields: [
    {
      type: 'string',
      name: 'raw_transformation',
    },
    {
      type: 'url',
      name: 'url',
    },
    {
      type: 'url',
      name: 'secure_url',
    },
  ],
};
