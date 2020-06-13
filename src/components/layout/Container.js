import React from 'react'
import { Row, Col } from 'antd'

export default function Container({children}) {
    return (
       <Row type="flex" justify="center">
           <Col xs={24} sm={24} md={22} lg={20} xl={18} xxl={16} span={24}>
            {children}
           </Col>
       </Row>
    )
}
