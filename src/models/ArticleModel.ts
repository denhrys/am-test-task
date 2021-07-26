import { ArticleState } from "./../store/articles/articlesSlice";
import { Article } from "helpers/articlesAPIClient";
import { getColumnClassName } from "helpers/utils";
import { ById, ArticleById } from "store/articles/articlesSlice";
import cn from "classnames";

export default class ArticleModel {
  data: ArticleById | undefined;

  constructor(id: string, articlesById: ById<ArticleById>) {
    this.data = articlesById[id];
  }

  get id(): string | undefined {
    return this.data?.id;
  }

  get isDeleted(): boolean {
    if (!this.data) return true;
    return this.data?.state === "deleted";
  }

  get isScheduledToBeDeleted(): boolean {
    if (!this.data) return false;
    return this.data.state === "sceduled-delete";
  }

  classNameByWidth(): string {
    return cn("col", getColumnClassName(this.data?.width || 1));
  }

  get imageUrl(): string {
    return this.data?.imageUrl || "";
  }

  imageUrlByWidth(screenWidth: number): string {
    if (!this.data) return "";
    const imageWidth = Math.ceil((screenWidth / 12) * this.data.width);
    return `${this.data.imageUrl}&width=${imageWidth}`;
  }

  get title(): string {
    return this.data?.title || "";
  }
}
