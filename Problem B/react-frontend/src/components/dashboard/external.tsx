import { VerticalStack } from "common/components/flex"
import { ExternalLayout } from "components/app/externalLayout"
import React, { useState } from 'react'
import { Cookies } from "react-cookie/lib"
import { Redirect, Switch } from "react-router-dom"
import { backgroundColor } from "style"
import { Style } from "utils/tsTypes"
import { MaybeAddAppointment } from "./appointment"
import { AppointmentTypeDropdown } from "./appointmentType/appointmentTypeDropdown"

export const ExternalDashboard = (props: { cookies: Cookies }): JSX.Element => {
    const style: Style = {
        background: backgroundColor,
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        textAlign: 'center',
        verticalAlign: 'middle',
        width: '100%',
        height: '100%',
        overflowY: 'hidden',
        alignContent: 'center',
    }

    const [isAppointmentTypeSelected, setIsAppointmentTypeSelected] = useState(false)
    const [appointmentTypeIdSelected, setAppointmentTypeIdSelected] = useState(0)

    const accessToken = props.cookies.get('access_token')

    if (!accessToken) {
        return (
            <Switch>
                <Redirect to={'/app'} push={true} />
            </Switch>
        )
    }

    return (
        <ExternalLayout cookies={props.cookies}>
            <VerticalStack style={style}>
                <AppointmentTypeDropdown
                    email={null}
                    cookies={props.cookies}
                    setIsAppointmentTypeSelected={setIsAppointmentTypeSelected}
                    setAppointmentTypeSelected={setAppointmentTypeIdSelected}
                />
                <MaybeAddAppointment
                    isAppointmentTypeSelected={isAppointmentTypeSelected}
                    appointmentTypeSelected={appointmentTypeIdSelected}
                    accessToken={accessToken}
                    cleanScreen={() => setIsAppointmentTypeSelected(false)}
                    email={null}
                />
            </VerticalStack>
        </ExternalLayout>
    )
}

