import ProductList from '@/components/productList'
import Head from 'next/head'
export default function Home(props) {
  console.log(props);
  return (
    <div className='kg__container kg-expanded'>
      <ProductList />
    </div>
  )
}
