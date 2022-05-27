import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchListCategories,
  fetchListSpeakers,
} from "../../redux/lists/action";
import { setNotif } from "../../redux/notif/actions";
import { getData, postData, putData } from "../../utils/fetchData";
import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/BreadCrumb";
import AlertMessage from "../../components/Alert";
import EventsForm from "./form";
import moment from "moment";
import { config } from "../../configs";

function EditEvents() {
  const {id} = useParams();
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

  const fetchOneEvent = async () => {
    const res = await getData(`api/v1/events/${id}`);
    
    setForm({
      ...form,
      title: res.data.data.title,
      price: res.data.data.price,
      date: moment(res.data.data.date).format('YYYY-MM-DDTHH:SS'),
      file: `${config.apiImg}/${res.data.data.cover}`,
      cover: `${config.apiImg}/${res.data.data.cover}`,
      about: res.data.data.about,
      venueName: res.data.data.venueName,
      tagline: res.data.data.tagline,
      keyPoint: res.data.data.keyPoint,
      category: {
        label: res?.data?.data?.category?.name,
        target: { name: 'category', value: res?.data?.data?.category?._id },
        value: res?.data?.data?.category?._id,
      },
      speaker: {
        label: res?.data?.data?.speaker?.name,
        target: { name: 'speaker', value: res?.data?.data?.speaker?._id },
        value: res?.data?.data?.speaker?._id,
      },
      stock: res.data.data.stock,
    })
  }

  useEffect(() => {
    fetchOneEvent()
  }, [])
  

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

      const res = await putData(`api/v1/events/${id}`, formData, true);

      dispatch(
        setNotif(
          true,
          "success",
          `Berhasil ubah event ${res.data.data.title}`
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
        edit
      />
    </Container>
  );
}

export default EditEvents;
