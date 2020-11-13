import axios from 'axios'
import { Cookies } from 'react-cookie/lib'

export class LoginModel {
    email = ''
    password = ''
    isWorker = false
    workerId = ''
    response: any
    cookies: Cookies

    constructor(cookies: Cookies) {
        this.cookies = cookies
        this.response = {
            msg: '',
            status: '',
        }
    }

    onClickLogin = async (
        email: string,
        password: string,
        isWorker: boolean,
        workerId: string,
        setErrorMessage: (error: string) => void,
        goToDashboard: () => void
    ): Promise<void> => {
        this.email = email
        this.password = password
        this.workerId = workerId
        this.isWorker = isWorker
        setErrorMessage('')

        if (email === '' || password === '') {
            setErrorMessage('Please complete all the fields and try again.')
            return
        }
        if (isWorker && workerId === '') {
            setErrorMessage('Please complete the worker ID and try again.')
            return
        }

        if (isWorker) {
            this.response = await this.tryToLoginWorker()
        } else {
            this.response = await this.tryToLogin()
        }

        if (this.response.status === 'ok') {
            this.cookies.set('access_token', this.response.msg.access_token, {
                path: '/',
            })
            this.cookies.set('isWorker', this.response.msg.is_worker === 'true', {
                path: '/',
            })
            return goToDashboard()
        }
        if (this.response.msg === '') {
            setErrorMessage('Something went wrong, please try again')
            return
        }
        setErrorMessage(this.response.msg)
        return
    }

    tryToLogin = async (): Promise<{ msg: any; status: string }> => {
        const response = axios
            .post(
                '/login',
                {
                    email: this.email,
                    password: this.password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                return {
                    status: response.data.status,
                    msg: response.data.msg || response.data.data,
                }
            })
            .catch(() => {
                return {
                    status: 'error',
                    msg: '',
                }
            })
        return response
    }

    tryToLoginWorker = async (): Promise<{ msg: any; status: string }> => {
        const response = axios
            .post(
                '/login',
                {
                    email: this.email,
                    password: this.password,
                    worker_id: this.workerId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                return {
                    status: response.data.status,
                    msg: response.data.msg || response.data.data,
                }
            })
            .catch(() => {
                return {
                    status: 'error',
                    msg: '',
                }
            })
        return response
    }
}
