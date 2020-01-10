import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import {map, filter} from 'rxjs/operators';

import lpf from 'lpf';

setUpdateIntervalForType(SensorTypes.accelerometer, 1);
lpf.init([0, 0, 0, 0, 0]);

const styles = StyleSheet.create({
  root: {
    height: 400,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

const StabilizedView = ({}) => {
  const [position, setPosition] = useState({x: 0, y: 0});
  const [resetPos, setResetPos] = useState({x: 0, y: 0});

  useEffect(() => {
    accelerometer
      .pipe(
        map(({x, y, z}) => x + y + z),
        filter(speed => speed > 0),
      )
      .subscribe(speed => {
        console.log(speed);
        setPosition({x: lpf.next(speed)});
      });
    // accelerometer.subscribe(({x, y}) =>
    //   setPosition({x: lpf.next(x) - resetPos.x, y: lpf.next(y) - resetPos.y}),
    // );

    return () => {};
  }, []);

  return (
    <View style={{display: 'flex', flexDirection: 'column'}}>
      <Text>x: {position.x}</Text>
      <Text>y: {position.y}</Text>
      <View
        style={[
          styles.root,
          {
            transform: [
              {rotateY: `${position.x * 100}deg`},
              {rotateX: `${position.y * 100}deg`},
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
      </View>
      <View style={{backgroundColor: '#333'}}>
        <TouchableOpacity
          style={{width: '100%', height: 30}}
          onPress={() => {
            setResetPos({x: position.x, y: position.y});
          }}>
          <Text style={{color: 'white'}}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StabilizedView;
