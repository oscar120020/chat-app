import moment from 'moment';


export const dateMonth = (date) => {
    const today = moment(date)
    return today.format("HH:mm a | MMM Do")
}