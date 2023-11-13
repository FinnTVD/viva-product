import { TextField } from '@mui/material'
import { useField } from 'formik'

const DatePickerCustom = ({ name }) => {
  const [field, meta] = useField(name)

  const configDatePicker = {
    ...field,
    type: 'month',
    variant: 'outlined',
    fullWidth: true,
    InputLabelProps: {
      shrink: true
    },
    pattern: "[0-1]{1}[0-9]{1}/[0-9]{4}"
  }
  return <TextField {...configDatePicker} />
}

export default DatePickerCustom
