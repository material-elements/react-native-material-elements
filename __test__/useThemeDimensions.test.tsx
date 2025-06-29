import React from 'react';
import { useThemeDimensions } from '../src/hooks/useThemeDimensions';
import { renderHook } from '@testing-library/react-hooks';
import { ThemeWrapper } from './test-utils';
import { font, fontWeight, latterSpacing, lineHeight, spacing } from '../src/libraries/themes/v1/sizes';
import { createThemeDimensions } from '../src';
import { View } from 'react-native';

describe('useThemeDimensions', () => {
  const mockChildren = <View />;

  it('should return theme dimensions', () => {
    const { result } = renderHook(useThemeDimensions, { wrapper: ThemeWrapper });
    expect(result.current).toEqual({
      spacing,
      font,
      fontWeight,
      latterSpacing,
      lineHeight,
    });
  });

  it('should return custom theme spacing dimensions', () => {
    const themeDimensions = createThemeDimensions({
      spacing: {
        xs: 10,
        sm: 20,
        md: 30,
        lg: 40,
        xl: 50,
      },
    });

    const { result } = renderHook(useThemeDimensions, {
      wrapper: ThemeWrapper,
      initialProps: { dimensions: themeDimensions, children: mockChildren },
    });
    expect(result.current.spacing).toEqual(themeDimensions.spacing);
  });

  it('should return custom theme font dimensions', () => {
    const themeDimensions = createThemeDimensions({
      font: {
        'text-xxs': 20,
        'text-xs': 40,
        'text-sm': 50,
        'text-md': 50,
      },
    });
    const { result } = renderHook(useThemeDimensions, {
      wrapper: ThemeWrapper,
      initialProps: { dimensions: themeDimensions, children: mockChildren },
    });
    expect(result.current.font).toEqual(themeDimensions.font);
  });

  it('should return font weight theme font dimensions', () => {
    const themeDimensions = createThemeDimensions({
      fontWeight: {
        'font-thin': 200,
        'font-extraLight': 300,
        'font-light': 400,
        'font-normal': 500,
      },
    });
    const { result } = renderHook(useThemeDimensions, {
      wrapper: ThemeWrapper,
      initialProps: { dimensions: themeDimensions, children: mockChildren },
    });
    expect(result.current.fontWeight).toEqual(themeDimensions.fontWeight);
  });

  it('should return latter spacing theme font dimensions', () => {
    const themeDimensions = createThemeDimensions({
      latterSpacing: {
        'tracking-tighter': 10,
        'tracking-tight': 20,
        'tracking-normal': 30,
        'tracking-wide': 50,
      },
    });
    const { result } = renderHook(useThemeDimensions, {
      wrapper: ThemeWrapper,
      initialProps: { dimensions: themeDimensions, children: mockChildren },
    });
    expect(result.current.latterSpacing).toEqual(themeDimensions.latterSpacing);
  });

  it('should return line height theme font dimensions', () => {
    const themeDimensions = createThemeDimensions({
      lineHeight: {
        'leading-3': 300,
        'leading-4': 10,
        'leading-5': 15,
        'leading-6': 150,
        'leading-7': 175,
      },
    });
    const { result } = renderHook(useThemeDimensions, {
      wrapper: ThemeWrapper,
      initialProps: { dimensions: themeDimensions, children: mockChildren },
    });
    expect(result.current.lineHeight).toEqual(themeDimensions.lineHeight);
  });
});
