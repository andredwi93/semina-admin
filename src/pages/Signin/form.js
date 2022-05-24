import React from "react";
import { Form } from "react-bootstrap";
import ComponentButton from "../../components/Button";
import TextInputWithLabel from "../../components/TextInputWithLabel";

function SignInForm({ form, handleChange, handleSubmit, isLoading }) {
  return (
    <Form>
      <TextInputWithLabel
        label={"Email"}
        placeholder="Masukkan email"
        name="email"
        value={form.email}
        type="email"
        onChange={handleChange}
      />
      <TextInputWithLabel
        label={"Password"}
        placeholder="Masukkan Password"
        name="password"
        value={form.password}
        type="password"
        onChange={handleChange}
      />
      <ComponentButton
        loading={isLoading}
        variant="primary"
        action={handleSubmit}
      >
        Submit
      </ComponentButton>
    </Form>
  );
}

export default SignInForm;
