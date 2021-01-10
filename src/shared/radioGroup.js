import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

export default function RadioButtonsGroup(props) {
  return (
    <div className="my-3 mx-1">
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="filter"
          name="filter"
          value={props.filter}
          onChange={props.handleChange}
        >
          <FormControlLabel
            value="all"
            control={<Radio size="small" color="primary" />}
            label="Szukaj wszędzie"
          />
          <FormControlLabel
            value="title"
            control={<Radio size="small" color="primary" />}
            label="Tylko tytuły"
          />
          <FormControlLabel
            value="description"
            control={<Radio size="small" color="primary" />}
            label="Tylko opisy"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
