import React, { useCallback, useState } from 'react'
import { StyleMap, Style } from 'utils/tsTypes'
import { Cookies } from 'react-cookie/lib'
import {Redirect, Switch, useHistory} from 'react-router-dom'
import addLogo from 'common/img/calendar-logo.png'
import editLogo from 'common/img/edit-logo.png'
import deleteLogo from 'common/img/trash-logo.png'
import { InternalLayout } from 'components/app/internalLayout'
import { backgroundColor } from '../../style';

export const InternalDashboard = (props: { cookies: Cookies }): JSX.Element => {
    const style: Style = {
        background: backgroundColor,
        display: 'flex',
        position: 'absolute',
        textAlign: 'center',
        verticalAlign: 'middle',
        width: '100%',
        height: '100%',
        overflowY: 'hidden',
        alignContent: 'center',
        justifyContent: 'center',
    }

    if (!props.cookies.get('access_token')) {
        return (
            <Switch>
                <Redirect to={'/app'} push={true} />
            </Switch>
        )
    }

    return (
        <InternalLayout cookies={props.cookies}>
            <div style={style}>
                <Add />
                <Edit />
                <Delete />
            </div>
        </InternalLayout>
    )
}

const Add = (): JSX.Element => {
    return (
        <Menu
            name={'Add appointment '}
            description={'Add a new appointment'}
            logo={addLogo}
            toWhere={'add'}
        />
    )
}

const Edit = (): JSX.Element => {
    return (
        <Menu
            name={'Edit appointment '}
            description={'Edit an appointment'}
            logo={editLogo}
            toWhere={'edit'}
        />
    )
}


const Delete = (): JSX.Element => {
    return (
        <Menu
            name={'Delete appointment '}
            description={'Delete an appointment'}
            logo={deleteLogo}
            toWhere={'delete'}
        />
    )
}

interface MenuProps {
    name: string
    description: string
    logo: string
    toWhere: string
}

const Menu = (props: MenuProps): JSX.Element => {
    const styles: StyleMap = {
        item: {
            background: '#333',
            padding: '20px',
            display: 'grid',
            transition: '0.8s',
            height: '220px',
            width: '210px',
            marginTop: '180px',
            marginLeft: '35px',
            marginRight: '35px',
            borderRadius: '45px',
            cursor: 'pointer',
        },
        itemOver: {
            background: '#e91e63',
            transform: 'translateY(20px)',
            padding: '20px',
            display: 'grid',
            transition: '0.8s',
            height: '220px',
            width: '210px',
            marginTop: '180px',
            marginLeft: '35px',
            marginRight: '35px',
            cursor: 'pointer',
            borderRadius: '45px',
        },
        text: {
            color: '#fff',
            textAlign: 'center',
            fontSize: '22px',
            marginTop: '0px',
        },
        img: {
            display: 'block',
            margin: ' auto',
            maxWidth: '110px',
            marginBottom: '10px',
        },
        description: {
            color: '#fff',
            textAlign: 'center',
            fontSize: '17px',
            marginBottom: '25px',
            marginTop: '0px',
        },
    }

    const history = useHistory()
    const [styleMenu, setStyleMenu] = useState(styles.item)

    const onMouseOver = useCallback(() => {
        setStyleMenu(styles.itemOver)
    }, [])

    const onMouseOut = useCallback(() => {
        setStyleMenu(styles.item)
    }, [])

    const onClick = useCallback(() => {
        history.push(`/app/internal/${props.toWhere}`)
    }, [])

    return (
        <div
            style={styleMenu}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onClick={onClick}
        >
            <img style={styles.img} src={props.logo} alt={props.name} />
            <h1 style={styles.text}>{props.name}</h1>
            <p style={styles.description}>{props.description}</p>
        </div>
    )
}
