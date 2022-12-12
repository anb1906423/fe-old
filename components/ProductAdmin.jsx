import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { swalert, swtoast } from "../mixins/swal.mixin";

const ProductAdmin = (props) => {
    const [products, setProducts] = useState([])
    const time = new Date(props.created)
    const createAt = time.toLocaleDateString()

    const deleteProduct = async (id) => {
        const body = {
            id: id,
            isDeleteAll: false
        }
        console.log(id);
        swalert
            .fire({
                title: "Xác nhận xóa xe",
                icon: "warning",
                text: "Bạn chắc chắn muốn xóa xe?",
                showCloseButton: true,
                showCancelButton: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await axios.post('http://localhost:3001/admin/delete', body);
                        const productsList = products.filter(product => product.id !== id)
                        setProducts(productsList);
                        swtoast.success({
                            text: "Xe đã được xóa!!",
                        });
                    } catch (err) {
                        if (err.response.status === 400) {
                            console.log("Product id is required!")
                        }
                        console.log(`Error: ${err.message}`);
                        swtoast.error({
                            text: "Đã xảy ra lỗi khi xóa xe. Vui lòng reload lại trang!",
                        });
                    }
                }
            })
    }

    const propsId = (id) => {
        const url = 'http://localhost:3000/'
        return url + id
    }
    return (
        <div className="table-responsive">
            <table className="table align-middle product-admin w-100">
                <tbody className='w-100 text-center'>
                    <tr className="w-100 d-flex align-items-center justify-content-between">
                        <td className=""><img src={props.src} alt={props.name} /></td>
                        <td className="name"><p>{props.name}</p></td>
                        <td className="text-danger fw-bold"><p>{props.price}&nbsp;VNĐ</p></td>
                        <td className="createAt"><p>{createAt}</p></td>
                        <td className="d-none d-sm-flex justify-content-around manipulation">
                            <Link href={propsId(props.href)}>
                                <button className="btn btn-primary manipulation-btn">Xem</button>
                            </Link>
                            <button onClick={() => deleteProduct(props.href)} className="btn btn-danger manipulation-btn">Xóa</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ProductAdmin