import { useField } from "formik";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

type InputProps = {
  label?: string;
  labelShrink?: boolean;
  minRows?: string | number;
  multiline?: boolean;
  name: string;
  type?: "date" | "email" | "number" | "password" | "text";
  value?: any;
  variant?: "filled" | "outlined" | "standard";
};

const TextInput = ({
  label,
  labelShrink = false,
  type = "text",
  variant,
  ...props
}: InputProps) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <TextField
      {...field}
      error={meta.touched && Boolean(meta.error)}
      fullWidth
      helperText={meta.error}
      InputLabelProps={{
        shrink: labelShrink ? labelShrink : undefined,
      }}
      InputProps={{
        endAdornment: type === "password" && (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      label={label}
      type={!showPassword ? type : "text"}
      variant={variant}
    />
  );
};

export default TextInput;
