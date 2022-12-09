import React, { useState, useEffect } from 'react'
import HeaderAdmin from '../../components/HeaderAdmin'
import Heading from '../../components/Heading'
import { FaRegCopy } from 'react-icons/fa'
import { swtoast } from "../../mixins/swal.mixin";
import Head from 'next/head'
import Cookie, { useCookies } from 'react-cookie'

const inforCustomer = () => {
    const [users, setUsers] = useState([])
    const [cookies, setCookie] = useCookies(['user']);
    const userCookie = cookies.user
    const [isConsulted, setIsConsulted] = useState(false)
    var isConsultedLenght = 0
    useEffect(() => {
        let isMounted = true;
        const token = userCookie.accessToken
        const controller = new AbortController();

        const getAllUsers = async () => {
            fetch('http://localhost:3001', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((res) => res.json())
                .then((users) => {
                    setUsers(users);
                    console.log(users);
                })
        }
        getAllUsers();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])
    function copy(text) {
        navigator.clipboard.writeText(text)
        swtoast.success({
            text: "Đã copy thành công!",
        });
    }
    function converTime(text) {
        const time = new Date(text)
        const createAt = time.toLocaleDateString()
        return createAt
    }
    function sliceEmail(email) {
        return email.slice(0, 10)
    }
    return (
        <div className="infor-customer w-100">
            <Head>
                <title>Khách hàng chưa tư vấn</title>
            </Head>
            <HeaderAdmin />
            <Heading title='Thông tin khách hàng' />
            <table className='table customer-table w-100'>
                <thead className="w-100 text-center">
                    <tr className="fs-6 w-100 align-items-center d-flex justify-content-around">
                        <th className="">Họ và tên</th>
                        <th className="">Số điện thoại</th>
                        <th className="col-email">Địa chỉ email</th>
                        <th className="date-register">Ngày đăng ký</th>
                        <th className="consulted-box">Đã tư vấn</th>
                    </tr>
                </thead>
                <tbody className="w-100 text-center">
                    {
                        users.map((item, index) => {
                            if (item.consulted === false) {
                                isConsultedLenght++
                                return (
                                    <tr key={index} className="w-100 d-flex align-items-center justify-content-around">
                                        <td className="">{item.fullName}</td>
                                        <td className="">
                                            {item.phoneNumber}<FaRegCopy className="copy-icon" onClick={() => copy(item.phoneNumber)} />
                                        </td>
                                        <td className="col-email">
                                            {sliceEmail(item.email)}<FaRegCopy className="copy-icon" onClick={() => copy(item.email)} />
                                        </td>
                                        <td className="text-center date-register">{converTime(item.created)}</td>
                                        <td className='consulted-box'>
                                            <input type="checkbox" onClick={() => item.consulted = !item.consulted} value={item.consulted} />
                                        </td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
            <table className='table product-admin w-100'>
                <tbody className="w-100 text-center">
                    <tr className="fs-6 w-100">
                        <th className="">Tổng cộng:</th>
                        <th className="">{isConsultedLenght}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default inforCustomer