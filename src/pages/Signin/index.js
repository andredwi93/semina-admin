import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../redux/auth/action";
import { postData } from "../../utils/fetchData";
import { Container, Card } from "react-bootstrap";
import AlertMessage from "../../components/Alert";
import SignInForm from "./form";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await postData("api/v1/auth/signin", form);
      dispatch(userLogin(res.data.data.token, "role", "username"));

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
    <Container md={12} className="vh-100">
      {alert.status && <AlertMessage type={alert.type} message={alert.message} />}
      <Card style={{ width: "50%" }} className="m-auto mt-5">
        <Card.Body>
          <Card.Title className="text-center">Form SignIn</Card.Title>
          <SignInForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SignIn;
