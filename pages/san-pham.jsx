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

  return (
    <div className="product-page">
      <Head>
        <title>Sản phẩm</title>
        <meta name="title" content="Xe Suzuki thành phố Cần Thơ" />
        <meta name='revisit-after' content='1 days' />
        <meta http-equiv="content-language" content="vi" />
        <meta name='city' content='Cần Thơ' />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name='description' content="Trang trưng bày, tham khảo, chi tiết thông số cũng như giá bán các dòng xe Suzuki chính hãng. Tư vấn tận tình, giá cả hợp lý, đáng tin cậy, được nhiều khách hàng tin tưởng lựa chọn." />
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
            if (item.type === 'Xe tải' && item.newProduct) {
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