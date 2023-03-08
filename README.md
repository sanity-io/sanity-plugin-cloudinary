# sanity-plugin-cloudinary

> This is a **Sanity Studio v3** plugin.
> This combines the sanity-plugin-cloudinary AND sanity-plugin-asset-source-cloudinary plugins previously for V2,
> into a single plugin for V3.
>
> For the v2 versions of these, please refer to the 
> [v2-branch for sanity-plugin-cloudinary](https://github.com/sanity-io/sanity-plugin-cloudinary/tree/studio-v2) and
> [sanity-plugin-asset-source-cloudinary](https://github.com/sanity-io/sanity-plugin-asset-source-cloudinary).

## Installation

```
npm install --save sanity-plugin-cloudinary
```

or

```
yarn add sanity-plugin-cloudinary
```

## Usage

There are two plugins in this package:

- `cloudinaryAssetSourcePlugin` - use this if you intend to serve Cloudinary images from the Sanity CDN
- `cloudinarySchemaPlugin` - use this if you intend to serve Cloudinary images from the Cloudinary CDN

Also see notes below on how Cloudinary config should be provided.

## Cloudinary as a Sanity asset

### Add Cloudinary as an asset source to all images

```js
import {defineConfg} from 'sanity'
import {cloudinaryAssetSourcePlugin} from 'sanity-plugin-cloudinary'

export default defineConfg({
  /*...*/
  plugins: [cloudinaryAssetSourcePlugin()],
})
```

### Fine tune image sources

```js
import {defineConfg} from 'sanity'
import {cloudinaryImageSource} from 'sanity-plugin-cloudinary'

export default defineConfg({
  /*...*/
  form: {
    image: {
      assetSources: (previousAssetSources, context) => {
        if (context.currentUser?.roles.includes('cloudinaryAccess')) {
          // appends cloudinary as an asset source
          return [...previousAssetSources, cloudinaryImageSource]
        }
        if (context.currentUser?.roles.includes('onlyCloudinaryAccess')) {
          // only use clooudinary as an asset source
          return [cloudinaryImageSource]
        }
        // dont add cloudnary as an asset sources
        return previousAssetSources
      },
    },
  },
})
```

## Cloudinary assets

```js
import {defineConfg} from 'sanity'
import {cloudinarySchemaPlugin} from 'sanity-plugin-cloudinary'

export default defineConfg({
  /*...*/
  plugins: [cloudinarySchemaPlugin()],
})
```

Now you can declare a field to be `cloudinary.asset` in your schema

```javascript
    {
      type: "cloudinary.asset",
      name: "image",
      description: "This asset is served from Cloudinary",
    }
```

## Config

Includes easy configuration of your cloudname and api key, stored safely in your dataset as a private document.
<img width="919" alt="Screen Shot 2021-03-22 at 10 55 56 PM" src="https://user-images.githubusercontent.com/38528/112100069-c3eb5300-8b61-11eb-81f8-189e8fcd56b8.png">

Uses Cloudinary media library for selecting assets and transformations

<img width="1416" alt="Screen Shot 2021-03-22 at 10 33 58 PM" src="https://user-images.githubusercontent.com/38528/112098236-b41e3f80-8b5e-11eb-9ee2-aa243420cf03.png">

<img width="996" alt="Screen Shot 2021-03-22 at 10 07 52 PM" src="https://user-images.githubusercontent.com/38528/112096210-0f4e3300-8b5b-11eb-9f26-45481df878ba.png">

## In arrays

If you use this type in an array, you will have additional array functions for adding multiple assets at once, and for configuring the connection to Cloudinary.

```javascript
{
  type: "array",
  name: "cloudinaryList",
  description: "This asset is served from Cloudinary",
  of: [{ type: "cloudinary.asset" }]
}
```

<img width="571" alt="image" src="https://user-images.githubusercontent.com/835514/223700970-ee536da7-57b1-4ada-add7-57d7179f462e.png">


## Content

Here is an example of which data is stored on your document after selecting an asset.

```json
{
    "public_id": "29b4a88182b4cb50330011d23a29bcb371bd5886-2400x1344_lzcx7x",
    "resource_type": "image",
    "type": "upload",
    "format": "jpg",
    "version": 1616474653,
    "url": "http://res.cloudinary.com/dzwiku20l/image/upload/v1616474653/29b4a88182b4cb50330011d23a29bcb371bd5886-2400x1344_lzcx7x.jpg",
    "secure_url": "https://res.cloudinary.com/dzwiku20l/image/upload/v1616474653/29b4a88182b4cb50330011d23a29bcb371bd5886-2400x1344_lzcx7x.jpg",
    "width": 2400,
    "height": 1344,
    "bytes": 547710,
    "duration": null,
    "tags": [],
    "context": {
      "custom": {
        "alt": "alternative text for image"
      }
    },
    "created_at": "2021-03-23T04:44:13Z",
    "access_mode": "public",
    "_version": 1,
    "_type": "cloudinary.asset"
  }
```

Note: The `_version` in the data here refers to the schema version of this plugin, should the way it stores the data from Cloudinary change in the future.

## Transformations

You can create a transformation when selecting the asset, and this information is previewed and stored

<img width="915" alt="Screen Shot 2021-03-22 at 10 37 27 PM" src="https://user-images.githubusercontent.com/38528/112098534-30b11e00-8b5f-11eb-8a42-d4674d013148.png">

```json
{
    "public_id": "29b4a88182b4cb50330011d23a29bcb371bd5886-2400x1344_lzcx7x",
    "resource_type": "image",
    "type": "upload",
    "format": "jpg",
    "version": 1616474653,
    "url": "http://res.cloudinary.com/dzwiku20l/image/upload/v1616474653/29b4a88182b4cb50330011d23a29bcb371bd5886-2400x1344_lzcx7x.jpg",
    "secure_url": "https://res.cloudinary.com/dzwiku20l/image/upload/v1616474653/29b4a88182b4cb50330011d23a29bcb371bd5886-2400x1344_lzcx7x.jpg",
    "width": 2400,
    "height": 1344,
    "bytes": 547710,
    "duration": null,
    "tags": null,
    "context": {
      "custom": {
        "alt": "alternative text for image"
      }
    },
    "created_at": "2021-03-23T04:44:13Z",
    "derived": [
      {
        "url": "http://res.cloudinary.com/dzwiku20l/image/upload/a_45/v1616474653/29b4a88182b4cb50330011d23a29bcb371bd5886-2400x1344_lzcx7x.jpg",
        "secure_url": "https://res.cloudinary.com/dzwiku20l/image/upload/a_45/v1616474653/29b4a88182b4cb50330011d23a29bcb371bd5886-2400x1344_lzcx7x.jpg",
        "raw_transformation": "a_45"
      }
    ],
    "access_mode": "public",
    "_version": 1,
    "_type": "cloudinary.asset"
  }
```

## Video

Video assets gets a video player preview in the Studio

<img width="709" alt="Screen Shot 2021-03-22 at 10 42 04 PM" src="https://user-images.githubusercontent.com/38528/112098938-d49ac980-8b5f-11eb-8c1f-fb269ac289cf.png">

```json
{
  "public_id": "Make_it_happen_together.-WWa8qtgD0f0_nucpr9",
  "resource_type": "video",
  "type": "upload",
  "format": "mp4",
  "version": 1616474928,
  "url": "http://res.cloudinary.com/dzwiku20l/video/upload/v1616474928/Make_it_happen_together.-WWa8qtgD0f0_nucpr9.mp4",
  "secure_url": "https://res.cloudinary.com/dzwiku20l/video/upload/v1616474928/Make_it_happen_together.-WWa8qtgD0f0_nucpr9.mp4",
  "width": 1920,
  "height": 1080,
  "bytes": 3937717,
  "duration": 24.1,
  "tags": [],
  "metadata": [],
  "created_at": "2021-03-23T04:48:48Z",
  "access_mode": "public",
  "_version": 1,
  "_type": "cloudinary.asset"
}
```

## License

MIT-licensed. See LICENSE.

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.

### Release new version

Run ["CI & Release" workflow](https://github.com/sanity-io/sanity-plugin-cloudinary/actions/workflows/main.yml).
Make sure to select the main branch and check "Release new version".

Semantic release will only release on configured branches, so it is safe to run release on any branch.

