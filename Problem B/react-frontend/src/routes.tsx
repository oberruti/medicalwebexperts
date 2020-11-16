import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { Login } from './components/login'
import { SignUp } from './components/signUp'
// import { InternalDashboard } from './components/dashboard'
import { Cookies, withCookies } from 'react-cookie/lib'
import { isNil, isNotNil } from './utils/checks'
import { ExternalDashboard } from 'components/dashboard/external'
import { InternalDashboard } from 'components/dashboard/internal'
import { InternalAddAppointment } from './components/internal/add/index';
import { InternalEditAppointment } from 'components/internal/edit'
import { InternalDeleteAppointment } from 'components/internal/delete'

interface RoutesAppProps {
    cookies: Cookies
}

class RoutesApp extends React.Component<RoutesAppProps> {
    render(): JSX.Element {
        return (
            <Switch>
                <Route exact path="/">
                    <Redirect to={'/app'} push={true} />
                </Route>
                <Route
                    path="/app"
                    render={() => <App cookies={this.props.cookies} />}
                />
                <Route
                    path="/acc"
                    render={() => <Acc cookies={this.props.cookies} />}
                />
            </Switch>
        )
    }
}

const App = (props: { cookies: Cookies }): JSX.Element => {
    const accessToken = props.cookies.get('access_token')
    if (accessToken && isNotNil(accessToken)) {
        return (
            <Switch>
                <Route exact path="/app">
                    <Redirect to={'/app/external'} push={true} />
                </Route>
                <Route
                    path={'/app/external'}
                    render={() => <External cookies={props.cookies} />}
                />
                <Route
                    path={'/app/internal'}
                    render={() => <Internal cookies={props.cookies} />}
                />
            </Switch>
        )
    }
    return (
        <Switch>
            <Redirect to={'/acc'} push={true} />
        </Switch>
    )
}

const Acc = (props: { cookies: Cookies }): JSX.Element => {
    const accessToken = props.cookies.get('access_token')
    if (accessToken && isNotNil(accessToken)) {
        return (
            <Switch>
                <Redirect to={'/app'} push={true} />
            </Switch>
        )
    } else
        return (
            <Switch>
                <Route exact path="/acc">
                    <Redirect to={'/acc/login'} push={true} />
                </Route>
                <Route
                    path="/acc/login"
                    render={() => <Login cookies={props.cookies} />}
                />
                <Route path="/acc/signup" render={() => <SignUp />} />
            </Switch>
        )
}


const External = (props: { cookies: Cookies }): JSX.Element => {
    const accessToken = props.cookies.get('access_token')
    if (accessToken && isNotNil(accessToken)) {
        const isWorker = props.cookies.get('isWorker')
        const isExternal = isWorker == 'false' || isNil(isWorker)
        if (isExternal) {
            return (
                <Switch>
                    <Route exact path="/app/external">
                        <Redirect to={'/app/external/dashboard'} push={true} />
                    </Route>
                    <Route
                        path={'/app/external/dashboard'}
                        render={() => <ExternalDashboard cookies={props.cookies} />}
                    />
                </Switch>
            )
        }
        return (
            <Switch>
                <Redirect to={'/app/internal'} push={true} />
            </Switch>
        )
    }
    return (
        <Switch>
            <Redirect to={'/acc'} push={true} />
        </Switch>
    )
}


const Internal = (props: { cookies: Cookies }): JSX.Element => {
    const accessToken = props.cookies.get('access_token')
    if (accessToken && isNotNil(accessToken)) {
        const isWorker = props.cookies.get('isWorker')
        const isInternal = isWorker == 'true'
        if (isInternal) {
            return (
                <Switch>
                    <Route exact path="/app/internal">
                        <Redirect to={'/app/internal/dashboard'} push={true} />
                    </Route>
                    <Route
                        path={'/app/internal/dashboard'}
                        render={() => <InternalDashboard cookies={props.cookies} />}
                    />
                    <Route
                        path={'/app/internal/add'}
                        render={() => <InternalAddAppointment cookies={props.cookies} />}
                    />
                    <Route
                        path={'/app/internal/edit'}
                        render={() => <InternalEditAppointment cookies={props.cookies} />}
                    />
                    <Route
                        path={'/app/internal/delete'}
                        render={() => <InternalDeleteAppointment cookies={props.cookies} />}
                    />
                </Switch>
            )
        }
        return (
            <Switch>
                <Redirect to={'/app/external'} push={true} />
            </Switch>
        )
    }
    return (
        <Switch>
            <Redirect to={'/acc'} push={true} />
        </Switch>
    )
}

export default withCookies(RoutesApp)
