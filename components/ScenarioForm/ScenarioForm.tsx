import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { x } from '@xstyled/styled-components';

export const ScenarioForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <x.div p="1.5rem">
      <TextField
        id="filled-basic"
        label="Scenario Name"
        variant="outlined"
        onChange={(e) => setName(e.target.value)}
      />
      <x.div mt="1rem">
        <FormControl>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </x.div>
    </x.div>
  );
};
