/*
        <RatioBox ratio={3 / 2} padding={1}>
          <Flex align="center" justify="center">
            {value && renderAsset()}
            {!value && renderPlaceholder()}
          </Flex>
        </RatioBox>
        */
import React from 'react';
import PatchEvent, { unset } from 'part:@sanity/form-builder/patch-event';
import { Button, Grid, Text, Flex } from '@sanity/ui';
import { FormFieldSet } from '@sanity/base/components';
import { Marker } from '@sanity/types';
import styled from 'styled-components';
import { CloudinaryAsset } from '../schema/cloudinaryAsset';
import AssetPreview from './AssetPreview';
import { SearchIcon, TrashIcon, ControlsIcon } from '@sanity/icons';
import { RatioBox } from './RatioBox';

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

  const renderAsset = () => <AssetPreview value={value} />;

  const renderPlaceholder = () => {
    return readOnly ? (
      <Text align="center" muted>
        This field is read-only
      </Text>
    ) : (
      <Text align="center" muted>
        No asset selected
      </Text>
    );
  };

  return (
    <>
      <Button
        mode="ghost"
        icon={ControlsIcon}
        kind="simple"
        title="Configure"
        onClick={props.onSetup}
        tabIndex={1}
      />
      <FormFieldSet
        __unstable_markers={markers}
        __unstable_presence={presence}
        title={type.title}
        description={type.description}
        level={level - 1}
        __unstable_changeIndicator={false}
      >
        <div
          style={{
            width: '100%',
            height: '0',
            paddingBottom: '56.25%',
          }}
        >
          {value && renderAsset()}
          {!value && renderPlaceholder()}
        </div>

        <Grid
          gap={1}
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(10px, 1fr))',
          }}
        >
          <Button
            disabled={readOnly}
            mode="ghost"
            text="Select…"
            icon={SearchIcon}
            onClick={openMediaSelector}
          />
          {value && !readOnly && (
            <Button
              tone="critical"
              mode="ghost"
              icon={TrashIcon}
              onClick={removeValue}
              text="Remove"
            />
          )}
        </Grid>
      </FormFieldSet>
    </>
  );
};

export default WidgetInput;
