import { useState } from 'react'
import {
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiModalHeaderTitle,
} from '@elastic/eui'
import Toast from '@omkar111111/components/Toast'
import Messages from '../../utils/messages'
import ContactForm from '../forms/ContactForm'
import { useAuth } from '../auth/context'
import SimpleContactUsModal from '../SimpleContactUsModal'
import Api from '../../utils/api'

const contactus_subject = "Contact Us"
export default function useGenericContactUs({ askRequirements = false,  subject = contactus_subject, headerText = 'Contact Us',  submitText = 'Contact Us' , submitDescription = `We're here to support your mission! Contact us to see how we can help you grow and succeed.` }) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { is_authenticated, user_info } = useAuth()


  function successClose() {
    Toast.success(Messages.THANKS_CONTACT_US)
    toggleModal()
  }

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  const modal = isModalVisible && (is_authenticated ? <SimpleContactUsModal
    askRequirements={askRequirements}
    {...{
    submitText, submitDescription, 
    toggleModal, handleSubmit: (data) => {
      Api.sendEmail(subject, {...data, ...user_info, })
      successClose()
    }
  }} /> : (
    <EuiModal className='max-w-xl text-center' onClose={toggleModal}>
      <EuiModalHeader className='justify-center'>
        <EuiModalHeaderTitle >{headerText}</EuiModalHeaderTitle>
      </EuiModalHeader>
      <EuiModalBody>
        <ContactForm
          askRequirements={askRequirements}
          submitText={submitText}
          onSubmit={
            (user_info) => {
              Api.sendEmail(subject, user_info)
              successClose()
            }
          } />
      </EuiModalBody>
    </EuiModal>
  ))
  return { showModal: () => setIsModalVisible(true), modal }
}
