import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AlertMessage from "../../components/Alert";
import BreadCrumb from "../../components/BreadCrumb";
import ComponentButton from "../../components/Button";
import SearchInput from "../../components/SearchInput";
import SelectBox from "../../components/SelectBox";
import TableWithAction from "../../components/TableWithAction";
import {
  fetchEvents,
  setCategory,
  setKeyword,
  setSpeaker,
} from "../../redux/events/action";
import {
  fetchListCategories,
  fetchListSpeakers,
} from "../../redux/lists/action";
import { deleteData } from "../../utils/fetchData";

function EventsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const events = useSelector((state) => state.events);
  const lists = useSelector((state) => state.lists);
  const notif = useSelector((state) => state.notif);

  useEffect(() => {
    return () => {
      if (!user.token) return navigate("/login");
    };
  });

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch, events.keyword, events.speaker, events.category]);

  useEffect(() => {
    dispatch(fetchListCategories());
    dispatch(fetchListSpeakers());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`api/v1/events/${id}`);
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${res.data.data.title} berhasil dihapus`,
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(fetchEvents());
      }
    });
  };

  return (
    <Container>
      <ComponentButton action={() => navigate("/events/create")}>
        Tambah
      </ComponentButton>
      <BreadCrumb textSecond={"Events"} />
      <Row>
        <Col>
          <SearchInput
            name="keyword"
            query={events.keyword}
            handleChange={(e) => dispatch(setKeyword(e.target.value))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder="Masukkan kategori"
            name="category"
            value={events.category}
            options={lists.categories}
            isClearable={true}
            handleChange={(e) => dispatch(setCategory(e))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder="Masukkan pembicara"
            name="speaker"
            value={events.speaker}
            options={lists.speakers}
            isClearable={true}
            handleChange={(e) => dispatch(setSpeaker(e))}
          />
        </Col>
      </Row>
      {notif.status && (
        <AlertMessage type={notif.typeNotif} message={notif.message} />
      )}
      <TableWithAction
        status={events.status}
        thead={[
          "Judul",
          "Harga",
          "Tanggal",
          "Tempat",
          "Kategori",
          "Pembicara",
          "Aksi",
        ]}
        data={events.data}
        tbody={[
          "title",
          "price",
          "date",
          "venueName",
          "categoryName",
          "speakerName",
        ]}
        deleteAction={handleDelete}
        editUrl="/events/edit"
      />
    </Container>
  );
}

export default EventsPage;
