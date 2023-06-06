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

const buy_interest_subject = "Buy Interest"

export default function usePricingContactUs() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { is_authenticated, user_info } = useAuth()

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  function successClose() {
    Toast.success(Messages.THANKS_CONTACT_US)
    toggleModal()
  }
  
  

  const modal = isModalVisible && (is_authenticated ? <SimpleContactUsModal submitDescription={"With the Free Plan, you have access to a maximum of three pages. If you wish to view up to 100 pages, please contact us to subscribe."} {...{

    toggleModal, handleSubmit: (data) => {
      Api.sendEmail(buy_interest_subject, {...user_info, ...data})
      successClose()
    }
  }} /> : (
    <EuiModal className='max-w-xl text-center' onClose={toggleModal}>
      <EuiModalHeader className='justify-center'>
        <EuiModalHeaderTitle >Contact Us</EuiModalHeaderTitle>
      </EuiModalHeader>
      <EuiModalBody>
        <ContactForm
          submitText="Submit"
          onSubmit={
            (user_info) => {
              Api.sendEmail(buy_interest_subject, user_info)
              successClose()
            }
          } />
      </EuiModalBody>
    </EuiModal>
  ))
  return { showModal: () => setIsModalVisible(true), modal }
}
