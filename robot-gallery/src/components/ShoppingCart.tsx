import React from "react";
import styles from "./ShoppingCart.module.css"
import { FiShoppingCart } from "react-icons/fi"
import { appContext} from '../AppState'

interface Props {
  
}

interface State {
  isOpen: boolean;

}

class ShoppingCart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // 构建函数是唯一可以初始化state的地方
    this.state = {
      isOpen: false,
    };
    // this.handleClick = this.handleClick.bind(this)
  }

  handleClick = (e: React.MouseEvent<HTMLElement>) => {// 用箭头函数或者bind绑定作用域
    console.log(e.target)
    console.log(e.currentTarget)
    if ((e.target as HTMLElement).nodeName === "SPAN") {
      this.setState({ isOpen: !this.state.isOpen })
    }
  }

  render() {
    return (
      <appContext.Consumer>{(value)=>{
        return <div className={styles.cartContainer}>
          <button className={styles.button}
            onClick={this.handleClick}>
            <FiShoppingCart />
            <span>购物车 { value.shoppingCart.items.length} (件)</span>
          </button>
          <div className={styles.cartDropDown}
            style={{
              display: this.state.isOpen ? "block" : "none"
            }}>
            <ul>
              {value.shoppingCart.items.map(i => <li>{ i.name}</li>)}
            </ul>
          </div>
        </div>
      }}</appContext.Consumer>)
  }
}

export default ShoppingCart