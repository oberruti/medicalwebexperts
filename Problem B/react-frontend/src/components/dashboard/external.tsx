import { ExternalLayout } from "components/app/externalLayout"
import React, { useState } from 'react'
import { Cookies } from "react-cookie/lib"
import { Redirect, Switch } from "react-router-dom"
import { Style } from "utils/tsTypes"
import { AppointmentTypeDropdown } from "./appointmentType/appointmentTypeDropdown"

export const ExternalDashboard = (props: { cookies: Cookies }): JSX.Element => {
    const style: Style = {
        background: '#222',
        display: 'flex',
        position: 'absolute',
        textAlign: 'center',
        verticalAlign: 'middle',
        width: '100%',
        height: '100%',
        overflowY: 'hidden',
        alignContent: 'center',
    }

    const [isAppointmentTypeSelected, setIsAppointmentTypeSelected] = useState(false)
    const [appointmentTypeSelected, setAppointmentTypeSelected] = useState('')

    if (!props.cookies.get('access_token')) {
        return (
            <Switch>
                <Redirect to={'/app'} push={true} />
            </Switch>
        )
    }

    console.log(appointmentTypeSelected, isAppointmentTypeSelected)

    return (
        <ExternalLayout cookies={props.cookies}>
            <section style={style}>
                <AppointmentTypeDropdown
                    cookies={props.cookies}
                    setIsAppointmentTypeSelected={setIsAppointmentTypeSelected}
                    setAppointmentTypeSelected={setAppointmentTypeSelected}
                />
                {/* <MaybeAddAppointment
                    isAppointmentTypeSelected={isAppointmentTypeSelected}
                    appointmentTypeSelected={appointmentTypeSelected}
                /> */}
            </section>
        </ExternalLayout>
    )
}