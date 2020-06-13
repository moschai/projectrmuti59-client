import React from 'react'
import BaseLayoutStudent from '../components/layout/layout-student/BaseLayoutStudent'
import DocumentOneForm from '../components/documents/document-one/DocumentOneForm'

export default function DocumentOnePage() {
    return (
       <BaseLayoutStudent>
         <DocumentOneForm title="doc1" />
       </BaseLayoutStudent>
    )
}
