import ProductList from '@/components/productList'
import Head from 'next/head'
export default function Home() {
  return (
    <div className='kg__container kg-expanded'>
      <ProductList />
    </div>
  )
}
