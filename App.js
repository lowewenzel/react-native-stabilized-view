import React from 'react';
import {StatusBar, View, Text, SafeAreaView} from 'react-native';

import StabilizedView from './src/StabilizedView';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <StabilizedView />
      </SafeAreaView>
    </>
  );
};

export default App;
