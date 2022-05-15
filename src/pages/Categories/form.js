import React from "react";
import { Form } from "react-bootstrap";
import Button from "../../components/Button";
import TextInputWithLabel from "../../components/TextInputWithLabel";

function CategoriesForm({ handleSubmit, handleChange, form }) {
  return (
    <Form>
      <TextInputWithLabel
        placeholder={"Masukan nama kategori"}
        label={"Nama kategori"}
        name="name"
        value={form.name}
        type="text"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukan avatar"}
        label={"Nama avatar"}
        name="avatar"
        value={form.avatar}
        type="file"
        onChange={handleChange}
      />
      <Button variant="primary" action={handleSubmit}>
        Sumbit
      </Button>
    </Form>
  );
}

export default CategoriesForm;
