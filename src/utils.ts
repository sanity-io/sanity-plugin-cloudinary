import { CloudinaryAsset } from './schema/cloudinaryAsset';
import { InsertHandlerParams } from './typings';

const widgetSrc = 'https://media-library.cloudinary.com/global/all.js';

export function assetUrl(asset: CloudinaryAsset) {
  if (asset.derived && asset.derived.length > 0) {
    const [derived] = asset.derived;
    if (derived.secure_url) {
      return derived.secure_url;
    }
    return derived.url;
  }
  if (asset.secure_url) {
    return asset.secure_url;
  }
  return asset.url;
}

export const openMediaSelector = (
  cloudName: string,
  apiKey: string,
  multiple: boolean,
  insertHandler: (params: InsertHandlerParams) => void,
  selectedAsset?: CloudinaryAsset
) => {
  loadJS(widgetSrc, () => {
    const options: Record<string, any> = {
      cloud_name: cloudName,
      api_key: apiKey,
      insert_caption: 'Select',
      multiple,
    };

    if (selectedAsset) {
      options.asset = {
        public_id: selectedAsset.public_id,
        type: selectedAsset.type,
        resource_type: selectedAsset.resource_type,
      };
    }

    window.cloudinary.openMediaLibrary(options, { insertHandler });
  });
};

export function loadJS(url: string, callback: () => void) {
  const existingScript = document.getElementById('damWidget');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = url;
    script.id = 'damWidget';
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) {
        return callback();
      }
      return true;
    };
  }
  if (existingScript && callback) {
    return callback();
  }
  return true;
}
