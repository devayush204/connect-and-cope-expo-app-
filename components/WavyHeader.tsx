import Colors from '@/constants/Colors';
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';


interface WavyHeaderProps {
  height?: number;
  top?: number;
  children?: React.ReactNode;
}

export default function WavyHeader({ 
  height = 160, 
  top = 0,
  children 
}: WavyHeaderProps) {
  const { width } = Dimensions.get('window');
  
  return (
    <View style={[styles.container, { height, top }]}>
      <View style={styles.background}>
        <Svg
          height="100%"
          width="100%"
          viewBox={`0 0 ${width} ${height}`}
          style={styles.svg}
        >
          <Path
            d={`M0 0
               L${width} 0
               L${width} ${height * 0.6}
               C${width * 0.75} ${height * 0.85} ${width * 0.25} ${height * 0.85} 0 ${height * 0.6}
               Z`}
            fill={Colors.primary}
          />
        </Svg>
      </View>
      {children && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});