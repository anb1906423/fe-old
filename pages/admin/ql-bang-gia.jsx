import React, { useRef, useState, useEffect } from 'react'
import PriceTableItem from '../../components/PriceTableItem'
import Heading from '../../components/Heading'
import HeaderAdmin from '../../components/HeaderAdmin'
import Head from 'next/head'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { swalert, swtoast } from "../../mixins/swal.mixin";

const versionList = ['Tiêu chuẩn (Base)', 'Cao cấp (Sport)', 'Số sàn']

const PriceTableManagePage = () => {
    const nameCarRef = useRef()
    const srcCarRef = useRef()
    const priceRef = useRef()

    const [nameCar, setNameCar] = useState('')
    const [srcCar, setSrcCar] = useState('')
    var [version, setVersion] = useState([])
    const [price, setPrice] = useState([])
    const [err, setErr] = useState('')
    const [versionCount, setVersionCount] = useState(2)

    const [priceTable, setPriceTable] = useState([])
    const [cookies, setCookies] = useCookies(['user'])
    const userCookie = cookies.user
    const [roles, setRoles] = useState('')
    const [token, setToken] = useState('')

    useEffect(() => {
        nameCarRef.current.focus()
    }, [])

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const userCookie = cookies.user

        setToken(userCookie.accessToken)
        setRoles(userCookie.roles)
        const getPriceTable = async () => {
            fetch('http://localhost:3001/admin/find-all-price-table', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((res) => res.json())
                .then((priceTable) => {
                    console.log(priceTable)
                    setPriceTable(priceTable)
                })
        }
        getPriceTable();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nameCar) {
            setErr("Tên xe không được để trống!");
            nameCarRef.current.focus();
            return
        }
        if (!price) {
            setErr("Giá xe không được để trống!");
            priceRef.current.focus();
            return
        }
        if (!srcCar) {
            setErr("Link ảnh không được để trống!");
            srcCarRef.current.focus();
            return
        }
        try {
            const versionCheck = version != '' ? version : versionList[0]
            version = versionCheck

            const token = userCookie.accessToken
            const body = { nameCar, price, srcCar, version }
            console.log(body);
            const response = await axios.post('http://localhost:3001/admin/add-price-table', body
                ,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                    withCredentials: true
                }
            )
            console.log(JSON.stringify(response?.data));
            console.log(response?.data);
            console.log(JSON.stringify(response))
            swtoast.success({
                text: "Xe được thêm thành công!!",
            });
            setNameCar('')
            setPrice('')
            setSrcCar('')
            setErr('')
        } catch (err) {
            if (!err?.response) {
                setErr("No server response")
            } else if (err.response.status === 400) {
                setErr("Tên xe, giá, link ảnh không được để trống!")
            } else if (err.response.status === 401) {
                setErr('Unauthorized')
            } else if (err.response.status === 422) {
                setErr("Bảng xe đã tồn tại!")
                swtoast.error({
                    text: "Bảng xe này đã tồn tại!!",
                });
                nameCarRef.current.focus();
            } else {
                setErr("Thêm bảng xe thất bại!");
            }
            console.log(err);
        }
        console.log(err);
    }

    const handleDeleteAll = async () => {
        const body = {
            isDeleteAll: true
        }
        swalert
            .fire({
                title: "Xóa tất cả bảng giá",
                icon: "warning",
                text: "Bạn muốn xóa tất cả bảng giá?",
                showCloseButton: true,
                showCancelButton: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await axios.post('http://localhost:3001/admin/delete-price-table', body)
                        setPriceTable(response.data)
                    } catch (err) {
                        console.log(err)
                    }
                }
            })
    }

    return (
        <div className='price-table-manage-page'>
            <Head>
                <title>Quản lý bảng giá</title>
            </Head>
            <HeaderAdmin />
            <div className="add-price-table-group">
                <Heading title='Thêm bảng giá' />
                <form id='add-price-table-form' action="" onSubmit={handleSubmit}>
                    <label htmlFor="name-car" className="w-100">Tên xe:</label>
                    <input
                        id="name-car"
                        placeholder="Nhập tên xe"
                        type="text"
                        className="w-100"
                        ref={nameCarRef}
                        value={nameCar}
                        onChange={(e) => setNameCar(e.target.value)}
                    />
                    <label htmlFor="src-car" className="w-100">Link ảnh:</label>
                    <input
                        id="src-car"
                        placeholder="Dán link ảnh"
                        type="text"
                        className="w-100"
                        ref={srcCarRef}
                        value={srcCar}
                        onChange={(e) => setSrcCar(e.target.value)}
                    />
                    <div className='version-price-box d-flex align-items-center justify-content-between'>
                        <div>
                            <label htmlFor="type">Phiên bản:</label>
                            <select name="" id="type" onChange={(e) => setVersion(version => [...version, e.target.value])} >
                                {
                                    versionList.map((item, index) =>
                                        <option value={item} key={index} name={item}>{item}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div>
                            <label className="" htmlFor="price">Giá:</label>
                            <input
                                id="price"
                                type="text"
                                className=''
                                placeholder="Ví dụ: 1.200.000.000, 560.000.000"
                                ref={priceRef}
                                value={price}
                                onChange={(e) => setPrice(price => [...price, e.target.value])}
                                required
                            />
                        </div>
                    </div>
                    <div className='version-price-box d-flex align-items-center justify-content-between'>
                        <div>
                            <label htmlFor="type">Phiên bản:</label>
                            <select name="" id="type" onChange={(e) => setVersion(version => [...version, e.target.value])} >
                                {
                                    versionList.map((item, index) =>
                                        <option value={item} key={index} name={item}>{item}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div>
                            <label className="" htmlFor="price">Giá:</label>
                            <input
                                id="price"
                                type="text"
                                className=''
                                placeholder="Ví dụ: 1.200.000.000, 560.000.000"
                                ref={priceRef}
                                value={price}
                                onChange={(e) => setPrice(price => [...price, e.target.value])}
                                required
                            />
                            {
                                console.log(price)
                            }
                        </div>
                    </div>
                    <div className='version-price-box d-flex align-items-center justify-content-between'>
                        <div>
                            <label htmlFor="type">Phiên bản:</label>
                            <select name="" id="type" onChange={(e) => setVersion(version => [...version, e.target.value])} >
                                {
                                    versionList.map((item, index) =>
                                        <option value={item} key={index} name={item}>{item}</option>
                                    )
                                }
                            </select>
                            {
                                console.log(version)
                            }
                        </div>
                        <div>
                            <label className="" htmlFor="price">Giá:</label>
                            <input
                                id="price"
                                type="text"
                                className=''
                                placeholder="Ví dụ: 1.200.000.000, 560.000.000"
                                ref={priceRef}
                                value={price}
                                onChange={(e) => setPrice(price => [...price, e.target.value])}
                                required
                            />
                        </div>
                    </div>
                    <p className="text-danger">{err}</p>
                    <div className="submit-wrapper w-100 text-center">
                        <button type="submit" className="submit-btn">THÊM BẢNG GIÁ</button>
                    </div>
                </form>
            </div >
            <div className="price-table-manage-group">
                <Heading title='Quản lý bảng giá' />
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
                ) : <p className="product-empty text-center w-100">Hiện tại danh sách bảng giá đang trống!</p>
                }
            </div>
            {
                priceTable?.length ? (
                    <div className="w-100 delete-group text-center">
                        <button type="button" onClick={handleDeleteAll} className="btn btn-danger text-center delete-all-product">Xóa tất cả</button>
                    </div>

                ) : ''
            }
        </div >
    )
}

export default PriceTableManagePage