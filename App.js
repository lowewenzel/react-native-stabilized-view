/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StatusBar,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const yoda =
  'data:image/jpeg;base64,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';

import StabilizedView from './src/StabilizedView';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    paddingBottom: 100,
  },

  stabilized: {
    width: '70%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttons: {
    width: '100%',
    height: 100,
    backgroundColor: '#eee',
    margin: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: '45%',
    height: '100%',
    justifyContent: 'center',
  },

  text: {
    textAlign: 'center',
    fontSize: 32,
  },
});

const App = () => {
  const [isStabilized, setStabilized] = useState(false);
  const [isImage, setIsImage] = useState(false);

  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.root}>
        {isStabilized ? (
          <StabilizedView
            containerStyle={styles.stabilized}
            updateInterval={5}
            translateMultiplier={50}>
            {isImage ? (
              <TouchableOpacity
                onPress={() => setIsImage(false)}
                style={{
                  width: '100%',
                  height: '37%',
                }}>
                <Image
                  source={{uri: yoda}}
                  style={{height: '100%', width: '100%'}}
                />
              </TouchableOpacity>
            ) : (
              <Text style={styles.text} onPress={() => setIsImage(true)}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                do eiusmod tempor incididunt ut labore et dolore magna aliqua
              </Text>
            )}
          </StabilizedView>
        ) : (
          <View style={styles.stabilized}>
            {isImage ? (
              <TouchableOpacity
                onPress={() => setIsImage(false)}
                style={{
                  width: '100%',
                  height: '37%',
                }}>
                <Image
                  source={{uri: yoda}}
                  style={{height: '100%', width: '100%'}}
                />
              </TouchableOpacity>
            ) : (
              <Text style={styles.text} onPress={() => setIsImage(true)}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                do eiusmod tempor incididunt ut labore et dolore magna aliqua
              </Text>
            )}
          </View>
        )}
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setStabilized(false)}>
            <Text
              style={{
                textAlign: 'center',
                textAlignVertical: 'center',
                fontWeight: isStabilized ? 'normal' : 'bold',
              }}>
              Normal
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setStabilized(true)}>
            <Text
              style={{
                textAlign: 'center',
                textAlignVertical: 'center',
                fontWeight: !isStabilized ? 'normal' : 'bold',
              }}>
              Stabilized
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default App;
