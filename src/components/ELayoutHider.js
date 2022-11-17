import { Route } from "react-router-dom"

const ELayoutHider = ({ path, element, isLayoutVisible }) => (
  <Route path={path} element={element} />
)
