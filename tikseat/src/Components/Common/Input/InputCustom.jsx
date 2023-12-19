import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const InputCustom = ({
  type = "text",
  label,
  className,
  setValue,
  passwordValue,
  isConfirm,
  value,
  disabled,
  labelError,
  name,
  onChange,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const validateEmail = (email) => {
    // Regular expression to check for a valid email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    // Regular expression to check for a valid Vietnamese phone number format
    const phoneRegex = /^(03|07|08|09)\d{8}$/;
    return phoneRegex.test(phone);
  };

  const validateWebURL = (url) => {
    // Regular expression to check for a valid URL format
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return urlRegex.test(url);
  };

  const validatePassword = (password) => {
    // Regular expression to check for a valid URL format
    const urlRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return urlRegex.test(password);
  };
  function checkSetMessageErr(isValid, message) {
    let errorMessage;
    if (isValid) {
      errorMessage = null;
    } else {
      errorMessage = message;
    }
    return errorMessage;
  }

  const handleChange = (e) => {
    const inputValue = e.target.value;
    console.log("inputValue", inputValue);
    let isValid = true;
    let errorMessage = "";

    if (inputValue.trim() !== "") {
      if (type === "email") {
        isValid = validateEmail(inputValue);
        errorMessage = "Invalid email format. (eg: abc@gmail.com)";
      } else if (type === "phone") {
        isValid = validatePhoneNumber(inputValue);
        errorMessage = "Vietnam's phone number format is invalid.";
      } else if (type === "web") {
        isValid = validateWebURL(inputValue);
        errorMessage = "Invalid web URL format";
      } else if (type === "password") {
        console.log("aaaaaa");
        isValid = validatePassword(inputValue);
        errorMessage = checkSetMessageErr(
          isValid,
          "Invalid password. Must enter between 8 and 16 characters"
        );
      }
    }
    if (isConfirm) {
      console.log("object");
      if (inputValue !== passwordValue) {
        isValid = false;
        errorMessage = "Passwords do not match";
      }
    }

    setError(!isValid);
    setErrorMessage(errorMessage);
    if (setValue) {
      setValue(inputValue);
    }
  };
  if (type === "password") {
    return (
      <FormControl
        variant="outlined"
        fullWidth
        style={{ marginBottom: "20px" }}>
        <InputLabel htmlFor="outlined-adornment-password" required>
          {label || "not label"}
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={value}
          required
          disabled={disabled}
          defaultValue={value}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end" variant="standard">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                // onMouseDown={handleMouseDownPassword}
                edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label={label}
          error={errorMessage}
        />
        {errorMessage?.length > 0 && (
          <p style={{ color: "red", fontSize: "13px" }}>{errorMessage}</p>
        )}
        {labelError?.length > 0 && (
          <FormHelperText style={{ color: "red" }} id="component-error-text">
            {labelError}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
  return (
    <TextField
      {...rest}
      className={className}
      // style={{ marginBottom: "20px" }}
      style={{ backgroundColor: "white" }}
      label={label || "Not label"}
      fullWidth
      required
      name={name}
      disabled={disabled}
      type={type}
      defaultValue={value}
      onChange={onChange || handleChange}
      error={error}
      helperText={error ? errorMessage : ""}
    />
  );
};

export default InputCustom;
