import close_btn from '../icons/close_btn.svg';
import './styles/CloseBtn.css'

export const CloseBtn = ({onClose}) => {
  return (
    <div className="close-btn-container">
      <button onClick={onClose} className="x-btn">
      <img src={close_btn} alt="" className="btn-img"/>
      </button>
    </div>
  )
}
