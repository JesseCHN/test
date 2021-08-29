import React, { useContext } from "react";
import styles from './Robots.module.css'
// import {appContext} from '../index'
import { appContext, } from '../AppState'
import { withAddToCart } from './AddToCart'

export interface RobotNextProps {
  id: number;
  name: string;
  email: string;
  addToCart: (id, name) => void;

}

const RobotNext: React.FC<RobotNextProps> = ({ id, name, email, addToCart }) => {
  const value = useContext(appContext)
  return (
    <div className={styles.cardContainer}>
      <img alt="robot" src={`https://robohash.org/${id}`} />
      <h2>Robot next</h2>
      <h2>{name}</h2>
      <p>{email}</p>
      <p>作者：{value.username}</p>
      <button onClick={()=> addToCart(id,name) }>加入购物车</button>
    </div>
  )
  // return (
  //   <appContext.Consumer>
  //     {(value)=>{
  //       return <div className={styles.cardContainer}>
  //         <img alt="robot" src={`https://robohash.org/${id}`} />
  //         <h2>{name}</h2>
  //         <p>{email}</p>
  //         <p>作者：{ value.username }</p>
  //       </div>
  //     }}
  //   </appContext.Consumer>
  // )
}

export default withAddToCart(RobotNext)