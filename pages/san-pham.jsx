import React, { useState, useEffect } from 'react'
import ProductItem from '../components/ProductItem'
import Heading from '../components/Heading'
import Head from 'next/head'

const Product = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/admin')
      .then((res) => res.json())
      .then((products) => {
        setProducts(products)
      })
  }, [])

  console.log(products);
  return (
    <div className="product-page">
      <Head>
        <title>Sản phẩm</title>
      </Head>
      <Heading title="Xe du lịch" />
      <div className="product-container d-flex flex-row flex-wrap justify-content-start">
        {
          products.map((item, index) => {
            if (item.type === 'Xe du lịch' && item.newProduct) {
              return (
                <ProductItem className="" key={index} name={item.name} src={item.src} href={item.id} price={item.price} />
              )
            }
          })
        }
      </div>

      <Heading title="Xe tải" />
      <div className="product-container d-flex flex-row flex-wrap justify-content-start ">
        {
          products.map((item, index) => {
            if (item.type === 'Xe tải'  && item.newProduct) {
              return (
                <ProductItem className="" key={index} name={item.name} src={item.src} href={item.id} price={item.price} />
              )
            }
          })
        }
      </div>
    </div>
  )
}

export default Product