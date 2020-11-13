import React, { useCallback, useState } from 'react'
import { Style, StyleMap } from 'utils/tsTypes'
import { HorizontalStack, VerticalStack } from 'common/components/flex'
import { LoginModel } from 'components/login/model'
import { Cookies } from 'react-cookie/lib'
import { Link, useHistory} from 'react-router-dom'
import userIcon from 'common/img/user-logo.png'

export const Login = (props: { cookies: Cookies }): JSX.Element => {
    const model = new LoginModel(props.cookies)

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
                <LoginForm model={model} />
                <BottomOptions />
            </div>
        </div>
    )
}

const LoginForm = (props: { model: LoginModel }): JSX.Element => {
    const styles: StyleMap = {
        loginForm: {
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
            borderRadius: '10px',
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
        }
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isWorker, setIsWorker] = useState(false)
    const [workerId, setWorkerId] = useState('')
    const history = useHistory()
    const goToDashboard = useCallback(() => {
        history.push('/app/dashboard')
    }, [])
    const onClickLogin = () =>
    props.model.onClickLogin(
        email,
        password,
        isWorker,
        workerId,
        setErrorMessage,
        goToDashboard
    )

    return (
        <VerticalStack style={{ alignSelf: 'center' }}>
            <div style={styles.loginForm}>
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
                    <HorizontalStack 
                        style={styles.isWorker}>
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
            </div>
            <LoginButton onClickLogin={onClickLogin} />
        </VerticalStack>
    )
}

interface MaybeWorkerId {
    workerId: string
    setWorkerId: React.Dispatch<React.SetStateAction<string>>
    isWorker: boolean
}

const MaybeWorkerId = (props:any): JSX.Element => {
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

const LoginButton = (props: {onClickLogin: () => void}) => {
    const style: Style = {
        marginTop: '10px',
        width: '280px',
        height: '30px',
        background: '#e91e63',
        borderWidth: '1px',
        borderColor: '#b3b3b3',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.25)',
        borderRadius: '10px',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontFamily: 'New York Medium',
        fontSize: '20px',
        color: '#FFFFFF',
        cursor: 'pointer'
    }
    return (
        <button
                style={style}
                onClick={props.onClickLogin}
            >
                Log In
            </button>
    )
}

const BottomOptions = (): JSX.Element => {
    const styles: StyleMap = {
        signUp: {
            marginTop: '25px',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '20px',
            color: 'black',
            textDecoration: 'none',
        },
        bottomLinks: {
            width: '500px',
            alignSelf: 'center',
        },
    }
    return (
        <VerticalStack style={styles.bottomLinks}>
            <Link style={styles.signUp} to={'/acc/signup'}>
                <p>Don't have an account yet?</p>
                <p>Sign Up</p>
            </Link>
        </VerticalStack>
    )
}
