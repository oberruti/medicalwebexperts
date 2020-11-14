import * as React from 'react'

import { ExternalNavigation } from 'components/navigation'
import { Cookies } from 'react-cookie/lib'
import { AppContent, Layout } from './common'
import { JustChildren } from 'utils/tsTypes'

interface ExternalLayoutProps extends JustChildren {
    cookies: Cookies
}

export class ExternalLayout extends React.Component<ExternalLayoutProps> {
    constructor(props: ExternalLayoutProps) {
        super(props)
    }

    render(): JSX.Element | null {
        const props = this.props
        return (
            <Layout>
                <ExternalNavigation cookies={props.cookies} />
                <AppContent>{props.children}</AppContent>
            </Layout>
        )
    }
}
