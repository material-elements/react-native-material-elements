import { createThemeDimensions, themeDimensions } from '../src';
import { CreateThemeDimensions } from '../src/libraries/themes/types';

describe('createThemeDimensions', () => {
  it('should merge custom and default theme dimensions', () => {
    const customDimension: CreateThemeDimensions = {
      spacing: {
        xs: 10,
        sm: 20,
        md: 30,
        lg: 40,
        xl: 50,
      },
    };

    const result = createThemeDimensions(customDimension);

    expect(result.spacing).toEqual(expect.objectContaining(customDimension.spacing));
  });

  it('should return default theme dimensions if no custom dimensions are provided', () => {
    const result = createThemeDimensions({});

    expect(result).toEqual(expect.objectContaining(themeDimensions));
  });

  it('should override only specified values and retain the rest from defaults', () => {
    const customDimension: CreateThemeDimensions = {
      spacing: {
        xs: 100,
      },
    };

    const result = createThemeDimensions(customDimension);

    expect(result.spacing.xs).toBe(100);
    expect(result.spacing.sm).toBe(themeDimensions.spacing.sm);
  });

  it('should not mutate the default themeDimensions object', () => {
    const original = JSON.parse(JSON.stringify(themeDimensions));

    createThemeDimensions({
      spacing: {
        xs: 200,
      },
    });

    expect(themeDimensions).toEqual(original);
  });
});
