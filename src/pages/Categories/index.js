import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import BreadCrumb from "../../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/TableWithAction";
import { fetchCategories } from "../../redux/categories/action";
import AlertMessage from "../../components/Alert";
import Swal from "sweetalert2";
import { deleteData } from "../../utils/fetchData";

function Categories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const categories = useSelector((state) => state.categories);
  const notif = useSelector((state) => state.notif);

  useEffect(() => {
    return () => {
      if (!user.token) return navigate("/login");
    };
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then( async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`api/v1/categories/${id}`)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${res.data.data.name} berhasil dihapus`,
          showConfirmButton: false,
          timer: 1500
        })
        dispatch(fetchCategories());
      }
    })
  };

  return (
    <Container>
      <Button action={() => navigate("/categories/create")}>Tambah</Button>
      <BreadCrumb textSecond="Categories" />
      {notif.status && (
        <AlertMessage type={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={categories.status}
        data={categories.data}
        thead={["Nama", "Aksi"]}
        tbody={["name"]}
        editUrl="/categories/edit"
        deleteAction={(id) => handleDelete(id)}
      />
    </Container>
  );
}

export default Categories;
