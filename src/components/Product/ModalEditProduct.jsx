import React, { useState } from "react";
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
  Modal,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectlistCategory } from "../../Redux/Selector/CategorySelector";
import { selectProductById } from "../../Redux/Selector/ProductSelector";
import { selectFormStatus } from "../../Redux/Selector/FormSelector";

const EditProductModal = (props) => {
  const { onHandleClose, onHandleEdit, productId } = props;
  const { showFormEdit: isOpen } = useSelector(selectFormStatus);
  const { data: listCategory } = useSelector(selectlistCategory);
  const { dataById: product } = useSelector(selectProductById);

  const selectedCategoryId = listCategory.find(
    (category) => category.name === product.categoryName
  )?.id;

  const categoryItems = listCategory.map((category, index) => (
    <MenuItem value={category.id} key={index}>
      {category.name}
    </MenuItem>
  ));

  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryId);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    country: Yup.string().required("Country is required"),
    price: Yup.number().required("Price is required"),
    rate: Yup.number(),
    category: Yup.string().required("Category is required"),
  });

  const handleSubmit = (values) => {
    onHandleEdit(values);
    onHandleClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onHandleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div>
        <Formik
          initialValues={{
            name: product.name || "",
            img: product.img || "",
            country: product.country || "",
            rate: product.rate || 0,
            category: selectedCategory || "", // Use selectedCategory here
          }}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Typography variant="h5" align="center" gutterBottom>
                Edit Product
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
                    type="string"
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
                  <Select
                    name="category"
                    fullWidth
                    variant="outlined"
                    value={selectedCategory} // Set the value of the Select
                    onChange={(e) => setSelectedCategory(e.target.value)} // Handle change event
                  >
                    <MenuItem value="" disabled>
                      Select Category
                    </MenuItem>
                    {categoryItems}
                  </Select>
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
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={onHandleClose}
                  >
                    Close
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default EditProductModal;
