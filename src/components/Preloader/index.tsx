import React, { ReactElement } from "react";
import s from "./style.module.css";

interface Props {}

export default function Preloader({}: Props): ReactElement {
  return <div className={s.container}>Loading...</div>;
}
