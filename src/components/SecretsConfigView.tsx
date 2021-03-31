import React from 'react';
import { SettingsView } from 'sanity-secrets';

export type Secrets = {
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

export const namespace = 'cloudinary';

type Props = {
  onClose: () => void;
};

const SecretsConfigView = (props: Props) => {
  return (
    <SettingsView
      title="Cloudinary config"
      namespace={namespace}
      keys={pluginConfigKeys}
      onClose={props.onClose}
    />
  );
};

export default SecretsConfigView;
