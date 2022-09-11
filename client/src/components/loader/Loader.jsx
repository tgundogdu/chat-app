import React from "react";
import { Pane, Portal, Spinner } from "evergreen-ui";
import "./loader.scss";

const Loader = ({ show }) => {
  if (!show) {
    return null;
  }
  return (
    <Portal>
      <Pane className="loader">
        <Spinner />
      </Pane>
    </Portal>
  );
};

export default Loader;
