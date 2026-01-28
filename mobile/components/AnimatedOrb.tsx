import { memo, useEffect } from 'react';
import Animated, {
  Easing,
  type EasingFunction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { LinearGradient } from 'expo-linear-gradient';

type AnimatedOrbProps = {
  /** Array of gradient colors (minimum 2 required) */
  colors: [string, string, ...string[]];
  /** Size of the orb in pixels */
  size: number;
  /** Initial X position (left offset) */
  initialX: number;
  /** Initial Y position (top offset) */
  initialY: number;
  /** Base animation duration in milliseconds */
  duration: number;
  /** Opacity of the orb (0-1) @default 0.6 */
  opacity?: number;
  /** Custom horizontal animation range @default 30 */
  xRange?: number;
  /** Custom vertical animation range @default 20 */
  yRange?: number;
  /** Minimum scale value @default 0.9 */
  scaleMin?: number;
  /** Maximum scale value @default 1.1 */
  scaleMax?: number;
  /** Custom easing function @default Easing.inOut(Easing.ease) */
  easing?: EasingFunction;
  /** Additional blur effect (requires parent wrapper) @default false */
  blur?: boolean;
  /** Z-index for layering multiple orbs @default 0 */
  zIndex?: number;
};

/**
 * AnimatedOrb - Floating gradient orb with smooth, organic animations
 *
 * Features:
 * - Smooth X/Y translation with different timing
 * - Pulsating scale animation
 * - Fully customizable colors, size, and animation parameters
 * - Memoized for performance optimization
 * - Type-safe with comprehensive TypeScript support
 *
 * @example
 * ```tsx
 * <AnimatedOrb
 *   colors={['#8B5CF6', '#6366F1']}
 *   size={120}
 *   initialX={50}
 *   initialY={100}
 *   duration={4000}
 *   opacity={0.3}
 * />
 * ```
 */
export const AnimatedOrb = memo(
  ({
    colors,
    size,
    initialX,
    initialY,
    duration,
    opacity = 0.6,
    xRange = 30,
    yRange = 20,
    scaleMin = 0.9,
    scaleMax = 1.1,
    easing = Easing.inOut(Easing.ease),
    blur = false,
    zIndex = 0,
  }: AnimatedOrbProps) => {
    // Shared values for smooth animations
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);

    useEffect(() => {
      // Horizontal floating animation (full duration)
      translateX.value = withRepeat(
        withSequence(
          withTiming(xRange, { duration, easing }),
          withTiming(-xRange, { duration, easing }),
          withTiming(0, { duration, easing }),
        ),
        -1, // infinite repetition
        false, // don't reverse
      );

      // Vertical floating animation (80% of base duration for variation)
      translateY.value = withRepeat(
        withSequence(
          withTiming(-yRange, { duration: duration * 0.8, easing }),
          withTiming(yRange, { duration: duration * 0.8, easing }),
          withTiming(0, { duration: duration * 0.8, easing }),
        ),
        -1,
        false,
      );

      // Pulsating scale animation (120% of base duration for slower pulse)
      scale.value = withRepeat(
        withSequence(
          withTiming(scaleMax, { duration: duration * 1.2, easing }),
          withTiming(scaleMin, { duration: duration * 1.2, easing }),
          withTiming(1, { duration: duration * 1.2, easing }),
        ),
        -1,
        false,
      );
    }, [
      duration,
      translateX,
      translateY,
      scale,
      xRange,
      yRange,
      scaleMin,
      scaleMax,
      easing,
    ]);

    // Combine all animations into a single style object
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    }));

    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: initialX,
            top: initialY,
            zIndex,
          },
          animatedStyle,
        ]}
      >
        <LinearGradient
          colors={colors}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            opacity,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        {blur && (
          <Animated.View
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: 'transparent',
              shadowColor: colors[0],
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.8,
              shadowRadius: size / 3,
              elevation: 10,
            }}
          />
        )}
      </Animated.View>
    );
  },
);

// Display name for debugging
AnimatedOrb.displayName = 'AnimatedOrb';

/**
 * Pre-configured orb presets for common use cases
 * Use these for quick implementation with beautiful default colors
 */
export const OrbPresets = {
  /** Purple to blue gradient - elegant and modern */
  purple: {
    colors: ['#8B5CF6', '#6366F1', '#3B82F6'] as [string, string, ...string[]],
    duration: 4000,
  },
  /** Pink gradient - warm and inviting */
  pink: {
    colors: ['#EC4899', '#F472B6', '#FBCFE8'] as [string, string, ...string[]],
    duration: 5000,
  },
  /** Cyan/teal gradient - fresh and clean */
  cyan: {
    colors: ['#06B6D4', '#22D3EE', '#67E8F9'] as [string, string, ...string[]],
    duration: 4500,
  },
  /** Orange gradient - energetic and vibrant */
  orange: {
    colors: ['#F97316', '#FB923C', '#FDBA74'] as [string, string, ...string[]],
    duration: 3500,
  },
  /** Green gradient - natural and calming */
  green: {
    colors: ['#10B981', '#34D399', '#6EE7B7'] as [string, string, ...string[]],
    duration: 4200,
  },
  /** Violet gradient - mysterious and elegant */
  violet: {
    colors: ['#7C3AED', '#A78BFA', '#C4B5FD'] as [string, string, ...string[]],
    duration: 4800,
  },
  /** Gold gradient - luxurious and premium */
  gold: {
    colors: ['#F59E0B', '#FCD34D', '#FDE68A'] as [string, string, ...string[]],
    duration: 3800,
  },
  /** Red gradient - bold and passionate */
  red: {
    colors: ['#EF4444', '#F87171', '#FCA5A5'] as [string, string, ...string[]],
    duration: 4100,
  },
} as const;

/**
 * OrbBackground - Helper component to create a full background of animated orbs
 *
 * @example
 * ```tsx
 * <OrbBackground
 *   orbs={[
 *     { preset: 'purple', size: 120, x: 0, y: 20 },
 *     { preset: 'pink', size: 100, x: 250, y: 100 },
 *   ]}
 * />
 * ```
 */
type OrbConfig = {
  preset?: keyof typeof OrbPresets;
  colors?: [string, string, ...string[]];
  size: number;
  x: number;
  y: number;
  opacity?: number;
  duration?: number;
};

type OrbBackgroundProps = {
  orbs: OrbConfig[];
  containerHeight?: number;
};

export const OrbBackground = memo(
  ({ orbs, containerHeight = 300 }: OrbBackgroundProps) => {
    return (
      <Animated.View
        style={{
          position: 'absolute',
          width: '100%',
          height: containerHeight,
          overflow: 'hidden',
        }}
      >
        {orbs.map((orb, index) => {
          const preset = orb.preset ? OrbPresets[orb.preset] : null;
          return (
            <AnimatedOrb
              key={index}
              colors={orb.colors || preset?.colors || ['#8B5CF6', '#6366F1']}
              size={orb.size}
              initialX={orb.x}
              initialY={orb.y}
              duration={orb.duration || preset?.duration || 4000}
              opacity={orb.opacity}
              zIndex={index}
            />
          );
        })}
      </Animated.View>
    );
  },
);

OrbBackground.displayName = 'OrbBackground';
