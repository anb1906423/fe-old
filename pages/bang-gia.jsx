import React, { useState, useEffect } from 'react'
import Heading from '../components/Heading'
import PriceTableItem from '../components/PriceTableItem'
import Head from 'next/head'

const PriceTable = () => {
  const [priceTable, setPriceTable] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/admin/find-all-price-table')
      .then((res) => res.json())
      .then((priceTable) => {
        setPriceTable(priceTable)
      })
  }, [])
  return (
    <div className="price-table-group">
      <Head>
        <title>Bảng giá</title>
      </Head>
      <Heading title="Bảng giá" />
      <div className="">
        {priceTable?.length ? (
          priceTable.map((item, index) => {
            return (
              <PriceTableItem
                key={index}
                id={item.id}
                nameCar={item.nameCar}
                srcCar={item.srcCar}
                version={item.version}
                price={item.price}
              />
            )
          })
        ) : <p className="text-center w-100">Bảng giá xe đang được cập nhật!</p>
        }
      </div>
    </div >
  )
}

export default PriceTable