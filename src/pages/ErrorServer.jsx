import './styles/ErrorServer.css'

export const ErrorServer = ({text}) => {
  return <div className="server-error">
    <h1>Беда с сервером. Попробуйте позже</h1>
    <p className='error-msg-main'>Ошибка: {text}</p>
    </div>
}