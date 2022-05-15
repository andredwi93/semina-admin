import React from "react";
import { FormGroup, FormLabel } from "react-bootstrap";
import TextInput from "../TextInput";

function TextInputWithLabel({
  label,
  name,
  value,
  type,
  onChange,
  placeholder,
}) {
  return (
    <FormGroup className="mb-2">
      <FormLabel>{label}</FormLabel>
      <TextInput
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </FormGroup>
  );
}

export default TextInputWithLabel;
