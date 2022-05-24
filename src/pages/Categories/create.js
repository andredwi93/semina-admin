import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/BreadCrumb";
import Alert from "../../components/Alert";
import Form from "./form";
import { postData } from "../../utils/fetchData";
import { setNotif } from "../../redux/notif/actions";

function CategoryCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [isLoading, setIsLoading] = useState(false);

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await postData("api/v1/categories", form);

      dispatch(
        setNotif(
          true,
          "success",
          `Berhasil tambah kategori ${res.data.data.name}`
        )
      );
      navigate("/categories");
    } catch (err) {
      setAlert({
        ...alert,
        status: true,
        type: "danger",
        message: err.response.data.msg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <BreadCrumb
        textSecond="Categories"
        textThird="Create"
        urlSecond="/categories"
      />
      {alert.status && <Alert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Container>
  );
}

export default CategoryCreate;
