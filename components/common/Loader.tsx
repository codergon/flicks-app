import {
  Easing,
  Animated,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useRef} from 'react';
import AppLogo from './AppLogo';
import {View} from '../ui/themed';
import {Text} from '../ui/typography';
import useColorScheme from '@hooks/useColorScheme';

const Loader = ({
  pb = 0,
  size = 170,
  message = '',
  nextline = '',
  spinner = false,
  animated = false,
}) => {
  const isDark = useColorScheme() === 'dark';
  const altColor = isDark ? '#bbb' : '#808080';

  const fadeAnim = useRef(new Animated.Value(0)).current;

  Animated.loop(
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  const interpolated = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = {
    transform: [
      {
        rotate: interpolated,
      },
    ],
  };

  return (
    <View transparent={false} style={{...styles.container, paddingBottom: pb}}>
      <StatusBar barStyle="default" />

      <Animated.View style={animated ? [animatedStyle] : []}>
        {spinner ? (
          <ActivityIndicator size="large" color={altColor} />
        ) : (
          <>
            <AppLogo size={size} />
          </>
        )}
      </Animated.View>

      {message && (
        <Text style={{...styles.message, marginTop: 20}}>{message}</Text>
      )}
      {nextline && (
        <Text style={{...styles.message, marginTop: 4}}>{nextline}</Text>
      )}
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 15,
    color: '#8E8E93',
  },
});
