import React from "react";
import { NavBar } from "~/components";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
