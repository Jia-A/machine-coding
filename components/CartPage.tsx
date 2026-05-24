'use client'
import { products } from '@/data/ProductData'
import ProductList from './ProductList'
import CartPanel from './CartPanel'
import useCart from '@/providers/useCart'
const CartPage = () => {
    const {items, dispatch} = useCart()
    console.log(items)
  return (
    <div className='flex'>
        <div className='w-1/2'>
        <ProductList products={products} dispatch={dispatch}/>
        </div>
        <div className='w-1/2'>
        <CartPanel items={items} dispatch={dispatch}/></div>
    </div>
  )
}

export default CartPage