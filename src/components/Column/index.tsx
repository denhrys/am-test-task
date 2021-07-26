import React, { ReactElement, ReactNode, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import cn from "classnames";
import {
  selectArticlesById,
  scheduleDeleteArticle,
  restoreArticle,
} from "store/articles/articlesSlice";
import ArticleModel from "models/ArticleModel";
import EditableTitle from "components/EditableTitle";
import s from "./style.module.css";
import Button from "components/Button";
import RestoreArticle from "components/RestoreArticle";

interface Props {
  id: string;
}

export default function Column({ id }: Props): ReactElement | null {
  const dispatch = useDispatch();
  const articlesById = useSelector(selectArticlesById);

  const article = new ArticleModel(id, articlesById);

  const handleDeleteButtonClick = () => {
    dispatch(scheduleDeleteArticle(id));
  };

  return article.isDeleted ? null : (
    <article className={cn(s.article, article.classNameByWidth())}>
      {article.isScheduledToBeDeleted && (
        <RestoreArticle id={id} className={s["restore-article"]} />
      )}
      {!article.isScheduledToBeDeleted && (
        <Button
          onClick={handleDeleteButtonClick}
          className={s["delete-button"]}
          text="Delete"
        />
      )}
      <picture>
        <source
          media="(max-width: 640px)"
          srcSet={article.imageUrlByWidth(640)}
        />
        <source
          media="(max-width: 1024px)"
          srcSet={article.imageUrlByWidth(1024)}
        />
        <img
          loading="lazy"
          className={s["article-image"]}
          src={article.imageUrlByWidth(1024)}
          alt={article.title}
        />
      </picture>
      <EditableTitle id={id} title={article.title} />
    </article>
  );
}
