import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 1,
    label: 1,
  },
  {
    value: 2,
    label: 2,
  },
  {
    value: 3,
    label: 3,
  },
  {
    value: 4,
    label: 4,
  },
  {
    value: 5,
    label: 5,
  },
  {
    value: 6,
    label: 6,
  },
  {
    value: 7,
    label: 7,
  },
];

function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSliderLabel({onChangeHandler}) {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Always visible"
        defaultValue={1}
        getAriaValueText={valuetext}
        step={1}
        min={1}
        max={7}
        marks={marks}
        valueLabelDisplay="on"
        onChange={onChangeHandler}
      />
    </Box>
  );
}
