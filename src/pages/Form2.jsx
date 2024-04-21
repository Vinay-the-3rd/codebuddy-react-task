import { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { ValuesContext } from "../contexts/ValuesContext";
import Validation from "../Validation";
import PropTypes from "prop-types";
import { style } from "./Form.css";
import "../index.css";

const Form2 = (props) => {
  // Initialize state variables
  const [error, setError] = useState({});
  const { values, setValues } = useContext(ValuesContext);

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
  const handleSaveAndNext = (e) => {
    e.preventDefault();
    setError(() => {
      const newError = Validation(values);
      if (
        newError.firstName === undefined &&
        newError.lastName === undefined &&
        newError.address === undefined
      ) {
        props.tab("3");
      }
      return newError;
    });
  };

  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg ">
      <div className="form1box">
        <h2 className="mb-3 text-2xl">Welcome to the Form 2</h2>
        <TextField
          sx={style.fields}
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          value={values.firstName || ""}
          name="firstName"
          onChange={handleChange}
        />
        {error.firstName && <p>{error.firstName}</p>}

        <TextField
          sx={style.fields}
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          value={values.lastName || ""}
          name="lastName"
          onChange={handleChange}
        />
        {error.lastName && <p>{error.lastName}</p>}

        <TextField
          sx={style.fields}
          id="outlined-basic"
          label="Address"
          variant="outlined"
          value={values.address || ""}
          name="address"
          onChange={handleChange}
        />
        {error.address && <p>{error.address}</p>}

        <div className="form-1-btn-box">
          <Button
            sx={style.btn}
            variant="contained"
            onClick={() => {
              props.tab("1");
            }}
          >
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
Form2.propTypes = {
  tab: PropTypes.func.isRequired, // Assuming tab is a function
};
export default Form2;
