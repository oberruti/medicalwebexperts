import React from 'react'
import { Style } from 'utils/tsTypes'

export const EmailForm = (props: {email: string, setEmail: React.Dispatch<React.SetStateAction<string>>}): JSX.Element => {
    const style: Style = {
            marginTop: '40px',
            width: '280px',
            height: '25px',
            textAlign: 'center',
            color: 'rgba(0, 0, 0, 0.5)',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '25px',
            borderWidth: '2px',
            borderColor: '#b3b3b3',
            fontFamily: 'New York Medium',
            borderRadius: '10px',
    }
    return (
                    <input
                        style={style}
                        type="email"
                        name="email"
                        required={true}
                        placeholder="User email"
                        value={props.email}
                        onChange={(event) => {
                            props.setEmail(event.target.value)
                        }}
                    />
    )
}