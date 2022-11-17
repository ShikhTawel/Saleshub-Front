import React from "react"

const ECard = ({ children, className, ...props }) => (
  <div
    className={`w-full rounded-lg  border ${
      className !== undefined ? className : ""
    }`}
  >
    <div className={"w-full rounded-md bg-white   "}>{children}</div>
  </div>
)
ECard.Header = (props) => (
  <div
    style={{ background: "#faf9fb" }}
    className={`card-header rounded-tl-md rounded-tr-md border-b p-2 ${props.className}`}
  >
    {props.children}
  </div>
)
ECard.Body = (props) => (
  <div className={`card-body p-3 ${props.className}`}>{props.children}</div>
)
ECard.Footer = (props) => (
  <div className={`card-header rounded-b-md  p-3 ${props.className}`}>
    {props.children}{" "}
  </div>
)
export default ECard
