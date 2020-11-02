import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function CheckboxesGroup(props) {
  
  return (
    <div className="">
      <FormControl component="fieldset" className="">
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          
          {props.categories.map(row => (
            <FormControlLabel
            key={row.name}
            control={<Checkbox color='primary' checked={row.isChecked} onChange={props.handleCategoryChange} name={row.name} />}
            label={row.name}
        />
          ))}

        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
    </div>
  )}