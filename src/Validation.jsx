// This function performs validation on the input values provided and returns an object containing any errors found during the validation process.
export default function Validation(values) {
  // Initialize an empty object to store validation errors.
  const errors = {};

  // Regular expressions used for validating email, password, alphabetic input, and phone number.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*\d.*\d)(?=.*[!@#$%^&*()_+}{"':;?/>.<,|[\]\\=-]).{8,}$/;
  const alphaRegex = /^[A-Za-z]+$/;
  const phoneRegex = /^\d{10}$/;

  // Validate email input
  if (values.emailId === "") {
    errors.emailId = "Email is Required";
  } else if (!emailRegex.test(values.emailId)) {
    errors.emailId = "Must be a valid email ID";
  }

  // Validate password input
  if (values.password === "") {
    errors.password = "Password is Required";
  } else if (!passwordRegex.test(values.password)) {
    errors.password =
      "Must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters.";
  }

  // Validate firstName input
  if (values.firstName === "") {
    errors.firstName = "First Name is Required";
  } else if (!alphaRegex.test(values.firstName)) {
    errors.firstName = "Input must contain only alphabets.";
  } else if (values.firstName && values.firstName.length < 2) {
    errors.firstName = "Input must be at least 2 characters long.";
  } else if (values.firstName && values.firstName.length > 50) {
    errors.firstName = "Input must not exceed 50 characters.";
  }

  // Validate last name input
  if (values.lastName && !alphaRegex.test(values.lastName)) {
    errors.lastName = "Input must contain only alphabets.";
  }

  // Validate address input
  if (values.address === "") {
    errors.address = "Address is Required";
  } else if (values.address && values.address.length < 10) {
    errors.address = "Input must be at least 10 characters long.";
  }

  // Validate countryCode input
  if (values.countryCode === "Select" || values.countryCode === "") {
    errors.countryCode = "Country code is Required";
  }

  // Validate acceptTermsAndCondition input
  if (!values.acceptTermsAndCondition) {
    errors.acceptTermsAndCondition = "Accept Terms And Condition is Required";
  }

  // Validate phoneNumber input
  if (!values.phoneNumber) {
    errors.phoneNumber = "Phone Number is Required";
  } else if (!phoneRegex.test(values.phoneNumber)) {
    errors.phoneNumber = "Must be a 10-digit numeric phone number";
  }

  // Return the object containing any errors found during validation
  return errors;
}
