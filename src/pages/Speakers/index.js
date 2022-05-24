import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AlertMessage from "../../components/Alert";
import BreadCrumb from "../../components/BreadCrumb";
import Button from "../../components/Button";
import SearchInput from "../../components/SearchInput";
import TableWithAction from "../../components/TableWithAction";
import { fetchSpeakers, setKeyword } from "../../redux/speakers/action";
import { deleteData } from "../../utils/fetchData";

function Speakers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const notif = useSelector((state) => state.notif);
  const speakers = useSelector((state) => state.speakers);

  useEffect(() => {
    return () => {
      if (!user.token) return navigate("/login");
    };
  });

  useEffect(() => {
    dispatch(fetchSpeakers());
  }, [dispatch, speakers.keyword]);

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
        const res = await deleteData(`api/v1/speakers/${id}`);
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${res.data.data.name} berhasil dihapus`,
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(fetchSpeakers());
      }
    });
  };

  return (
    <Container>
      <Button action={() => navigate("/speakers/create")}>Tambah</Button>
      <BreadCrumb textSecond="Speakers" />
      <SearchInput
        name="keyword"
        query={speakers.keyword}
        handleChange={(e) => dispatch(setKeyword(e.target.value))}
      />
      {notif.status && (
        <AlertMessage type={notif.typeNotif} message={notif.message} />
      )}
      <TableWithAction
        status={speakers.status}
        thead={["Nama", "Avatar", "Role", "Aksi"]}
        data={speakers.data}
        tbody={["name", "avatar", "role"]}
        editUrl="/speakers/edit"
        deleteAction={handleDelete}
      />
    </Container>
  );
}

export default Speakers;
