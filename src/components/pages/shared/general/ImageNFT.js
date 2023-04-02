import React from "react";

export default function NFTImage({ img_url }) {
  return (
    <img
      src={img_url}
      style={{ height: 776, maxWidth: 680, width: "100%", borderRadius: 12 }}
    />
  );
}
