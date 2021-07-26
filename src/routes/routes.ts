import React, { lazy } from "react";

const FullContent = lazy(() => import("../pages/FullContent"));
const OnlyTitles = lazy(() => import("../pages/OnlyTitles"));

export const routes = [
  {
    path: "/full-content",
    name: "Full content",
    component: FullContent,
  },
  {
    path: "/only-titles",
    name: "Only titles",
    component: OnlyTitles,
  },
];
