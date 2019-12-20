import React from "react";
import { Switch, Route } from "react-router-dom";

import Feed from "./pages/Feed";
import New from "./pages/New";

function Routes() {
  return (
    //Verifica se contem o path, n se é exata -> se tiver exact compara isso!
    <Switch>
      <Route path="/" exact component={Feed} />
      <Route path="/new" component={New} />
    </Switch>
  );
}

export default Routes;
