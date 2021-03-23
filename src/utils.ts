import { CloudinaryAsset } from './schema/cloudinaryAsset';

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
