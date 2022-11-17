import { NavLink } from "react-router-dom"

const FNavLink = ({ to, children, setIsSideBarOpen }) => (
  <>
    <NavLink
      onClick={() => setIsSideBarOpen(false)}
      to={to}
      className={(navData) =>
        "flex items-center justify-start gap-2 rounded-md py-2 px-3 font-medium  " +
        (navData.isActive
          ? "primary-shadow border-b border-gray-400 bg-white font-bold text-orient-500 shadow-md shadow-inner"
          : "text-white")
      }
    >
      {children}
    </NavLink>
  </>
)
export default FNavLink
