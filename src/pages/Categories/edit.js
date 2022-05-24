import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/BreadCrumb";
import Alert from "../../components/Alert";
import Form from "./form";
import { useNavigate, useParams } from "react-router-dom";
import { getData, putData } from "../../utils/fetchData";
import { setNotif } from "../../redux/notif/actions";

function CategoryEdit() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const fetchOneCategory = async () => {
    const res = await getData(`api/v1/categories/${id}`);
    setForm({ ...form, name: res.data.data.name });
  };

  useEffect(() => {
    fetchOneCategory();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await putData(`api/v1/categories/${id}`, form);
      dispatch(
        setNotif(true, "success", `Berhasil ubah data ${res.data.data.name}`)
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
        textThird="Edit"
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

export default CategoryEdit;
