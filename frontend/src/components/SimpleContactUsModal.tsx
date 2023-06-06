import { EuiButton, EuiForm, EuiFormRow, EuiText } from '@elastic/eui'
import { useState } from 'react'
import {
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiButtonEmpty,
} from '@elastic/eui'
import Api from '../utils/api'
import useAxios from '../utils/axios/use-axios'
import { isEmptyString } from '../utils/data/validators'
import Messages from '../utils/messages'
import TextAreaField from './inputs/TextAreaField'
// We're here to support your mission! Contact us to see how we can help you grow and succeed.
export default function SimpleContactUsModal({ askRequirements = false, toggleModal, handleSubmit, submitText = 'Contact Us', submitDescription = `We're here to support your mission! Contact us to see how we can help you grow and succeed.` }) {
  const { isLoading, fetch, data = {} } = useAxios(() => Api.getIpInfo())

  const [requirements, setrequirements] = useState('')
  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false)

  const errors = []
  if (askRequirements && isEmptyString(requirements)) {
    errors.push(Messages.REQUIREMENTS_IN_VALID)
  }
  const isInvalid = errors.length > 0

  const _handleSubmit = event => {
    event.preventDefault()
    setHasSubmittedOnce(true)
    if (!isInvalid) {
      const result = { country: data['country'] , country_name: data['country_name']}
      if (askRequirements) {
        result['requirements'] = requirements
      }
      handleSubmit(result)
    }
  }
  return <EuiModal className='text-center' onClose={toggleModal}>
    <EuiModalHeader className='justify-center'>
      <EuiModalHeaderTitle>{submitText}</EuiModalHeaderTitle>
    </EuiModalHeader>
    <EuiModalBody>
      <EuiForm
        isInvalid={hasSubmittedOnce && isInvalid && true}
        error={hasSubmittedOnce && isInvalid && errors}
        component="form"
        onSubmit={_handleSubmit}>



        {askRequirements ? <EuiFormRow label="Requirements" fullWidth>
          <TextAreaField
                              rows={2}

            name="requirements"
            fullWidth
            value={requirements}
            onChange={(x) => setrequirements(x)}
          />
        </EuiFormRow> : <div className='mb-8'>
          <EuiText>
            {submitDescription}
          </EuiText>
        </div>}


        <EuiButton size='m' type="submit" fill>
          {submitText}
        </EuiButton>

      </EuiForm>
    </EuiModalBody>
  </EuiModal>
}