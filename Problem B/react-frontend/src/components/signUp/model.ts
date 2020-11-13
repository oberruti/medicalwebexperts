import axios from 'axios'

export class SignUpModel {
    email = ''
    password = ''
    securitySocialNumber = ''
    workerId = ''
    isWorker = false
    response: any

    onClickSignUp = async (
        email: string,
        password: string,
        securitySocialNumber: string,
        isWorker: boolean,
        workerId: string,
        setErrorMessage: (error: string) => void,
        goToLogin: () => void
    ): Promise<void> => {
        this.email = email
        this.securitySocialNumber = securitySocialNumber
        this.workerId = workerId
        this.isWorker = isWorker
        this.password = password
        setErrorMessage('')

        if (email === '' || securitySocialNumber === '' || password === '') {
            setErrorMessage('Please complete all the fields and try again.')
            return
        }
        if (isWorker && workerId === '') {
            setErrorMessage('Please complete the worker ID and try again.')
            return
        }

        if (isWorker) {
            this.response = await this.tryToSignUpWorker()
        } else {
            this.response = await this.tryToSignUp()
        }

        if (this.response.status === 'ok') {
            return goToLogin()
        }
        if (this.response.msg === '') {
            setErrorMessage('Something went wrong, please try again')
            return
        }
        setErrorMessage(this.response.msg)
        return
    }

    tryToSignUp = async (): Promise<{ msg: any; status: string }> => {
        const response = axios
            .post(
                '/sign_up',
                {
                    email: this.email,
                    password: this.password,
                    security_social_number: this.securitySocialNumber,
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
                    msg: response.data.msg || '',
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

    tryToSignUpWorker = async (): Promise<{ msg: any; status: string }> => {
        const response = axios
            .post(
                '/sign_up',
                {
                    email: this.email,
                    password: this.password,
                    security_social_number: this.securitySocialNumber,
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
                    msg: response.data.msg || '',
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
