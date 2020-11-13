import React, { useCallback, useState } from 'react'
import { Style, StyleMap } from 'utils/tsTypes'
import { HorizontalStack, VerticalStack } from 'common/components/flex'
import { SignUpModel } from './model'
import {Link, useHistory} from 'react-router-dom'

export const SignUp = (): JSX.Element => {
    const model = new SignUpModel()

    const styles: StyleMap = {
        background: {
            position: 'absolute',
            textAlign: 'center',
            verticalAlign: 'middle',
            width: '100%',
            height: '100%',
            background: '#2B2F32',
            border: '1px solid #000000',
            boxSizing: 'border-box',
        },
        whiteBox: {
            position: 'relative',
            margin: '5% auto',
            width: '450px',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.25)',
            borderRadius: '45px'
        },
    }

    return (
        <div style={styles.background}>
            <div style={styles.whiteBox}>
                <SignUpForm model={model} />
                <BottomOptions />
            </div>
        </div>
    )
}

const SignUpForm = (props: { model: SignUpModel }): JSX.Element => {
    const styles: StyleMap = {
        signUpForm: {
            alignSelf: 'center',
        },
        inputForm: {
            marginTop: '45px',
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
        },
        isWorker: {
            marginTop: '20px',
            marginBottom: '20px',
            width: '280px',
            height: '40px',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'rgba(0, 0, 0, 0.7)',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '20px',
            borderWidth: '2px',
            borderColor: '#b3b3b3',
            fontFamily: 'New York Medium',
            borderRadius: '10px',
        },
        signupButton: {
            marginTop: '20px',
            width: '320px',
            height: '42px',
            background: '#e91e63',
            borderWidth: 'medium',
            borderColor: '#b3b3b3',
            boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: '22px',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: 'New York Medium',
            fontSize: '30px',
            color: '#FFFFFF',
            cursor: 'pointer',
            alignSelf: 'center',
        },
    }
    const [email, setEmail] = useState('')
    const [securitySocialNumber, setSecuritySocialNumber] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isWorker, setIsWorker] = useState(false)
    const [workerId, setWorkerId] = useState('')
    const history = useHistory()
    const goToLogin = useCallback(() => {
        history.push('/acc/login')
    }, [])

    return (
        <VerticalStack>
            <form style={styles.signUpForm}>
                <VerticalStack>
                    <input
                        style={styles.inputForm}
                        type="text"
                        name="email"
                        required={true}
                        placeholder="Email"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}
                    />
                    <input
                        style={styles.inputForm}
                        type="password"
                        name="password"
                        required={true}
                        placeholder="Password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                    />
                    <input
                        style={styles.inputForm}
                        type="text"
                        name="securitySocialNumber"
                        required={true}
                        placeholder="Security Social Number"
                        value={securitySocialNumber}
                        onChange={(event) => {
                            setSecuritySocialNumber(event.target.value)
                        }}
                    />

                    <HorizontalStack style={styles.isWorker}>
                        <input
                            type="checkbox"
                            name="checkbox"
                            required={false}
                            value={isWorker.toString()}
                            onClick={() => {
                                setIsWorker(!isWorker)
                            }}
                        />
                        Are you a worker?
                    </HorizontalStack>
                    <MaybeWorkerId
                        workerId={workerId}
                        setWorkerId={setWorkerId}
                        isWorker={isWorker}
                    />
                    {errorMessage}
                </VerticalStack>
            </form>
            <button
                style={styles.signupButton}
                onClick={() =>
                    props.model.onClickSignUp(
                        email,
                        password,
                        securitySocialNumber,
                        isWorker,
                        workerId,
                        setErrorMessage,
                        goToLogin
                    )
                }
            >
                Sign Up
            </button>
        </VerticalStack>
    )
}

interface MaybeWorkerId {
    workerId: string
    setWorkerId: React.Dispatch<React.SetStateAction<string>>
    isWorker: boolean
}

const MaybeWorkerId = (props: MaybeWorkerId): JSX.Element => {
    if (!props.isWorker) {
       return <></> 
    }
    const style: Style = {
        marginTop: '15px',
        marginBottom: '20px',
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
                        type="text"
                        name="workerId"
                        required={true}
                        placeholder="Worker ID"
                        value={props.workerId}
                        onChange={(event) => {
                            props.setWorkerId(event.target.value)
                        }}
                    />
    )
}

const BottomOptions = (): JSX.Element => {
    const styles: StyleMap = {
        bottomLinks: {
            width: '500px',
            alignSelf: 'center',
        },
        loginButton: {
            marginTop: '25px',
            marginBottom: '20px',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '20px',
            color: 'black',
            textDecoration: 'none',
        },
    }

    return (
        <VerticalStack style={styles.bottomLinks}>
            <Link style={styles.loginButton} to={'/acc/login'}>
                Already registered? Login
            </Link>
        </VerticalStack>
    )
}
