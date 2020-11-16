import { VerticalStack } from 'common/components/flex'
import { InternalLayout } from 'components/app/internalLayout'
import React, { useState } from 'react'
import { Cookies } from 'react-cookie/lib'
import { backgroundColor } from 'style'
import { Style } from 'utils/tsTypes'

export const InternalDeleteAppointment = (props: { cookies: Cookies }): JSX.Element => {
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
        marginTop: '30px',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '20px',
            fontFamily: 'New York Medium',
    }
    return (
        <InternalLayout cookies={props.cookies}>
            <VerticalStack style={style}>
                This page is still in progress.
            </VerticalStack>
        </InternalLayout>
    )
}