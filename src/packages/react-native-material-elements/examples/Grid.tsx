import React from 'react';
import { View } from 'react-native';
import { Grid } from '../src';

export function GridApp(): React.JSX.Element {
  return (
    <Grid container spacing={8} sx={{ bg: 'white' }}>
      <Grid item size={4} sx={{ h: 100 }}>
        <View style={{ backgroundColor: 'blue', height: '100%' }} />
      </Grid>
      <Grid item size={2} sx={{ h: 100 }}>
        <View style={{ backgroundColor: 'blue', height: '100%' }} />
      </Grid>
      <Grid item size={2} sx={{ h: 100 }}>
        <View style={{ backgroundColor: 'blue', height: '100%' }} />
      </Grid>
      <Grid item size={2} sx={{ h: 100 }}>
        <View style={{ backgroundColor: 'blue', height: '100%' }} />
      </Grid>
      <Grid item size={4} sx={{ h: 100 }}>
        <View style={{ backgroundColor: 'blue', height: '100%' }} />
      </Grid>
      <Grid item size={8} sx={{ h: 100 }}>
        <View style={{ backgroundColor: 'blue', height: '100%' }} />
      </Grid>
      <Grid item size={8} sx={{ h: 100 }}>
        <View style={{ backgroundColor: 'blue', height: '100%' }} />
      </Grid>
      <Grid item size={2} sx={{ h: 100 }}>
        <View style={{ backgroundColor: 'blue', height: '100%' }} />
      </Grid>
      <Grid item size={2} sx={{ h: 100 }}>
        <View style={{ backgroundColor: 'blue', height: '100%' }} />
      </Grid>
      <Grid item size={12} sx={{ h: 100 }}>
        <View style={{ backgroundColor: 'blue', height: '100%' }} />
      </Grid>
    </Grid>
  );
}
