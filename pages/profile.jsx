import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Heading from '../components/Heading'
import { useCookies } from 'react-cookie'

const profile = () => {
  const [users, setUsers] = useState([])
  const [cookies, setCookie] = useCookies(['user']);
  const userCookie = cookies.user
  const [userFullName, setUserFullName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userCreated, setUserCreated] = useState('')

  const logOutHandler = () => {
    setCookie('user', '')
    window.location.assign('/')
  }

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then((res) => res.json())
      .then((users) => {
        setUsers(users)
        console.log(users);
      })
    setUserEmail(userCookie.email)
  }, [])
  useEffect(() => {
    for (const user of users) {
      if (user.email === userEmail) {
        setUserFullName(user.fullName)
        setUserCreated(user.created)
        console.log(userFullName);
        console.log(userEmail);
      }
    }
  })

  function converTime(text) {
    const time = new Date(text)
    const createAt = time.toLocaleDateString()
    return createAt
  }

  return (
    <div className='account-page profile-container'>
      <Head>
        <title>Profile</title>
      </Head>
      <Heading title="Profile" />
      <table className="profile table text-left">
        <tbody>
          <tr className="full-name-box">
            <td>Họ và tên:</td>
            <td className="fw-bold">{userFullName}</td>
          </tr>
          <tr className="email-box">
            <td>Địa chỉ email:</td>
            <td className="fw-bold">{userEmail}</td>
          </tr>
          <tr className="created-box">
            <td>Ngày đăng ký:</td>
            <td className="fw-bold">{converTime(userCreated)}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={logOutHandler} className="btn submit-btn text-white" type="submit">Đăng xuất</button>

    </div>
  )
}

export default profile