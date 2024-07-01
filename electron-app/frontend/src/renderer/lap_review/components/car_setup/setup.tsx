import React, { useState } from 'react';
import "../components.css";
import { Select, MenuItem, Box, Typography, FormControl, SelectChangeEvent, styled } from '@mui/material';

interface SetupProps {
  setupDataSets: any[];
  lapNums: string[];
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const InvisibleSelect = styled(Select)({
  '& .MuiSelect-select': {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: 'none',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
});

const Setup: React.FC<SetupProps> = ({ setupDataSets, lapNums, isSelectedForHome, onToggleSelected }) => {
  const [selectedLapIndex, setSelectedLapIndex] = useState(0);

  const handleLapChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLapIndex(parseInt(event.target.value, 10));
  };

  const setupData = setupDataSets[selectedLapIndex];

  return (
    <div>
      <Box display="flex" justifyContent="center" alignItems="center" gap={2} mb={2}>
        <Typography variant="h6" className='text-over-graph'>Setup</Typography>
        <FormControl variant="outlined">
          <InvisibleSelect
            value={selectedLapIndex}
            onChange={handleLapChange}
            renderValue={(selected) => (
              <Typography variant="h6" className='text-over-graph'>
                {`Lap ${lapNums[selected as number]}`}
              </Typography>
            )}
          >
            {lapNums.map((lapNum, index) => (
              <MenuItem key={index} value={index}>
                Lap {lapNum}
              </MenuItem>
            ))}
          </InvisibleSelect>
        </FormControl>
      </Box>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div>
          <div>
            <div className='car-setup-text'>Front Wing Aero</div>
            <div className='car-setup-number'>{setupData.frontwing}</div>
          </div>
          <div>
            <div className='car-setup-text'>Rear Wing Aero</div>
            <div className='car-setup-number'>{setupData.rearwing}</div>
          </div>
          <div>
            <div className='car-setup-text'>Differential Adjustment On Throttle</div>
            <div className='car-setup-number'>{setupData.onthrottle}%</div>
          </div>
          <div>
            <div className='car-setup-text'>Differential Adjustment Off Throttle</div>
            <div className='car-setup-number'>{setupData.offthrottle}%</div>
          </div>
        </div>
        <div>
          <div>
            <div className='car-setup-text'>Front Camber Angle</div>
            <div className='car-setup-number'>{typeof setupData.frontcamber === 'number' ? setupData.frontcamber.toFixed(0) : 'N/A'}</div>
          </div>
          <div>
            <div className='car-setup-text'>Rear Camber Angle</div>
            <div className='car-setup-number'>{typeof setupData.rearcamber === 'number' ? setupData.rearcamber.toFixed(0) : 'N/A'}</div>
          </div>
          <div>
            <div className='car-setup-text'>Front Toe Angle</div>
            <div className='car-setup-number'>{typeof setupData.fronttoe === 'number' ? setupData.fronttoe.toFixed(2) : 'N/A'}°</div>
          </div>
          <div>
            <div className='car-setup-text'>Rear Toe Angle</div>
            <div className='car-setup-number'>{typeof setupData.reartoe === 'number' ? setupData.reartoe.toFixed(2) : 'N/A'}°</div>
          </div>
        </div>
        <div>
          <div>
            <div className='car-setup-text'>Front Suspension</div>
            <div className='car-setup-number'>{setupData.frontsuspension}</div>
          </div>
          <div>
            <div className='car-setup-text'>Rear Suspension</div>
            <div className='car-setup-number'>{setupData.rearsuspension}</div>
          </div>
          <div>
            <div className='car-setup-text'>Front Anti-Roll Bar</div>
            <div className='car-setup-number'>{setupData.frontantirollbar}</div>
          </div>
          <div>
            <div className='car-setup-text'>Rear Anti-Roll Bar</div>
            <div className='car-setup-number'>{setupData.rearantirollbar}</div>
          </div>
        </div>
        <div>
          <div>
            <div className='car-setup-text'>Front Ride Height</div>
            <div className='car-setup-number'>{setupData.frontsuspensionheight}</div>
          </div>
          <div>
            <div className='car-setup-text'>Rear Ride Height</div>
            <div className='car-setup-number'>{setupData.rearsuspensionheight}</div>
          </div>
          <div>
            <div className='car-setup-text'>Brake Pressure</div>
            <div className='car-setup-number'>{setupData.brakepressure}%</div>
          </div>
          <div>
            <div className='car-setup-text'>Brake Bias</div>
            <div className='car-setup-number'>{setupData.brakebias}%</div>
          </div>
        </div>
        <div>
          <div>
            <div className='car-setup-text'>Front Tyre Pressure</div>
            <div className='car-setup-number'>{typeof setupData.fronttyrepressure === 'number' ? setupData.fronttyrepressure.toFixed(2) : 'N/A'} PSI</div>
          </div>
          <div>
            <div className='car-setup-text'>Rear Tyre Pressure</div>
            <div className='car-setup-number'>{typeof setupData.reartyrepressure === 'number' ? setupData.reartyrepressure.toFixed(2) : 'N/A'} PSI</div>
          </div>
          <div>
            <div className='car-setup-text'>Ballast</div>
            <div className='car-setup-number'>{setupData.ballast}</div>
          </div>
          <div>
            <div className='car-setup-text'>Fuel Load</div>
            <div className='car-setup-number'>{typeof setupData.fuelload === 'number' ? setupData.fuelload.toFixed(2) : 'N/A'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup;
