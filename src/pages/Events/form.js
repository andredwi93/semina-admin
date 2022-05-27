import React from "react";
import {
  CloseButton,
  Figure,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import TextInputWithLabel from "../../components/TextInputWithLabel";
import Button from "../../components/Button";
import SelectBox from "../../components/SelectBox";

function EventsForm({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
  lists,
  handleChangeKeyPoint,
  handlePlusKeyPoint,
  handleMinusKeyPoint,
}) {
  return (
    <Form className="mb-3">
      <TextInputWithLabel
        placeholder={"Masukkan Judul"}
        label="Judul"
        name="title"
        value={form.title}
        type="text"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukkan Harga"}
        label="Harga"
        name="price"
        value={form.price}
        type="number"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukkan Stok"}
        label="Stok"
        name="stock"
        value={form.stock}
        type="text"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukkan Tanggal Acara"}
        label="Tanggal"
        name="date"
        value={form.date}
        type="datetime-local"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukkan Deskripsi"}
        label="Deskripsi"
        name="about"
        value={form.about}
        type="text"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukkan Tempat Acara"}
        label="Tempat Acara"
        name="venueName"
        value={form.venueName}
        type="text"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukkan Tagline"}
        label="Tagline"
        name="tagline"
        value={form.tagline}
        type="text"
        onChange={handleChange}
      />
      <Form.Label>Key Point</Form.Label>
      {form.keyPoint.map((value, index) => (
        <InputGroup className="mb-3" key={index}>
          <FormControl
            placeholder="Masukkan key point"
            value={value}
            type="text"
            name="keyPoint"
            onChange={(e) => handleChangeKeyPoint(e, index)}
          />
          {index !== 0 && (
            <InputGroup.Text id="basic-addon2">
              <CloseButton onClick={() => handleMinusKeyPoint(index)} />
            </InputGroup.Text>
          )}
        </InputGroup>
      ))}
      <Button variant="success" action={handlePlusKeyPoint} size="sm">
        Tambah Keypoint
      </Button>

      <SelectBox
        label="Kategori"
        placeholder="Masukkan Kategori"
        name="category"
        value={form.category}
        options={lists.categories}
        handleChange={(e) => handleChange(e)}
      />

      <SelectBox
        label="Pembicara"
        placeholder="Masukkan Pembicara"
        name="speaker"
        value={form.speaker}
        options={lists.speakers}
        handleChange={(e) => handleChange(e)}
      />

      <TextInputWithLabel
        placeholder={"Masukkan Cover"}
        label="Cover"
        name="cover"
        type="file"
        onChange={handleChange}
      />
      {form.cover !== '' && (
        <div>
          <Figure>
            <Figure.Image 
              width={171}
              height={180}
              alt='171x180'
              src={form.cover}
            />
            <Figure.Caption>Perview image cover</Figure.Caption>
          </Figure>
        </div>
      )}
      <Button variant='primary' action={handleSubmit} loading={isLoading}>
        {edit ? 'Ubah' : 'Simpan'}
      </Button>
    </Form>
  );
}

export default EventsForm;
