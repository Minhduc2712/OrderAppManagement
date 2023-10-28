import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Modal } from "reactstrap";
import { useSelector } from "react-redux";
import { selectFormStatus } from "../../Redux/Selector/FormSelector";
import { selectlistCategory } from "../../Redux/Selector/CategorySelector";

const ModalCreateNewProduct = (props) => {
  const { onHandleClose, onHandleCreate } = props;
  const { data: listCategory } = useSelector(selectlistCategory);
  const { showFormCreate: isOpen } = useSelector(selectFormStatus);

  const initialValues = {
    name: "",
    img: "",
    country: "",
    price: "",
    rate: 0,
    category: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    country: Yup.string().required("Country is required"),
    price: Yup.number().required("Price is required"),
    rate: Yup.number(),
    category: Yup.string().required("Category is required"),
  });

  const handleSubmit = async (values) => {
    if (!values.name || !values.country || !values.price || !values.category) {
      alert("Please fill in all required fields");
    } else {
      console.log("values", values);
      onHandleCreate(values);
    }
  };

  const handleClose = () => {
    onHandleClose();
  };

  const categoryItem = listCategory.map((category, index) => {
    return (
      <MenuItem value={category.id} key={index}>
        {category.name}
      </MenuItem>
    );
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Typography variant="h5" align="center" gutterBottom>
              Add New Product
            </Typography>

            <Box
              sx={{
                "& .MuiTextField-root": { m: 1.2, width: "75%" },
              }}
            >
              <div>
                <Field
                  as={TextField}
                  type="text"
                  name="name"
                  label="Name"
                  fullWidth
                  variant="outlined"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div>
                <Field
                  as={TextField}
                  type="file" // Set type to "file" for image uploads
                  name="img"
                  label="Image"
                  fullWidth
                  variant="outlined"
                />
              </div>

              <div>
                <Field
                  as={TextField}
                  type="text"
                  name="country"
                  label="Country"
                  fullWidth
                  variant="outlined"
                />
                <ErrorMessage
                  name="country"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div>
                <Field
                  as={TextField}
                  type="number"
                  name="price"
                  label="Price"
                  fullWidth
                  variant="outlined"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div>
                <Field
                  as={TextField}
                  type="number"
                  name="rate"
                  label="Rate"
                  fullWidth
                  variant="outlined"
                />
              </div>

              <div>
                <InputLabel htmlFor="category">Category</InputLabel>
                <Field as={Select} name="category" fullWidth variant="outlined">
                  <MenuItem value="" disabled>
                    Select Category
                  </MenuItem>
                  {categoryItem}
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <Box sx={{ "& button": { m: 1 } }}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
                <Button variant="outlined" color="error" onClick={handleClose}>
                  Close
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ModalCreateNewProduct;
