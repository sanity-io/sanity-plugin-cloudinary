import React, { useState } from 'react';
import WidgetInput from './WidgetInput';
import { loadJS } from '../utils';
import PatchEvent, { set } from 'part:@sanity/form-builder/patch-event';
import { CloudinaryAssetResponse } from '../typings';
import { CloudinaryAsset } from '../schema/cloudinaryAsset';
import { useSecrets, SettingsView } from 'sanity-secrets';

const widgetSrc = 'https://media-library.cloudinary.com/global/all.js';

type Props = {
  type: Record<string, any>;
  onChange: (patches: any) => void;
  value: CloudinaryAsset;
  level: number;
  readOnly: boolean;
  markers: any;
  presence: any[];
};

type Secrets = {
  cloudName: string;
  apiKey: string;
};

const pluginConfigKeys = [
  {
    key: 'cloudName',
    title: 'Cloud name',
    description: '',
  },
  {
    key: 'apiKey',
    title: 'API key',
    description: '',
  },
];

type InsertHandlerParams = {
  assets: CloudinaryAssetResponse[];
};

const CloudinaryInput = (props: Props) => {
  const namespace = 'cloudinary';
  const [showSettings, setShowSettings] = useState(false);
  const { secrets } = useSecrets<Secrets>(namespace);

  const handleSelect = ({ assets }: InsertHandlerParams) => {
    const [asset] = assets;
    if (!asset) {
      return;
    }

    const { onChange } = props;
    onChange(
      PatchEvent.from([
        set(
          Object.assign(props.value || {}, asset, {
            _type: props.type.name,
            _version: 1,
          })
        ),
      ])
    );
  };

  const openMediaSelector = (cloudName: string, apiKey: string) => {
    loadJS(widgetSrc, () => {
      const options: Record<string, any> = {
        cloud_name: cloudName,
        api_key: apiKey,
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

  const action = secrets
    ? () => openMediaSelector(secrets.cloudName, secrets.apiKey)
    : () => setShowSettings(true);

  return (
    <>
      {showSettings && (
        <SettingsView
          title="Cloudinary config"
          namespace={namespace}
          keys={pluginConfigKeys}
          onClose={() => {
            setShowSettings(false);
          }}
        />
      )}
      <WidgetInput
        onSetup={() => setShowSettings(true)}
        openMediaSelector={action}
        {...props}
      />
    </>
  );
};

export default CloudinaryInput;
