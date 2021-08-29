/**
 * 自定义hook
 * hook都是函数
 * 命名以use
 * 内部可调用其他的hook
 * 并非react的特性
 */
import { useContext } from 'react'
import { appSetStateContext } from '../AppState'

export const useAddToCart = () => {
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
  return addToCart;
}

/**
 * 外部怎么引用这个hook
 */

// import { useAddToCart } from './AddToCart'

// const addToCart = useAddToCart();
