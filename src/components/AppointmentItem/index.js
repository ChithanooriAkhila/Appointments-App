// Write your code here
const CommentItem = props => {
  const {appointmentDetails, starAppointment} = props

  const {id, title, appointmentDate, isStarred} = appointmentDetails

  const starImg = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const starTheAppointment = () => {
    starAppointment(id)
  }

  return (
    <li>
      <div>
        <p>{title}</p>
        <p>date is {appointmentDate}</p>
      </div>
      <button type="button" onClick={starTheAppointment} data-testid="star">
        <img src={starImg} alt="star" />
      </button>
    </li>
  )
}

export default CommentItem
