import React, { useState } from "react";
import { useField } from "formik";
import { Input, Box } from "@mui/material";

const ImageUpload = ({ field, form, ...props }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fieldInput, meta] = useField(field.name);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      form.setFieldValue(field.name, file);
    }
  };

  return (
    <Box>
      <Input
        type="file"
        onChange={handleFileChange}
        {...fieldInput}
        {...props}
      />
      {meta.touched && meta.error && (
        <div style={{ color: "red" }}>{meta.error}</div>
      )}
      {selectedFile && (
        <img
          src={URL.createObjectURL(selectedFile)}
          alt="Preview"
          style={{ maxWidth: "100%", maxHeight: "200px", marginTop: "10px" }}
        />
      )}
    </Box>
  );
};

export default ImageUpload;
