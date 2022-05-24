import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../../components/Alert";
import BreadCrumb from "../../components/BreadCrumb";
import { setNotif } from "../../redux/notif/actions";
import { postData } from "../../utils/fetchData";
import SpeakersForm from "./form";

function CreateSpeakers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    role: "",
    file: "",
    avatar: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      if (
        e?.target?.files[0]?.type === "image/jpg" ||
        e?.target?.files[0]?.type === "image/png" ||
        e?.target?.files[0]?.type === "image/jpeg"
      ) {
        let size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 3) {
          setAlert({
            ...alert,
            status: true,
            type: "danger",
            message: "Please select image size less than 3 MB",
          });
          setForm({
            ...form,
            file: "",
            [e.target.name]: "",
          });
        } else {
          setForm({
            ...form,
            file: e.target.files[0],
            [e.target.name]: URL.createObjectURL(e.target.files[0]),
          });
        }
      } else {
        setAlert({
          ...alert,
          status: true,
          type: "danger",
          message: "type image png | jpg | jpeg",
        });
        setForm({
          ...form,
          file: "",
          [e.target.name]: "",
        });
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let formData = new FormData();

      formData.append("avatar", form.file);
      formData.append("name", form.name);
      formData.append("role", form.role);

      const res = await postData("api/v1/speakers", formData, true);

      dispatch(
        setNotif(
          true,
          "success",
          `Berhasil tambah speaker ${res.data.data.name}`
        )
      );

      navigate("/speakers");
    } catch (error) {
      setAlert({
        status: true,
        type: "danger",
        message: error.response.data.msg,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <BreadCrumb
        textSecond={"Speakers"}
        urlSecond="/speakers"
        textThird="Create"
      />
      {alert.status && <AlertMessage type={alert.type} message={alert.message} />}
      <SpeakersForm 
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Container>
  );
}

export default CreateSpeakers;
