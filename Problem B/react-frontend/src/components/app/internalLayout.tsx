import * as React from 'react'

import { InternalNavigation } from 'components/navigation'
import { Cookies } from 'react-cookie/lib'
import { AppContent, Layout } from './common'
import { JustChildren } from 'utils/tsTypes'

interface InternalLayoutProps extends JustChildren {
    cookies: Cookies
}

export class InternalLayout extends React.Component<InternalLayoutProps> {
    constructor(props: InternalLayoutProps) {
        super(props)
    }

    render(): JSX.Element | null {
        const props = this.props
        return (
            <Layout>
                <InternalNavigation cookies={props.cookies} />
                <AppContent>{props.children}</AppContent>
            </Layout>
        )
    }
}
