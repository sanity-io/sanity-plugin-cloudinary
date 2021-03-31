import React from 'react';
import PatchEvent, { unset } from 'part:@sanity/form-builder/patch-event';
import ButtonGrid from 'part:@sanity/components/buttons/button-grid';
import Button from 'part:@sanity/components/buttons/default';
import Fieldset from 'part:@sanity/components/fieldsets/default';
import SetupIcon from 'part:@sanity/base/plugin-icon';
import { Marker } from '@sanity/types';
import styled from 'styled-components';
import { CloudinaryAsset } from '../schema/cloudinaryAsset';
import AssetPreview from './AssetPreview';

const SetupButtonContainer = styled.div`
  position: relative;
  display: block;
  font-size: 0.8em;
  transform: translate(0%, -10%);
`;

type Props = {
  type: Record<string, any>;
  onChange: (patches: any) => void;
  value: CloudinaryAsset | undefined;
  level: number;
  readOnly: boolean;
  markers: Marker[];
  presence: any[];
  openMediaSelector: () => void;
  onSetup: () => void;
};

const WidgetInput = (props: Props) => {
  const removeValue = () => {
    const { onChange } = props;
    onChange(PatchEvent.from([unset()]));
  };

  const {
    value,
    type,
    markers,
    level,
    readOnly,
    presence,
    openMediaSelector,
  } = props;

  return (
    <>
      <SetupButtonContainer>
        <Button
          color="primary"
          icon={SetupIcon}
          kind="simple"
          title="Configure"
          onClick={props.onSetup}
          tabIndex={1}
        />
      </SetupButtonContainer>
      <Fieldset
        markers={markers}
        presence={presence}
        legend={type.title}
        description={type.description}
        level={level}
      >
        <div style={{ textAlign: 'center' }}>
          <AssetPreview value={value} />
        </div>

        <ButtonGrid align="start">
          <Button
            disabled={readOnly}
            inverted
            title="Select an asset"
            kind="default"
            onClick={openMediaSelector}
          >
            Select…
          </Button>
          <Button
            disabled={readOnly || !value}
            color="danger"
            inverted
            title="Remove asset"
            onClick={removeValue}
          >
            Remove
          </Button>
        </ButtonGrid>
      </Fieldset>
    </>
  );
};

export default WidgetInput;
