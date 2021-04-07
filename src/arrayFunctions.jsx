import React from 'react';
import Button from 'part:@sanity/components/buttons/default';
import PatchEvent, {
  setIfMissing,
  insert,
} from 'part:@sanity/form-builder/patch-event';
import DefaultArrayFunctions from 'part:@sanity/form-builder/input/array/functions-default';

import { useSecrets } from 'sanity-secrets';
import SecretsConfigView, { namespace } from './components/SecretsConfigView';
import cloudinaryAsset from './schema/cloudinaryAsset';
import { openMediaSelector } from './utils';

const AssetListFunctions = props => {
  const { secrets, loading } = useSecrets(namespace);
  const [showSettings, setShowSettings] = React.useState(false);

  const cloudinaryType = props.type.of.find(
    t => t.name === cloudinaryAsset.name
  );

  const handleSelect = selected => {
    const { onCreateValue, onChange } = props;
    const items = selected.assets.map(asset =>
      Object.assign(
        {},
        asset,
        {
          // Schema version. In case we ever change our schema.
          _version: 1,
        },
        onCreateValue(cloudinaryType)
      )
    );
    onChange(PatchEvent.from(setIfMissing([]), insert(items, 'after', [-1])));
  };

  const actions = (
    <>
      <Button
        enabled={props.readOnly !== true && !loading}
        inverted
        onClick={() => {
          openMediaSelector(
            secrets.cloudName,
            secrets.apiKey,
            true, // multi-selection
            handleSelect
          );
        }}
      >
        Add multiple
      </Button>
      <Button onClick={() => setShowSettings(true)}>Configure</Button>
    </>
  );

  return (
    <>
      {showSettings && (
        <SecretsConfigView onClose={() => setShowSettings(false)} />
      )}
      <DefaultArrayFunctions {...props}>
        {cloudinaryType && actions}
      </DefaultArrayFunctions>
    </>
  );
};

export default AssetListFunctions;
