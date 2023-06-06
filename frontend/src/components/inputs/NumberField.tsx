import Browser from '@omkar111111/utils/browser'
import Language from '@omkar111111/utils/language'
import { EuiFieldNumber } from '@elastic/eui'

export default function NumberField({ value, onChange, ...props }: any) {
  const handleNumberChange = event => {
    let value = Browser.inputValue(event)
    onChange(Language.readNumber(value))
  }

  return (
    <EuiFieldNumber
      {...props}
      fullWidth
      onBlur={() => onChange(value)}
      value={value ?? ''}
      onChange={handleNumberChange} />
  )
}
