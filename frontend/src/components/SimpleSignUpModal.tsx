import { EuiButton, EuiText } from '@elastic/eui'
import { useState } from 'react'
import {
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiButtonEmpty,
} from '@elastic/eui'
import Links from '../utils/data/links'
// We're here to support your mission! Contact us to see how we can help you grow and succeed.
export default function SimpleSignUpModal({ toggleModal, handleSubmit }) {
  return <EuiModal className='text-center' onClose={toggleModal}>
    <EuiModalHeader className='justify-center'>
      <EuiModalHeaderTitle>Sign Up</EuiModalHeaderTitle>
    </EuiModalHeader>
    <EuiModalBody>
      <div>
        <EuiText>
          Sign Up Now to get access to 200M+ B2B Leads!
        </EuiText>
      </div>
    </EuiModalBody>
    <EuiModalFooter className='items-center justify-center'>
      {/* <EuiButtonEmpty onClick={toggleModal}>Cancel</EuiButtonEmpty> */}
      <EuiButton size='m' fill  href={Links.signUp} ><span className=''>Sign Up</span></EuiButton>
    </EuiModalFooter>
  </EuiModal>
}
