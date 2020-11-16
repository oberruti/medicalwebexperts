import axios from 'axios'
import { Cookies } from 'react-cookie/lib';

export class EmailModel {
    tryToCheckEmail = async (cookies: Cookies, email: string): Promise<boolean> => {
        const response = await this.checkEmail(cookies, email)

        return response.status === 'ok'
    }

    checkEmail = async (cookies: Cookies, email: string): Promise<{ msg: any; status: string }> => {
        const accessToken = cookies.get('access_token')
        const response = axios
            .post(
                '/check_email',
                {
                    email: email,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
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
        return await response
    }
}