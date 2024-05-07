import { useReducer } from 'react'
import FormProduct from './FormProduct'
import ProductsList from './ProductsList'
import { initialState, sellerReducer } from '../reducers/seller-reducer'

export default function Seller() {
  const [state, dispatch]= useReducer(sellerReducer, initialState);
  return (
    <div className='flex'>
      <FormProduct state={state} dispatch={dispatch}/>
      <ProductsList products={state.productos} dispatch={dispatch}/>
    </div>
  )
}
