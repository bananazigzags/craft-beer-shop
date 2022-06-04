import sad from '../icons/sad.svg'
import './styles/LoginMsg.css'

export const LoginMsg = () => {
  return (
    <div className='login-msg'>
      <img src={sad} alt="" className="dog-img"/>
      <span>Чтобы добавить товар в корзину залогинтесь</span>      
    </div>
  )
}