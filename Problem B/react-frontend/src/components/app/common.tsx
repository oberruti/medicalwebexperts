import * as React from 'react'

import { JustChildren, Style, StyleMap } from 'utils/tsTypes'
import { Dimensions } from 'style'
import { HorizontalStack, VerticalStack } from 'common/components/flex'

function StaticPositionMainContainer(props: JustChildren): JSX.Element {
    const style: Style = {
        background: '#333',
        color: 'white',
        height: '100%',
        width: Dimensions.width.nav,
        flex: `0 0 ${Dimensions.width.nav}px`,
    }
    return <VerticalStack style={style}>{props.children}</VerticalStack>
}

export function MainContainer(props: JustChildren): JSX.Element {
    return (
        <StaticPositionMainContainer>
            {props.children}
        </StaticPositionMainContainer>
    )
}

function StaticPositionNavContainer(props: JustChildren): JSX.Element {
    const style: Style = {
        display: 'block',
        width: Dimensions.width.nav,
        minHeight: 690,
        border: `3px solid #000000`,
    }
    return <div style={style}>{props.children}</div>
}

export function NavigationContainer(props: JustChildren): JSX.Element {
    return (
        <StaticPositionNavContainer>
            {props.children}
        </StaticPositionNavContainer>
    )
}

export function TopContainer(props: JustChildren): JSX.Element {
    const style: Style = {
        borderBottom: `3px solid #000000`,
    }
    return <VerticalStack style={style}>{props.children}</VerticalStack>
}

export function MiddleContainer(props: JustChildren): JSX.Element {
    return <VerticalStack>{props.children}</VerticalStack>
}

export function BottomContainer(props: JustChildren): JSX.Element {
    const justifyContent = 'flex-start'
    const style: Style = {
        justifyContent,
        borderTop: `3px solid #000000`,
    }
    return <VerticalStack style={style}>{props.children}</VerticalStack>
}

function RelativePositionAppContent(props: JustChildren): JSX.Element {
    const style: Style = {
        backgroundColor: '#222',
        display: 'block',
        position: 'relative',
        width: Dimensions.width.content + Dimensions.width.nav,
        minHeight: '100%',
        height: 'auto',
        boxShadow: '5px 0 20px -15px',
    }
    return <div style={style}>{props.children}</div>
}

export function AppContent(props: JustChildren): JSX.Element {
    return (
        <RelativePositionAppContent>
            {props.children}
        </RelativePositionAppContent>
    )
}

export class Layout extends React.Component<JustChildren> {
    constructor(props: JustChildren) {
        super(props)
    }

    render(): JSX.Element {
        const props = this.props

        const styles: StyleMap = {
            container: {
                width: '100%',
                height: '100%',
                display: 'flex',
                backgroundColor: '#222',
            },
            innerContainer: {
                position: 'relative',
                width: '100%',
                minHeight: '100%',
                margin: 'auto',
                height: 'auto',
                display: 'flex',
                backgroundColor: '#222',
            },
        }
        return (
            <div style={styles.container}>
                <div style={styles.innerContainer}>
                    <HorizontalStack>
                        {props.children}
                    </HorizontalStack>
                </div>
            </div>
        )
    }
}
