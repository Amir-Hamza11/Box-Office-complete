import React from 'react'
import { useLocation } from 'react-router'

import {NavList, LinkStyled } from '../components/Navs.styled'

const Navs = () => {

    const LINKS = [
        { to: '/', text: 'Home' },
        { to: '/starred', text: 'Starred' }
    ]

    const location = useLocation()
    // console.log(location);

    return (
        <div>

        <NavList>
            {
                LINKS.map((item) => {
                    return <li key={item.to} >
                        <LinkStyled className={item.to === location.pathname ? 'active': '' } to={item.to}>{item.text}</LinkStyled>
                    </li>
                })
            }

        </NavList>
        </div>
    )
}

export default Navs