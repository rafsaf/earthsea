import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup(props) {
  const [value, setValue] = React.useState('all');

  const handleChange = (event) => {
    setValue(event.target.value)
    props.handleChange(event.target.value)
  };

  return (
      <div className='my-3'>
    <FormControl component="fieldset">
      <RadioGroup row aria-label="filter" name="filter" value={value} onChange={handleChange}>
        <FormControlLabel value="all" control={<Radio />} label="Szukaj wszędzie" />
        <FormControlLabel value="title" control={<Radio />} label="Tylko tytuły" />
        <FormControlLabel value="description" control={<Radio />} label="Tylko opisy" />
       
        
      </RadioGroup>
    </FormControl>
    </div>
  );
}