import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
      width: '50%',
      marginBottom: '1%'
  },
  greenLabel: {
      color: 'green'
  },
  redLabel: {
      color: 'red'
  }
}));

export default function GroupedSelect(props) {
  const classes = useStyles();
  const [value, setValue] = useState(props.allVersions[0].created)
  const handleChange = (event) => {
    setValue(event.target.value)
    props.onChange(event.target.value)
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-native-select">Wersje artykułu</InputLabel>
        <Select value={value} onChange={handleChange} native id="grouped-native-select">
          <optgroup className={classes.greenLabel} label="Zweryfikowane">
            {props.allVersions.filter(row => row.confirm).map(row => (
                <option key={row.id} value={row.id} >{row.created}</option>
            ))}
          </optgroup>
          <optgroup className={classes.redLabel} label="Uwaga! Niezweryfikowane">
          {props.allVersions.filter(row => !row.confirm).map(row => (
                <option key={row.id} value={row.id} >{row.created}</option>
            ))}
          </optgroup>
        </Select>
      </FormControl>

    </div>
  );
}