import React from 'react'
import Heading from '../components/Heading'
import Head from 'next/head'

import {
  FaMapMarkerAlt,
  FaPhoneSquareAlt,
  FaFirefox,
  FaFacebookSquare
} from 'react-icons/fa'

const Contact = () => {
  const contactInfor = [
    {
      icon: <FaMapMarkerAlt />,
      content: 'Số 8A, Võ Nguyên Giáp, Quận Cái Răng, TP.Cần Thơ',
      href: '#'
    },
    {
      icon: <FaPhoneSquareAlt />,
      content: '0918.941.966 Mr.Văn Tâm',
      href: '#'
    },
    {
      icon: <FaFacebookSquare />,
      content: 'Nguyễn Văn Tâm',
      href: 'https://www.facebook.com/profile.php?id=100047842143889'
    },
    {
      icon: <FaFirefox />,
      content: 'xesuzukicantho.com',
      href: '#'
    },
  ]
  return (
    <div className="contact">
      <Head>
        <title>Liên hệ</title>
      </Head>
      <Heading title="Liên hệ" />
      <div className="contact-content d-flex w-100 flex-row flex-wrap justify-content-around">
        {
          contactInfor.map((item, index) =>
            <div className='contact-content-item text-center' key={index}>
              <a href={item.href}>
                <div className="icon-wrapper">
                  {item.icon}
                </div>
              </a>
              <a href={item.href}>
                <div className="content-wrapper">
                  {item.content}
                </div>
              </a>
            </div>
          )
        }
      </div>
      <div className="map">
        <img className="w-100 h-auto" src="./img/map.png" alt="" />
      </div>
    </div>
  )
}

export default Contact