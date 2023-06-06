import { useState } from 'react'
import {
    EuiButton,
    EuiFieldText,
    EuiForm,
    EuiFormRow,
} from '@elastic/eui'
import SingleSelect from '../inputs/SingleSelect'
import Toast from '@omkar111111/components/Toast'
import Analytics from '../../utils/analytics'
import { isEmptyString, isValidEmail } from '../../utils/data/validators'
import Messages from '../../utils/messages'
import useAxios from '../../utils/axios/use-axios'
import Api from '../../utils/api'
import TextAreaField from '../inputs/TextAreaField'

const employeeOptions = [
    {
        id: '1',
        value: '1',
    },
    {
        id: '2 to 5',
        value: '2 to 5',
    },
    {
        id: '6 to 10',
        value: '6 to 10',
    },
    {
        id: '11 to 25',
        value: '11 to 25',
    },
    {
        id: '26 to 50',
        value: '26 to 50',
    },
    {
        id: '51 to 200',
        value: '51 to 200',
    },
    {
        id: '201 to 1,000',
        value: '201 to 1,000',
    },
    {
        id: '1,001 to 10,000',
        value: '1,001 to 10,000',
    },
    {
        id: '10,001+',
        value: '10,001+',
    }
]


export function Company({ value, onChange }) {
    return (<EuiFormRow label="Company Name" fullWidth>
        <EuiFieldText
            name="company_name"
            fullWidth
            value={value}
            onChange={onChange}

        />
    </EuiFormRow>
    )
}


export function Employees({ value, onChange }) {
    return (<EuiFormRow fullWidth label="Employees">
        <SingleSelect
            fullWidth
            // placeholder="Select Employees"
            options={employeeOptions}
            isClearable={false}
            value={value}
            onChange={employee_size => {
                return onChange(employee_size)
            }}
        />
    </EuiFormRow>
    )
}

export function Phone({ value, onChange }) {
    return (<EuiFormRow fullWidth label="Phone Number">
        <EuiFieldText
            type={"tel"}
            fullWidth
            name="phone"
            value={value}
            onChange={onChange}
        />
    </EuiFormRow>
    )
}


export default function ContactForm({ askRequirements = false, onSubmit, submitText = "Contact Us" }) {
    const { isLoading, fetch, data = {} } = useAxios(() => Api.getIpInfo())

    const [requirements, setrequirements] = useState('')
    const [state, setstate] = useState({
        name: '',
        company_name: '',
        email: '',
        phone: '',
        // employee_size: '',
    })
    const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false)

    const errors = []

    if (isEmptyString(state.name)) {
        errors.push(Messages.NAME_IN_VALID)
    }

    if (isEmptyString(state.company_name)) {
        errors.push(Messages.COMPANY_IN_VALID)
    }
    if (!isValidEmail(state.email)) {
        errors.push(Messages.EMAIL_IN_VALID)
    }

    if (isEmptyString(state.phone)) {
        errors.push(Messages.PHONE_IN_VALID)
    }

    if (askRequirements && isEmptyString(requirements)) {
        errors.push(Messages.REQUIREMENTS_IN_VALID)
    }

    const isInvalid = errors.length > 0

    const onChange = props => {
        setstate({
            ...state,
            ...props,
        })
    }

    const handleInputChange = e => {
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        const r = {
            [name]: value,
        }
        onChange(r)
    }

    const handleSubmit = event => {
        event.preventDefault()
        setHasSubmittedOnce(true)
        if (!isInvalid) {
            const result = { ...state, country: data['country'] , country_name: data['country_name']}
            if (askRequirements) {
                result['requirements'] = requirements
            }
            onSubmit(result)
        }
    }

    return (
        <EuiForm
            isInvalid={hasSubmittedOnce && isInvalid && true}
            error={hasSubmittedOnce && isInvalid && errors}
            component="form"
            onSubmit={handleSubmit}>
            <EuiFormRow label="Name" fullWidth>
                <EuiFieldText
                    name="name"
                    value={state.name}
                    onChange={handleInputChange}
                    fullWidth
                />
            </EuiFormRow>

            <Company
                value={state.company_name}
                onChange={handleInputChange}
            />

            <EuiFormRow label="Email" fullWidth>
                <EuiFieldText
                    type={"email"}
                    name="email"
                    fullWidth
                    value={state.email}
                    onChange={handleInputChange}
                />
            </EuiFormRow>

            <Phone
                value={state.phone}
                onChange={handleInputChange}
            />
            {askRequirements && <EuiFormRow label="Requirements" fullWidth>
                <TextAreaField
                    rows={2}
                    name="requirements"
                    fullWidth
                    value={requirements}
                    onChange={(x) => setrequirements(x)}
                />
            </EuiFormRow>}
            <EuiButton type="submit" fill>
                {submitText}
            </EuiButton>
        </EuiForm>
    )
}