import ArticleModel from "models/ArticleModel";
import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import {
  selectArticlesById,
  selectIdsByOrder,
} from "store/articles/articlesSlice";
import s from "./style.module.css";

interface Props {}

export default function OnlyTitles({}: Props): ReactElement {
  const articleIDs = useSelector(selectIdsByOrder);
  const articlesByID = useSelector(selectArticlesById);

  return (
    <section className={s.section}>
      <h2 className={s.header}>Page 2. Only article titles</h2>
      {articleIDs.map((rowIDs) => {
        return rowIDs.map((id) => {
          const article = new ArticleModel(id, articlesByID);
          return (
            <li key={article.id} className={s.row}>
              {article.title}
            </li>
          );
        });
      })}
    </section>
  );
}
