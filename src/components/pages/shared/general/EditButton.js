import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditButton = ({ oauthToken }) => {
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    handleMenuClose();
    // Send POST request to update status
    axios
      .post(
        "https://portus-api.herokuapp.com/api/v1/artworks/change_status",
        {
          id: id,
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${oauthToken}`,
          },
        }
      )
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));

    window.location.reload();
  };

  return (
    <>
      <Button onClick={handleMenuOpen} startIcon={<EditIcon />} color="primary">
        แก้ไข
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleStatusChange("available")}>
          แก้ไขสถานะเป็น "พร้อมขาย"
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange("unavailable")}>
          แก้ไขสถานะเป็น "ไม่สามารถซื้อได้"
        </MenuItem>
      </Menu>
    </>
  );
};

export default EditButton;
