import { useState, useContext } from "react";
import { TextField, MenuItem, Stack, Checkbox, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { ValuesContext } from "../contexts/ValuesContext";
import Validation from "../Validation";
import PropTypes from "prop-types";
import { style } from "./Form.css";
import "../index.css";

const Form3 = (props) => {
  // Initialize state variables
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const { values, setValues } = useContext(ValuesContext);

  // Define country code options
  const countryCodeList = [
    { value: "Select", label: "Select" },
    { value: "+91", label: "India (+91)" },
    { value: "+1", label: "America (+1)" },
  ];

  // Event handler for input changes
  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Event handler for checkbox changes
  const handleChangeChecked = (e) => {
    setValues({ ...values, [e.target.name]: e.target.checked });
  };

  // Function to submit form data to the server
  const submitDataHttpReq = async () => {
    const data = JSON.parse(JSON.stringify(values));
    delete data.acceptTermsAndCondition;
    try {
      const response = await fetch("https://codebuddy.review/submit", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Form submitted successfully");
        // Reset form values after successful submission
        setValues({
          emailId: "",
          password: "",
          firstName: "",
          lastName: "",
          address: "",
          countryCode: "",
          phoneNumber: "",
          acceptTermsAndCondition: false,
        });
        // Navigate to the posts page
        navigate("./posts");
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Event handler for form submission
  const handleSave = (e) => {
    e.preventDefault();
    setError(() => {
      const newError = Validation(values);
      // If there are no validation errors related to country code, phone number, and terms acceptance, submit form data
      if (
        newError.countryCode === undefined &&
        newError.phoneNumber === undefined &&
        newError.acceptTermsAndCondition === undefined
      ) {
        submitDataHttpReq();
      }
      return newError;
    });
  };

  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg ">
      <div className="form1box">
        <h2 className="mb-3 text-2xl">Welcome to the Form 3</h2>

        <TextField
          sx={style.fields}
          select
          name="countryCode"
          defaultValue="Select"
          value={values.countryCode || countryCodeList[0].value}
          onChange={handleChange}
        >
          {countryCodeList.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {error.countryCode && <p>{error.countryCode}</p>}

        <TextField
          sx={style.fields}
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
          value={values.phoneNumber || ""}
          name="phoneNumber"
          onChange={handleChange}
        />
        {error.phoneNumber && <p>{error.phoneNumber}</p>}

        <Stack direction="row" alignItems="center" sx={{ mt: 1 }}>
          <Checkbox
            checked={values.acceptTermsAndCondition}
            name="acceptTermsAndCondition"
            onChange={handleChangeChecked}
            inputProps={{ "aria-label": "controlled" }}
          />
          <h6>Accept Terms And Condition</h6>
        </Stack>
        {error.acceptTermsAndCondition && <p>{error.acceptTermsAndCondition}</p>}

        <div className="form-1-btn-box">
          <Button
            sx={style.btn}
            variant="contained"
            onClick={() => {
              props.tab("2");
            }}
          >
            Back
          </Button>
          <Button sx={style.btn} variant="contained" onClick={handleSave}>
            Save
          </Button>
          <Button sx={style.btn} variant="contained" disabled endIcon={<ArrowRightAltIcon />}>
            Save and Next
          </Button>
        </div>
      </div>
    </div>
  );
};

// PropTypes validation
Form3.propTypes = {
  tab: PropTypes.func.isRequired, // Assuming tab is a function
};
export default Form3;
