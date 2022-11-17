import { connect } from "react-redux"

const ECartCount = (props) => (
  <span className={props.className}>{props.shoppingCart.length}</span>
)
const mapStateToProps = (state) => ({
  shoppingCart: state.shoppingCart,
})
export default connect(mapStateToProps, {})(ECartCount)
