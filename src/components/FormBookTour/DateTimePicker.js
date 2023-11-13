import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Field, useField } from 'formik'

// import { LocalizationProvider, DatePicker, TextField } from '@mui/lab'
import { AdapterDateFns, format } from '@mui/lab/AdapterDateFns'
const DateTimePicker = ({ name, formik }) => {
  const [field, meta] = useField(name)
  const configDatePicker = {
    ...field
  }

  if (meta && meta.touched && meta.error) (configDatePicker.error = true), (configDatePicker.helperText = meta.error)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        views={['month', 'year']}
      />
    </LocalizationProvider>
  )
}

export default DateTimePicker
