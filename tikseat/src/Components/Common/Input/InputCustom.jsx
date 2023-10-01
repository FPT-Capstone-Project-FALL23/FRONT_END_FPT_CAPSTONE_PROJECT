import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
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
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
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
          onChange={(e) => setValue(e.target.value)}
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
        />
      </FormControl>
    );
  }
  return (
    <TextField
      {...rest}
      className={className}
      style={{ marginBottom: "20px" }}
      label={label || "Not label"}
      onChange={(e) => setValue(e.target.value)}
      placeholder={label}
      fullWidth
      required
      type={type}
    />
  );
};

export default InputCustom;
