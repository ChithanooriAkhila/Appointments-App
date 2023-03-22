// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointments: '',
    title: '',
    appointmentDate: '',
    starredAppointments: false,
  }

  addTitle = event => {
    this.setState({title: event.target.value})
  }

  addAppointmentDate = event => {
    const date = event.target.value
    console.log(date)

    this.setState({appointmentDate: date})
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, appointmentDate} = this.state
    const formattedDate = format(
      new Date(appointmentDate),
      'dd MMMM yyyy, EEEE',
    )
    const obj = {
      id: uuidv4(),
      title,
      appointmentDate: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointments: [...prevState.appointments, obj],
      title: '',
      appointmentDate: '',
    }))
  }

  starAppointment = id => {
    this.setState(prevState => ({
      appointments: prevState.appointments.map(appointment => {
        if (id === appointment.id) {
          return {...appointment, isStarred: !appointment.isStarred}
        }
        return appointment
      }),
    }))
  }

  displayStarredItems = () => {
    this.setState(prev => ({
      starredAppointments: !prev.starredAppointments,
    }))
  }

  getStarredAppointments = () => {
    const {appointments} = this.state
    return appointments.filter(appointment => appointment.isStarred)
  }

  render() {
    const {
      appointments,
      title,
      appointmentDate,
      starredAppointments,
    } = this.state

    return (
      <div>
        <div>
          <div>
            <h1>Add Appointments</h1>
            <form onSubmit={this.addAppointment}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Title"
                onChange={this.addTitle}
                value={title}
                id="title"
              />
              <label htmlFor="date">Date</label>
              <input
                type="date"
                placeholder="dd/mm/yyyy"
                onChange={this.addAppointmentDate}
                value={appointmentDate}
                id="date"
              />
              <button type="submit">Add</button>
            </form>
          </div>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              alt="appointments"
            />
          </div>
        </div>
        <div>
          <p>Appointments</p>
          <ul>
            {!starredAppointments
              ? appointments &&
                appointments.map(appointment => (
                  <AppointmentItem
                    appointmentDetails={appointment}
                    starAppointment={this.starAppointment}
                    key={appointment.id}
                  />
                ))
              : this.getStarredAppointments() &&
                this.getStarredAppointments().map(appointment => (
                  <AppointmentItem
                    appointmentDetails={appointment}
                    starAppointment={this.starAppointment}
                    key={appointment.id}
                  />
                ))}
          </ul>
          <button type="button" onClick={this.displayStarredItems}>
            starred
          </button>
        </div>
      </div>
    )
  }
}

export default Appointments
