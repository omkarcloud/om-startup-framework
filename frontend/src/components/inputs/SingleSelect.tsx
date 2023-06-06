import { EuiComboBox } from '@elastic/eui'


export default function SingleSelect({ options, value, onChange, ...props }: any) {
  const cleanedOptions = options.map(o => ({
    value: o.id,
    label: o.value,
  }))

  let selected = cleanedOptions.find(x => x.value === value)
  if (!selected && value) {
    selected = { value: value, label: value }
  }

  return (
    <EuiComboBox
    isClearable={true}
    {...props}
      options={cleanedOptions}
      selectedOptions={selected ? [selected] : []}
      onChange={option => {
        const change = option.length === 0 ? '' : option[0].value
        onChange(change)
      }}
      singleSelection={{ asPlainText: true }}
       />
  )
}
