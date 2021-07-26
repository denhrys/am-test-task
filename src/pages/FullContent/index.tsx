import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { selectIdsByOrder } from "store/articles/articlesSlice";

import s from "./style.module.css";
import Column from "components/Column";

export default function index(): ReactElement | null {
  const articleIDs = useSelector(selectIdsByOrder);
  return (
    <section className={s.section}>
      <h2 className={s.header}>Page 1. Full content</h2>
      <ul className={s.info}>
        <li>Delete and resore any number of articles in parallel</li>
        <li>Edit article title</li>
      </ul>
      {articleIDs.map((rowIDs) => (
        <div key={rowIDs.join(":")} className="row">
          {rowIDs.map((id) => (
            <Column key={id} id={id} />
          ))}
        </div>
      ))}
    </section>
  );
}
