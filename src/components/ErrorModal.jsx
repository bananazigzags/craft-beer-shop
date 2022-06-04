import { CloseBtn } from "./CloseBtn"
import './styles/ErrorModal.css'

export const ErrorModal = ({msg, onClose}) => {
  return (
    <div className="error-modal-container">
      <CloseBtn onClose={onClose}/>
      <p className="error-modal-msg">{msg}</p>
    </div>
  ) 
}