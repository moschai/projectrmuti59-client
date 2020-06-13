import React from 'react'
import { Layout } from 'antd';
import LayoutHeaderAuthority from './LayoutHeaderAuthority';
import LayoutFooter from '../LayoutFooter';
import Container from '../Container';

const {Content} =Layout;
export default function BaseLayoutAuthority({children}) {
    
        return (
            <>
            <Layout className="min-h-100">
             <LayoutHeaderAuthority />
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
