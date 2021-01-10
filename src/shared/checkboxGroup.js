import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function CheckboxesGroup(props) {
  return (
    <div className="">
      <FormControl component="fieldset" className="">
        <FormLabel component="legend"> {props.search}</FormLabel>
        <p className="mb-0">Tylko zweryfikowane</p>
        <FormControlLabel
          control={
            <Switch
              checked={props.verifiedOnly}
              onChange={props.handleVerifiedOnlyChange}
              name="switchVerfified"
              color="primary"
              size="small"
            />
          }
        />
        <p className="title">Kategorie</p>
        <FormGroup>
          <FormControlLabel
            key={props.allCheck.name}
            control={
              <Checkbox
                size="small"
                color="primary"
                checked={props.allCheck.isChecked}
                onChange={props.handleAllCategoryChange}
                name={props.allCheck.name}
              />
            }
            label={props.allCheck.label}
          />
          {props.categories.map((row) => (
            <FormControlLabel
              key={row.name}
              control={
                <Checkbox
                  size="small"
                  color="primary"
                  checked={row.isChecked}
                  onChange={props.handleCategoryChange}
                  name={row.name}
                />
              }
              label={row.label}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
}
