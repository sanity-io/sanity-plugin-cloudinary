import React from 'react';
import WidgetInput from './WidgetInput';
import { loadJS } from '../utils';
import pluginConfig from 'config:cloudinary';
import PatchEvent, { set } from 'part:@sanity/form-builder/patch-event';
import { CloudinaryAssetResponse } from '../typings';
import { CloudinaryAsset } from '../schema/cloudinaryAsset';

type Props = {
  type: Record<string, any>;
  onChange: (patches: any) => void;
  value: CloudinaryAsset;
  level: number;
  readOnly: boolean;
  markers: any;
  presence: any[];
};

type InsertHandlerParams = {
  assets: CloudinaryAssetResponse[];
};

const CloudinaryInput = (props: Props) => {
  const handleSelect = ({ assets }: InsertHandlerParams) => {
    const [asset] = assets;
    if (!asset) {
      return;
    }

    const { onChange } = props;
    onChange(
      PatchEvent.from([
        set(
          Object.assign({}, asset, {
            _type: props.type.name,
            _version: 1,
          })
        ),
      ])
    );
  };

  const url = 'https://media-library.cloudinary.com/global/all.js';
  const openMediaSelector = () => {
    loadJS(url, () => {
      const options: Record<string, any> = {
        cloud_name: pluginConfig.cloudName,
        api_key: pluginConfig.apiKey,
        insert_caption: 'Select',
        multiple: false,
        max_files: 1,
      };

      if (props.value) {
        options.asset = {
          public_id: props.value.public_id,
          type: props.value.type,
          resource_type: props.value.resource_type,
        };
      }

      window.cloudinary.openMediaLibrary(options, {
        insertHandler: handleSelect,
      });
    });
  };

  return <WidgetInput {...props} openMediaSelector={openMediaSelector} />;
};

export default CloudinaryInput;
