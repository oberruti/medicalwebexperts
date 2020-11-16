import * as React from 'react'

import {
    LogoutMenu,
} from './singleLinkMenu'
import { Cookies } from 'react-cookie/lib'
import { NavigationContainer, MainContainer, TopContainer, MiddleContainer, BottomContainer } from 'components/app/common'
import { Style } from 'utils/tsTypes'

/**
 * Internal Navigation bar
 */

export function InternalNavigation(props: { cookies: Cookies }): JSX.Element {
    return (
        <NavigationContainer>
            <MainContainer>
                <TopContainer>
                    <EntrySeparator style={{ flexBasis: 12 }} />
                    {/* <InternalCreateAppointment /> */}
                    <EntrySeparator style={{ flexBasis: 10 }} />
                </TopContainer>
                <MiddleContainer>
                    <EntrySeparator />
                    {/* <ModifyAppointment /> */}
                    <EntrySeparator />
                    {/* <ManageHoursOfOperation /> */}
                    <EntrySeparator />
                </MiddleContainer>
                <BottomContainer>
                    <EntrySeparator style={{ flexBasis: 10 }} />
                    <LogoutMenu cookies={props.cookies} />
                    <EntrySeparator style={{ flexBasis: 12 }} />
                </BottomContainer>
            </MainContainer>
        </NavigationContainer>
    )
}


/**
 * External Navigation bar
 */

export function ExternalNavigation(props: { cookies: Cookies }): JSX.Element {
    return (
        <NavigationContainer>
            <MainContainer>
                <TopContainer>
                    <EntrySeparator style={{ flexBasis: 12 }} />
                    <LogoutMenu cookies={props.cookies} />
                    <EntrySeparator style={{ flexBasis: 10 }} />
                </TopContainer>
            </MainContainer>
        </NavigationContainer>
    )
}

/**
 * Gap between MenuEntries
 */
interface EntrySeparatorProps {
    style?: Style
}

function EntrySeparator(props: EntrySeparatorProps): JSX.Element {
    const style: Style = {
        minHeight: '5px',
        flexBasis: 21,
        ...props.style,
    }
    return <div style={style} />
}