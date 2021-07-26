import Header from "components/Header";
import React, { ReactElement, ReactNode } from "react";
import s from "./style.module.css";

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props): ReactElement {
  return (
    <>
      <Header className={s.header} title={"Test assignment"} />
      <main className={s["main-container"]}>{children}</main>
    </>
  );
}
