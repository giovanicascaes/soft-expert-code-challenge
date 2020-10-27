import React from "react";
import { classNames } from "~/utils";

export default function Badge({ className, ...otherProps }) {
  return <div {...otherProps} className={classNames("badge", className)} />;
}
