import { VerticalStack } from 'common/components/flex'
import { InternalLayout } from 'components/app/internalLayout'
import { MaybeAddAppointment } from 'components/dashboard/appointment'
import { AppointmentTypeDropdown } from 'components/dashboard/appointmentType/appointmentTypeDropdown'
import React, { useState } from 'react'
import { Cookies } from 'react-cookie/lib'
import { Redirect, Switch } from 'react-router-dom'
import { backgroundColor } from 'style'
import { Style } from 'utils/tsTypes'
import { EmailForm } from '../email'
import { EmailModel } from '../email/model'

export const InternalAddAppointment = (props: { cookies: Cookies }): JSX.Element => {
    const [email, setEmail] = useState('')
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
    return (
        <InternalLayout cookies={props.cookies}>
            <VerticalStack style={style}>
                <EmailForm email={email} setEmail={setEmail}/>
                <MaybeForm
                    cookies={props.cookies}
                    email={email}
                />
            </VerticalStack>
        </InternalLayout>
    )
}

const MaybeForm = (props: {cookies: Cookies, email: string}): JSX.Element => {
    const [checkedEmail, setCheckedEmail] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(true)

    const emailModel = new EmailModel()

    const checkEmail = async () => {
            const checkedEmail = await emailModel.tryToCheckEmail(props.cookies, props.email)
            setIsEmailValid(checkedEmail)
            setCheckedEmail(props.email)
        }

    const tryToCheckEmailWithEffect = () => {
        void checkEmail()
    }


    if (props.email == '') {
        return <></>
    }

    const onClick = () => {
        setIsEmailValid(true)
        tryToCheckEmailWithEffect()
    }

    const style: Style = {
        background: '#4caf50',
        width: '100px',
        height: '35px',
        alignSelf: 'center',
        borderRadius: '4px',
        border: '3px',
        fontSize: '20px',
        marginTop: '20px',
        paddingTop: '10px',
    }

    if (!isEmailValid) {
        return (
            <VerticalStack>
                <div style={{paddingTop: '5px', color: 'black'}}>Email invalid! Write new one and check again.</div>
                <div style={style} onClick={onClick}>Check</div>
            </VerticalStack>
        )
    }

    if (checkedEmail == '') {
        return <div style={style} onClick={onClick}>Check</div>
    }

    return <AddAppointment cookies={props.cookies}
    email={checkedEmail}/>
}


const AddAppointment = (props: {cookies: Cookies, email: string}): JSX.Element => {
    const style: Style = {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        verticalAlign: 'middle',
        marginTop: '20px',
        minWidth: '200px',
        minHeight: '200px',
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
            <VerticalStack style={style}>
                <AppointmentTypeDropdown
                    email={props.email}
                    cookies={props.cookies}
                    setIsAppointmentTypeSelected={setIsAppointmentTypeSelected}
                    setAppointmentTypeSelected={setAppointmentTypeIdSelected}
                />
                <MaybeAddAppointment
                    isAppointmentTypeSelected={isAppointmentTypeSelected}
                    appointmentTypeSelected={appointmentTypeIdSelected}
                    accessToken={accessToken}
                    cleanScreen={() => setIsAppointmentTypeSelected(false)}
                    email={props.email}
                />
            </VerticalStack>
    )
}