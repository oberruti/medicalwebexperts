import React from 'react'

import logout from 'common/img/logout-logo.png'
import { Logout } from '../logout'
import { Cookies } from 'react-cookie/lib'
import Tooltip from '@material-ui/core/Tooltip'
import homeLogo from 'common/img/home-logo.png'
import addLogo from 'common/img/calendar-logo.png'
import editLogo from 'common/img/edit-logo.png'
import deleteLogo from 'common/img/trash-logo.png'
import { Link } from 'react-router-dom'

export function InternalDashboardMenu(): JSX.Element {
    const logo = {
        maxWidth: '40px',
        maxHeight: '40px',
        marginBottom: 2,
        display: 'block',
        outline: 'none',
        cursor: 'pointer',
        alignSelf: 'center',
    }
    return (
        <Tooltip title="Dashboard" placement="right">
            <Link to={'/app/internal/dashboard/'} style={logo}>
                <img src={homeLogo} style={logo} />
            </Link>
        </Tooltip>
    )
}

export function InternalAddAppointment(): JSX.Element {
    const logo = {
        maxWidth: '40px',
        maxHeight: '40px',
        marginBottom: 2,
        display: 'block',
        outline: 'none',
        cursor: 'pointer',
        alignSelf: 'center',
        marginTop: '10px',
    }
    return (
        <Tooltip title="Add appointment" placement="right">
            <Link to={'/app/internal/add/'} style={logo}>
                <img src={addLogo} style={logo} />
            </Link>
        </Tooltip>
    )
}

export function InternalEditAppointment(): JSX.Element {
    const logo = {
        maxWidth: '40px',
        maxHeight: '40px',
        marginBottom: 2,
        display: 'block',
        outline: 'none',
        cursor: 'pointer',
        alignSelf: 'center',
        marginTop: '10px',
    }
    return (
        <Tooltip title="Edit appointment" placement="right">
            <Link to={'/app/internal/edit/'} style={logo}>
                <img src={editLogo} style={logo} />
            </Link>
        </Tooltip>
    )
}

export function InternalDeleteAppointment(): JSX.Element {
    const logo = {
        maxWidth: '40px',
        maxHeight: '40px',
        marginBottom: 2,
        display: 'block',
        outline: 'none',
        cursor: 'pointer',
        alignSelf: 'center',
        marginTop: '10px',
    }
    return (
        <Tooltip title="Delete appointment" placement="right">
            <Link to={'/app/internal/delete/'} style={logo}>
                <img src={deleteLogo} style={logo} />
            </Link>
        </Tooltip>
    )
}

export function LogoutMenu(props: { cookies: Cookies }): JSX.Element {
    const logo = {
        maxWidth: '40px',
        maxHeight: '40px',
        marginBottom: 2,
        display: 'block',
        outline: 'none',
        cursor: 'pointer',
        alignSelf: 'center',
    }
    return (
        <Logout cookies={props.cookies} style={logo}>
            <Tooltip title="LogOut" placement="right">
                <img src={logout} style={logo} />
            </Tooltip>
        </Logout>
    )
}
