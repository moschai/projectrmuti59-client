import React from 'react'
import {Layout} from 'antd'

import LayoutHeader from './LayoutHeader'
import LayoutFooter from './LayoutFooter'
import Container from './Container';

const {Content} = Layout;

export default function BaseLayout({children}) {
    return (
       <>
       <Layout className="min-h-100">
        <LayoutHeader />
        <Container>
            <Content style={{minHeight:'88vh'}}>
                {children}
            </Content>
        </Container>
        <LayoutFooter />
       </Layout>
       </>
    )
}
