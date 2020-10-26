import React from "react";

export default function Card({ name, imgSrc }) {
  return (
    <div className="wrapper">
      <img src={imgSrc} width={100} height={250} />
    </div>
  );
}
