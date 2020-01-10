import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import lpf from 'lpf';

// Sensor data interval

// Low Pass filter needs to be initialized to stabilize data around 0,0
lpf.init([0, 0, 0, 0, 0]);

const styles = StyleSheet.create({
  root: {
    display: 'flex',
  },

  text: {
    textAlign: 'center',
  },
});

const StabilizedView = ({
  viewWidth = '100%',
  viewHeight = '100%',
  children,
  containerStyle,
  updateInterval = 100,
  translateMultiplier = 50,
}) => {
  const [position, setPosition] = useState({x: 0, y: 0});

  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.accelerometer, updateInterval);

    accelerometer.subscribe(({x, y, z}) => {
      setPosition({x: position.x + lpf.next(x), y: position.y + lpf.next(y)});
    });
    // accelerometer.subscribe(({x, y}) =>
    //   setPosition({x: lpf.next(x) - resetPos.x, y: lpf.next(y) - resetPos.y}),
    // );

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View
      style={[
        styles.root,
        {
          width: viewWidth,
          height: viewHeight,
          transform: [
            {translateX: -position.x * translateMultiplier},
            {translateY: position.y * translateMultiplier},
          ],
        },
        containerStyle,
      ]}>
      {children}
    </View>
  );
};

export default StabilizedView;
