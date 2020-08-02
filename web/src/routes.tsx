import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import CreatePoint from "./page/CreatePoint";
import Home from "./page/Home";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route path="/create-point" component={CreatePoint} />
    </BrowserRouter>
  );
};

export default Routes;
