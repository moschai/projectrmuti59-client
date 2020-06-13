import React from 'react'
import { Spin } from 'antd'

export default function Loading() {
    return (
        <Spin spinning={true} tip="loadign...">
       <div style={{width:'100%',minHeight:'70vh'}}>

       </div>
       </Spin>
    )
}
