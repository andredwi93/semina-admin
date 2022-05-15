import React from "react";
import { Button } from "react-bootstrap";

function ComponentButton({
  children,
  action,
  variant,
  size,
  loading,
  disabled,
}) {
  return (
    <Button onClick={action} variant={variant} disabled={disabled} size={size}>
      {loading ? 'loading...' : children}
    </Button>
  );
}

export default ComponentButton;
