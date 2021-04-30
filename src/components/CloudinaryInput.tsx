import React, { useState } from 'react';
import WidgetInput from './WidgetInput';
import { nanoid } from 'nanoid';
import PatchEvent, { set } from 'part:@sanity/form-builder/patch-event';
import { CloudinaryAsset } from '../schema/cloudinaryAsset';
import { useSecrets } from 'sanity-secrets';
import { InsertHandlerParams } from '../typings';
import { openMediaSelector } from '../utils';
import SecretsConfigView, { Secrets, namespace } from './SecretsConfigView';

type Props = {
  type: Record<string, any>;
  onChange: (patches: any) => void;
  value: CloudinaryAsset;
  level: number;
  readOnly: boolean;
  markers: any;
  presence: any[];
};

const CloudinaryInput = (props: Props) => {
  const [showSettings, setShowSettings] = useState(false);
  const { secrets } = useSecrets<Secrets>(namespace);

  const handleSelect = (payload: InsertHandlerParams) => {
    const [asset] = payload.assets;
    if (!asset) {
      return;
    }

    const { onChange, type } = props;
    const value = props.value || {};
    onChange(
      PatchEvent.from([
        set(
          Object.assign(
            {
              _type: type.name,
              _version: 1,
              ...(value._key ? { _key: value._key } : { _key: nanoid() }),
            },
            asset
          )
        ),
      ])
    );
  };

  const action = secrets
    ? () =>
        openMediaSelector(
          secrets.cloudName,
          secrets.apiKey,
          false, // single selection
          handleSelect,
          props.value
        )
    : () => setShowSettings(true);

  return (
    <>
      {showSettings && (
        <SecretsConfigView onClose={() => setShowSettings(false)} />
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
