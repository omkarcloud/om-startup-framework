import { useState } from 'react'
import {
  EuiButton,
  EuiButtonEmpty,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiHeaderLink,
  EuiModalHeaderTitle,
} from '@elastic/eui'
import TextAreaField from './inputs/TextAreaField'
import Toast from '@omkar111111/components/Toast'
import Api from '../utils/api'
import { useAuth } from './auth/context'
import Links from '../utils/data/links'


function ShareYourThoughtsModal() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [feedback, setfeedback] = useState('')
  const { is_authenticated, user_info } = useAuth()

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
    setfeedback('')
  }

  const handleChange = value => {
    setfeedback(value)
  }
  const content = "Upgrade"

  const handleSubmit = () => {
    const givenFeedback = feedback.trim()
    Toast.success('Thank you for Feature Suggestion.')

    if (givenFeedback.length > 0) {
      Api.sendEmail(content, { ...user_info, feautre_request: givenFeedback })
    }

    toggleModal()
  }


  return (
    <>

      <EuiHeaderLink 
      href={Links.pricing}
       color="primary">{content}</EuiHeaderLink>
      {isModalVisible && (
        <EuiModal onClose={toggleModal}>
          <EuiModalHeader>
            <EuiModalHeaderTitle>{content}</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <div>
              <EuiFormRow
                label={content}
              >
                <TextAreaField 
                  rows={2}
                  aria-label={content}
                  placeholder={content}
                  value={feedback}
                  onChange={handleChange}

                />
              </EuiFormRow>
            </div>
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButtonEmpty onClick={toggleModal}>Cancel</EuiButtonEmpty>
            <EuiButton fill onClick={handleSubmit}>Submit</EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}
    </>
  )
}
const GiveFeedback = () => {
  return (
    <ShareYourThoughtsModal />
  )
}
export default GiveFeedback
