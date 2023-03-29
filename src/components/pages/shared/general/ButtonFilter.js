import { useState, useEffect } from "react";
import axios from "axios";
import { Select, MenuItem, Button } from "@mui/material";

export default function ButtonFilter(props) {
  const [foundations, setFoundations] = useState([]);
  const [token, setToken] = useState({});
  const [selectedFoundation, setSelectedFoundation] = useState(null);
  const [filteredFoundations, setFilteredFoundations] = useState(foundations);

  useEffect(() => {
    // Watch for changes to the `foundation` prop and update the `selectedFoundation` state
    setSelectedFoundation(props.foundation);
  }, [props.foundation]);

  useEffect(() => {
    axios
      .post("https://portus-api.herokuapp.com/oauth/token", {
        grant_type: "client_credentials",
        client_id: `${process.env.REACT_APP_CLIENT_ID}`,
        client_secret: `${process.env.REACT_APP_CLIENT_SECRET}`,
      })
      .then((res) => setToken(res.data.access_token))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://portus-api.herokuapp.com/api/v1/foundations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFoundations(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  const handleFoundationSelect = (event) => {
    const foundationId = event.target.value;
    setSelectedFoundation(foundationId);
  };

  useEffect(() => {
    if (selectedFoundation) {
      const filtered = foundations.filter(
        (foundation) => foundation.id === selectedFoundation
      );
      setFilteredFoundations(filtered);
      props.setSelectedFoundation(selectedFoundation);
    } else {
      setFilteredFoundations(foundations);
      props.setSelectedFoundation(null);
    }
  }, [selectedFoundation, foundations]);

  return (
    <>
      <Select
        style={{
          borderRadius: 15,
          color: "#E46842",
        }}
        value={selectedFoundation || ""}
        onChange={handleFoundationSelect}
        displayEmpty
        renderValue={() =>
          selectedFoundation
            ? foundations.find((f) => f.id === selectedFoundation)?.name || ""
            : "เลือกตามมูลนิธิ"
        }
      >
        <MenuItem value="">ผลงานศิลปะทั้งหมด</MenuItem>
        {foundations.map((foundation) => (
          <MenuItem
            key={foundation.id}
            value={foundation.id}
            style={{
              borderRadius: 15,
              color: "#E46842",
            }}
          >
            {foundation.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
