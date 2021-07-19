# react-native-sprite-sheet
Use sprite sheet to display image and animation.

## Usage

### Installation

```shell
yarn add react-native-sprite-sheet
```

> or `npm i react-native-sprite-sheet`

### Example

```react
import SpriteImage from 'react-native-sprite-sheet'

const Icon = () => (
  <SpriteImage
    source={require('./icon.png')}
    data={require('./icon.json')}
    name='success'
    style={{ width: 20, height: 20}}
  />
)

export default Icon
```

## Make Sprite Sheet

1. Use [TexturePacker](https://www.codeandweb.com/texturepacker)  to package images and output JSON data.

   ![image-20210718161715897](https://raw.githubusercontent.com/anandzhang/react-native-sprite-sheet/main/screenshots/make_sprite_sheet.png)

2. Use scripts to format JSON data.

   ```shell
   yarn react-native-sprite-sheet icon.json
   ```

   > or `node_modules/.bin/react-native-sprite-sheet icon.json`

