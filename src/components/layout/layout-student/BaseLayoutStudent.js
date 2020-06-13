import React from 'react'
import { Layout } from 'antd'
import LayoutHeaderStudent from './LayoutHeaderStudent'
import Container from '../Container'
import LayoutFooter from '../LayoutFooter'

const {Content} =Layout;
export default function BaseLayoutStudent({children}) {
    return (

        <Layout className="min-h-100">
         <LayoutHeaderStudent />
         <Container>
             <Content style={{minHeight:'88vh'}}>
                 {children}
             </Content>
         </Container>
         <LayoutFooter />
        </Layout>
    )
}
