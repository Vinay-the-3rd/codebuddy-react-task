import { useState } from "react";
import Router from "./Router";
import { ValuesContext } from "./contexts/ValuesContext";
function App() {
  // Define state for form input values using the useState hook
  const [values, setValues] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    countryCode: "",
    phoneNumber: "",
    acceptTermsAndCondition: false,
  });

  // Render the component tree, providing the form values and setter function via context
  return (
    <ValuesContext.Provider value={{ values, setValues }}>
      <Router />
    </ValuesContext.Provider>
  );
}

export default App;
