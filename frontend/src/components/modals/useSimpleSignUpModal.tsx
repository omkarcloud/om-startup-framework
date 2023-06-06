import { useState } from 'react'
import SimpleSignUpModal from '../SimpleSignUpModal'


export default function useSimpleSignUpModal() {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }


  const modal = isModalVisible && <SimpleSignUpModal {...{
    toggleModal, handleSubmit: () => {
    }
  }} />

  return { showModal: () => setIsModalVisible(true), modal }
}
