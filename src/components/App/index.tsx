import React, { ReactElement, useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import Routes from "routes/index";
import { store } from "store/appStore";

export default function App(): ReactElement {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
