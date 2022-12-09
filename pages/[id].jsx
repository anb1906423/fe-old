import React, { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import Heading from '../components/Heading'
import ProductItem from '../components/ProductItem'
import Head from 'next/head'

const ProductDetail = () => {
    const router = useRouter();
    const productId = router.query.id;

    console.log(productId);
    console.log(router);
    const [products, setProducts] = useState([])
    const [otherProducts, setOtherProducts] = useState([])
    console.log(otherProducts);
    console.log(products);
    useEffect(() => {
        fetch('http://localhost:3001/admin')
            .then((res) => res.json())
            .then((products) => {
                setProducts(products)
                setOtherProducts(products.sort(() => Math.random() - Math.random()))
            })
    }, [])

    return (
        <div className='product-detail-wrapper'>
            {
                products.map((item, index) => {
                    if (item.id === productId) {
                        return (
                            <div className='product-detail' key={index}>
                                <Head>
                                    <title>{item.name}</title>
                                </Head>
                                <div className="product-infor d-flex flex-row flex-wrap justify-content-start">
                                    <div className="product-imgs">
                                        <img src={item.src} alt="" />
                                    </div>
                                    <div className="product-content">
                                        <div className="product-name">
                                            <h3>{item.name}</h3>
                                            <div className="price-group d-flex justify-content-between">
                                                <b>Giá bán:</b><h4 className="text-danger">{item.price}&nbsp;VNĐ</h4>
                                            </div>
                                            <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })
            }
            <Heading title="Một vài mẫu xe khác" />
            <div className="other-products w-100 d-flex flex-row flex-wrap justify-content-around">
                {
                    otherProducts.map((item, index) => {
                        if (index <= 2) {
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

export default ProductDetail
