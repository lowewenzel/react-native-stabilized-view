# React Native Stabilized View

`react-native-stabilized-view` is a custom `<View/>` wrapper for [React Native](https://github.com/facebook/react-native). The view is stabilized to counter shakes and accelerometer movements for accessibility.

## Installation

With **npm** or **yarn**:

```
npm install react-native-stabilized-view
yarn install react-native-stabilized-view
```

then run to install sensor library:

```
npx react-native link
or
react-native link
```

## Usage

```React
import StabilizedView from 'react-native-stabilized-view';

...
...

return (
  <>
    <StabilizedView
      viewWidth={'100%'}
      viewHeight={300}
    >
      <Text>This text is now stabilized!</Text>
    </StabilizedView>
  </>
)
```

### API/props

| **prop**              | **type**             | default |
| --------------------- | -------------------- | ------- |
| `viewWidth`           | `string` or `number` | '100%'  |
| `viewHeight`          | `string` or `number` | '100%'  |
| `containerStyle`      | style Object         | -       |
| `updateInterval`      | `number`             | 100     |
| `translateMultiplier` | `number`             | 50      |
| `children`            | React component      | -       |

## Contributing

This is still very much a work in progress.

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
