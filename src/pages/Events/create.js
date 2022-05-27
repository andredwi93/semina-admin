import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchListCategories,
  fetchListSpeakers,
} from "../../redux/lists/action";
import { setNotif } from "../../redux/notif/actions";
import { postData } from "../../utils/fetchData";
import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/BreadCrumb";
import AlertMessage from "../../components/Alert";
import EventsForm from "./form";

function CreateEvents() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lists = useSelector((state) => state.lists);

  const [form, setForm] = useState({
    title: "",
    price: "",
    date: "",
    file: "",
    cover: "",
    about: "",
    venueName: "",
    tagline: "",
    keyPoint: [""],
    category: "",
    speaker: "",
    stock: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchListCategories());
    dispatch(fetchListSpeakers());
  }, [dispatch]);

  const handleChange = (e) => {
    if (e.target.name === "cover") {
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

  const handleChangeKeyPoint = (e, i) => {
    let _temp = [...form.keyPoint];
    _temp[i] = e.target.value;
    setForm({ ...form, keyPoint: _temp });
  };

  const handlePlusKeyPoint = () => {
    let _temp = [...form.keyPoint];
    _temp.push("");
    setForm({ ...form, keyPoint: _temp });
  };

  const handleMinusKeyPoint = (index) => {
    let _temp = [...form.keyPoint];
    let removeIndex = _temp
      .map(function (item, i) {
        return i;
      })
      .indexOf(index);

    _temp.splice(removeIndex, 1);
    setForm({ ...form, keyPoint: _temp });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let formData = new FormData();
      formData.append("cover", form.file);
      formData.append("title", form.title);
      formData.append("price", form.price);
      formData.append("date", form.date);
      formData.append("about", form.about);
      formData.append("venueName", form.venueName);
      formData.append("tagline", form.tagline);
      formData.append("keyPoint", JSON.stringify(form.keyPoint));
      formData.append("category", form.category);
      formData.append("speaker", form.speaker);
      formData.append("stock", form.stock);
      formData.append("status", true);

      const res = await postData("api/v1/events", formData, true);

      dispatch(
        setNotif(
          true,
          "success",
          `Berhasil tambah event ${res.data.data.title}`
        )
      );
      navigate('/events')
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
        textSecond={"Events"}
        urlSecond="/events"
        textThird={"Create"}
      />
      {alert.status && <AlertMessage type={alert.type} message={alert.message} />}
      <EventsForm 
        form={form}
        handleChange={handleChange}
        handleChangeKeyPoint={handleChangeKeyPoint}
        handleSubmit={handleSubmit}
        handlePlusKeyPoint={handlePlusKeyPoint}
        handleMinusKeyPoint={handleMinusKeyPoint}
        lists={lists}
        isLoading={isLoading}
      />
    </Container>
  );
}

export default CreateEvents;
