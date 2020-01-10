import React from 'react';
import {StatusBar, View, Text, SafeAreaView} from 'react-native';

import StabilizedView from './src/StabilizedView';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <StabilizedView>
          <Text>Yo yo yo </Text>
        </StabilizedView>
      </SafeAreaView>
    </>
  );
};

export default App;
