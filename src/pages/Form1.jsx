import { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { ValuesContext } from "../contexts/ValuesContext";
import PropTypes from "prop-types";
import Validation from "../Validation";
import { style } from "./Form.css";
import "../index.css";

const Form1 = (props) => {
  // Initialize state variables
  const [showPassword, setShowPassword] = useState(false);
  const { values, setValues } = useContext(ValuesContext);
  const [error, setError] = useState({});

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Event handler for input changes
  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Event handler for saving form data
  const handleSave = (e) => {
    e.preventDefault();
    setError(Validation(values));
  };

  // Event handler for saving form data and navigating to the next step
  const handleSaveAndNext = async (e) => {
    e.preventDefault();
    setError(() => {
      const newError = Validation(values);
      // If there are no validation errors related to email ID and password, switch to the next step
      if (newError.emailId === undefined && newError.password === undefined) {
        props.tab("2");
      }
      return newError;
    });
  };

  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg ">
      <div className="form1box">
        <h2 className="mb-3 text-2xl">Welcome to the Form</h2>
        <TextField
          sx={style.fields}
          id="outlined-basic"
          label="Email Id"
          variant="outlined"
          value={values.emailId || ""}
          name="emailId"
          onChange={handleChange}
        />
        {error.emailId && <p>{error.emailId}</p>}
        <FormControl sx={style.fields} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={values.password || ""}
            name="password"
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        {error.password && <p>{error.password}</p>}
        <div className="form-1-btn-box">
          <Button sx={style.btn} variant="contained" disabled>
            Back
          </Button>
          <Button sx={style.btn} variant="contained" onClick={handleSave}>
            Save
          </Button>
          <Button
            sx={style.btn}
            variant="contained"
            onClick={handleSaveAndNext}
            endIcon={<ArrowRightAltIcon />}
          >
            Save and Next
          </Button>
        </div>
      </div>
    </div>
  );
};

// PropTypes validation
Form1.propTypes = {
  tab: PropTypes.func.isRequired, // Assuming tab is a function
};
export default Form1;
