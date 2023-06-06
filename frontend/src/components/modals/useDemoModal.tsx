import { EuiButton, EuiForm, EuiText } from '@elastic/eui'
import { useState } from 'react'
import {
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiButtonEmpty,
} from '@elastic/eui'
import Toast from '@omkar111111/components/Toast'
import Analytics from '../../utils/analytics'
import Messages from '../../utils/messages'
import ContactForm from '../forms/ContactForm'
import Api from '../../utils/api'
import Links from '../../utils/data/links'
import { useRouter } from 'next/router'
import Language from '@omkar111111/utils/language'

const demo_interest_subject = "Demo Interest"
export default function useDemoModal() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const router = useRouter()

  function successClose() {
    Toast.success(Messages.THANKS_CONTACT_US)
    toggleModal()
  }

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  const modal = isModalVisible && (
    <EuiModal className='max-w-xl text-center' onClose={toggleModal}>
      <EuiModalHeader className='justify-center'>
        <EuiModalHeaderTitle>Get a Free Demo of yourcompanyname's Sales Intelligence Platform</EuiModalHeaderTitle>
      </EuiModalHeader>
      <EuiModalBody>
        <ContactForm
          submitText="Get your free demo"
          onSubmit={
            (user_info) => {
              Api.sendEmail(demo_interest_subject, user_info).then(()=>{
                Language.sleep(1).then(() => {
                  router.push(Links.meetingLink)
                })            
              })
              successClose()
            }
          } />
      </EuiModalBody>
    </EuiModal>
  )
  return { showModal: () => setIsModalVisible(true), modal }
}
