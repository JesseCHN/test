/**
 * HOC
 * HOC建议使用with开头命名
 * 封装Robot和RobotDiscount公共逻辑部分
 */

import React, { useContext } from 'react'
import { appSetStateContext } from '../AppState'
import { RobotNextProps } from './RobotNext'

export const withAddToCart = (ChildComponent: React.ComponentType<RobotNextProps>) => {
  // return class extends React.Component { } 
  return (props) => {
    const setState = useContext(appSetStateContext)

    const addToCart = (id, name) => {
      if (setState) {
        setState(state => {
          return {
            ...state,
            shoppingCart: {
              items: [...state.shoppingCart.items, { id, name }]
            }
          }
        })
      }
    }
    return <ChildComponent {...props} addToCart={addToCart} />
  }
}