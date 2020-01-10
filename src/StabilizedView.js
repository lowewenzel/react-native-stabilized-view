import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import lpf from 'lpf';

// Sensor data interval
setUpdateIntervalForType(SensorTypes.gyroscope, 300);

// Low Pass filter needs to be initialized to stabilize data around 0,0
lpf.init([0, 0, 0, 0, 0]);

const styles = StyleSheet.create({
  root: {
    display: 'flex',
  },

  // root: {
  //   width: '100%',
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  // },
  text: {
    textAlign: 'center',
  },
});

const StabilizedView = ({
  viewWidth = '100%',
  viewHeight = '100%',
  children,
}) => {
  const [position, setPosition] = useState({x: 0, y: 0});

  useEffect(() => {
    gyroscope.subscribe(({x, y, z}) => {
      setPosition({x: position.x + lpf.next(x), y: position.y + lpf.next(y)});
    });
    // accelerometer.subscribe(({x, y}) =>
    //   setPosition({x: lpf.next(x) - resetPos.x, y: lpf.next(y) - resetPos.y}),
    // );

    return () => {};
  }, []);

  return (
    <View style={[styles.root, {width: viewWidth, height: viewHeight}]}>
      {children}
      {/* <Text>x: {position.x.toFixed(2)}</Text> */}
      {/* <Text>y: {position.y.toFixed(2)}</Text> */}
      {/* <View
        style={[
          styles.root,
          {
            transform: [
              {translateX: position.x * 10},
              {translateY: position.y * 10},
            ],
          },
        ]}>
        <Text style={styles.text}>
          You can use the acceleration values from the accelerometer to measure
          the velocity and distance. There is really good paper (Implementing
          Positioning Algorithms Using Accelerometers) which explains the errors
          you get from the accelerometer and the techniques to get the velocity
          and position from the acceleration values.
        </Text>
      </View> */}
    </View>
  );
};

export default StabilizedView;
