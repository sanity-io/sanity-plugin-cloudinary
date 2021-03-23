import * as React from 'react';

declare module '*.css' {
  const content: { [className: string]: CSSProperties };
  export default content;
}

export type CloudinaryDerivative = {
  url: string;
  secure_url: string;
  raw_transformation: string;
};

export type CloudinaryAssetResponse = {
  public_id: string;
  resource_type: string;
  type: string;
  url: string;
  tags: string[];
  secure_url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  derived?: CloudinaryDerivative[];
};

declare module 'part:@sanity/components/buttons/default' {
  interface Props {
    color?: string;
    children?: any;
    onClick?: any;
    inverted?: boolean;
    disabled?: boolean;
    title?: string;
    kind?: 'default' | 'simple';
  }
  export default class DefaultButton extends React.Component<Props, any> {}
}

declare module 'part:@sanity/components/buttons/button-grid' {
  interface Props {
    align?: string;
  }
  export default class ButtonGrid extends React.Component<Props, any> {}
}

declare module 'part:@sanity/components/fieldsets/default' {
  const shim: any;
  export default shim;
}
