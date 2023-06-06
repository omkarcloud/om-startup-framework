import Seo from '../components/Seo'
import { useState } from 'react'
import {
    EuiButton,
    EuiFieldText,
    EuiForm,
    EuiFormRow,
    EuiSpacer,
    EuiCard,
} from '@elastic/eui'
import AuthedLanding from '../layouts/AuthedLanding'
import SingleSelect from '../components/inputs/SingleSelect'
import Api from '../utils/api'
import { pushToHome } from '../utils/next'
import { useRouter } from 'next/router'
import { isEmptyString } from '../utils/data/validators'
import Messages from '../utils/messages'
import { Company, Employees, Phone } from '../components/forms/ContactForm'
import { isNotEmpty } from '../utils/missc'

const Services = [
    {
        "id": "Accounting",
        "value": "Accounting"
    },
    {
        "id": "Airlines/Aviation",
        "value": "Airlines/Aviation"
    },
    {
        "id": "Alternative Dispute Resolution",
        "value": "Alternative Dispute Resolution"
    },
    {
        "id": "Alternative Medicine",
        "value": "Alternative Medicine"
    },
    {
        "id": "Animation",
        "value": "Animation"
    },
    {
        "id": "App Development",
        "value": "App Development"
    },
    {
        "id": "Apparel & Fashion",
        "value": "Apparel & Fashion"
    },
    {
        "id": "Architecture & Planning",
        "value": "Architecture & Planning"
    },
    {
        "id": "Arts and Crafts",
        "value": "Arts and Crafts"
    },
    {
        "id": "Automotive",
        "value": "Automotive"
    },
    {
        "id": "Aviation & Aerospace",
        "value": "Aviation & Aerospace"
    },
    {
        "id": "Banking",
        "value": "Banking"
    },
    {
        "id": "Biotechnology",
        "value": "Biotechnology"
    },
    {
        "id": "Broadcast Media",
        "value": "Broadcast Media"
    },
    {
        "id": "Building Materials",
        "value": "Building Materials"
    },
    {
        "id": "Business Supplies and Equipment",
        "value": "Business Supplies and Equipment"
    },
    {
        "id": "Capital Markets",
        "value": "Capital Markets"
    },
    {
        "id": "Chemicals",
        "value": "Chemicals"
    },
    {
        "id": "Civic & Social Organization",
        "value": "Civic & Social Organization"
    },
    {
        "id": "Civil Engineering",
        "value": "Civil Engineering"
    },
    {
        "id": "Commercial Real Estate",
        "value": "Commercial Real Estate"
    },
    {
        "id": "Computer & Network Security",
        "value": "Computer & Network Security"
    },
    {
        "id": "Computer Games",
        "value": "Computer Games"
    },
    {
        "id": "Computer Hardware",
        "value": "Computer Hardware"
    },
    {
        "id": "Computer Networking",
        "value": "Computer Networking"
    },
    {
        "id": "Computer Software",
        "value": "Computer Software"
    },
    {
        "id": "Construction",
        "value": "Construction"
    },
    {
        "id": "Consumer Electronics",
        "value": "Consumer Electronics"
    },
    {
        "id": "Consumer Goods",
        "value": "Consumer Goods"
    },
    {
        "id": "Consumer Services",
        "value": "Consumer Services"
    },
    {
        "id": "Cosmetics",
        "value": "Cosmetics"
    },
    // {
    //     "id": "Dairy",
    //     "value": "Dairy"
    // },
    {
        "id": "Defense & Space",
        "value": "Defense & Space"
    },
    {
        "id": "Design",
        "value": "Design"
    },
    {
        "id": "E-Learning",
        "value": "E-Learning"
    },
    {
        "id": "Education Management",
        "value": "Education Management"
    },
    {
        "id": "Electrical/Electronic Manufacturing",
        "value": "Electrical/Electronic Manufacturing"
    },
    {
        "id": "Entertainment",
        "value": "Entertainment"
    },
    {
        "id": "Environmental Services",
        "value": "Environmental Services"
    },
    {
        "id": "Events Services",
        "value": "Events Services"
    },
    {
        "id": "Executive Office",
        "value": "Executive Office"
    },
    {
        "id": "Facilities Services",
        "value": "Facilities Services"
    },
    {
        "id": "Farming",
        "value": "Farming"
    },
    {
        "id": "Financial Services",
        "value": "Financial Services"
    },
    {
        "id": "Fine Art",
        "value": "Fine Art"
    },
    // {
    //     "id": "Fishery",
    //     "value": "Fishery"
    // },
    {
        "id": "Food & Beverages",
        "value": "Food & Beverages"
    },
    {
        "id": "Food Production",
        "value": "Food Production"
    },
    {
        "id": "Fund-Raising",
        "value": "Fund-Raising"
    },
    {
        "id": "Furniture",
        "value": "Furniture"
    },
    // {
    //     "id": "Gambling & Casinos",
    //     "value": "Gambling & Casinos"
    // },
    {
        "id": "Glass, Ceramics & Concrete",
        "value": "Glass, Ceramics & Concrete"
    },
    {
        "id": "Government Administration",
        "value": "Government Administration"
    },
    {
        "id": "Government Relations",
        "value": "Government Relations"
    },
    {
        "id": "Graphic Design",
        "value": "Graphic Design"
    },
    {
        "id": "Health, Wellness and Fitness",
        "value": "Health, Wellness and Fitness"
    },
    {
        "id": "Higher Education",
        "value": "Higher Education"
    },
    {
        "id": "Hospital & Health Care",
        "value": "Hospital & Health Care"
    },
    {
        "id": "Hospitality",
        "value": "Hospitality"
    },
    {
        "id": "Human Resources",
        "value": "Human Resources"
    },
    {
        "id": "Import and Export",
        "value": "Import and Export"
    },
    {
        "id": "Individual & Family Services",
        "value": "Individual & Family Services"
    },
    {
        "id": "Industrial Automation",
        "value": "Industrial Automation"
    },
    {
        "id": "Information Services",
        "value": "Information Services"
    },
    {
        "id": "Information Technology and Services",
        "value": "Information Technology and Services"
    },
    {
        "id": "Insurance",
        "value": "Insurance"
    },
    {
        "id": "International Affairs",
        "value": "International Affairs"
    },
    {
        "id": "International Trade and Development",
        "value": "International Trade and Development"
    },
    {
        "id": "Investment Banking",
        "value": "Investment Banking"
    },
    {
        "id": "Investment Management",
        "value": "Investment Management"
    },
    {
        "id": "Judiciary",
        "value": "Judiciary"
    },
    {
        "id": "Law Enforcement",
        "value": "Law Enforcement"
    },
    {
        "id": "Law Practice",
        "value": "Law Practice"
    },
    {
        "id": "Lead Generation",
        "value": "Lead Generation"
    },
    {
        "id": "Legal Services",
        "value": "Legal Services"
    },
    {
        "id": "Legislative Office",
        "value": "Legislative Office"
    },
    {
        "id": "Leisure, Travel & Tourism",
        "value": "Leisure, Travel & Tourism"
    },
    {
        "id": "Libraries",
        "value": "Libraries"
    },
    {
        "id": "Logistics and Supply Chain",
        "value": "Logistics and Supply Chain"
    },
    {
        "id": "Luxury Goods & Jewelry",
        "value": "Luxury Goods & Jewelry"
    },
    {
        "id": "Machinery",
        "value": "Machinery"
    },
    {
        "id": "Management Consulting",
        "value": "Management Consulting"
    },
    {
        "id": "Maritime",
        "value": "Maritime"
    },
    {
        "id": "Market Research",
        "value": "Market Research"
    },
    {
        "id": "Marketing and Advertising",
        "value": "Marketing and Advertising"
    },
    {
        "id": "Mechanical or Industrial Engineering",
        "value": "Mechanical or Industrial Engineering"
    },
    {
        "id": "Media Production",
        "value": "Media Production"
    },
    {
        "id": "Medical Devices",
        "value": "Medical Devices"
    },
    {
        "id": "Medical Practice",
        "value": "Medical Practice"
    },
    {
        "id": "Mental Health Care",
        "value": "Mental Health Care"
    },
    // {
    //     "id": "Military",
    //     "value": "Military"
    // },
    {
        "id": "Mining & Metals",
        "value": "Mining & Metals"
    },
    {
        "id": "Mobile Games",
        "value": "Mobile Games"
    },
    {
        "id": "Motion Pictures and Film",
        "value": "Motion Pictures and Film"
    },
    {
        "id": "Museums and Institutions",
        "value": "Museums and Institutions"
    },
    {
        "id": "Music",
        "value": "Music"
    },
    {
        "id": "Nanotechnology",
        "value": "Nanotechnology"
    },
    {
        "id": "Newspapers",
        "value": "Newspapers"
    },
    {
        "id": "Non-Profit Organization Management",
        "value": "Non-Profit Organization Management"
    },
    {
        "id": "Oil & Energy",
        "value": "Oil & Energy"
    },
    {
        "id": "Online Media",
        "value": "Online Media"
    },
    {
        "id": "Other",
        "value": "Other"
    },
    {
        "id": "Outsourcing/Offshoring",
        "value": "Outsourcing/Offshoring"
    },
    {
        "id": "Package/Freight Delivery",
        "value": "Package/Freight Delivery"
    },
    {
        "id": "Packaging and Containers",
        "value": "Packaging and Containers"
    },
    {
        "id": "Paper & Forest Products",
        "value": "Paper & Forest Products"
    },
    {
        "id": "Performing Arts",
        "value": "Performing Arts"
    },
    {
        "id": "Pharmaceuticals",
        "value": "Pharmaceuticals"
    },
    {
        "id": "Philanthropy",
        "value": "Philanthropy"
    },
    {
        "id": "Photography",
        "value": "Photography"
    },
    {
        "id": "Plastics",
        "value": "Plastics"
    },
    {
        "id": "Political Organization",
        "value": "Political Organization"
    },
    {
        "id": "Primary/Secondary Education",
        "value": "Primary/Secondary Education"
    },
    {
        "id": "Printing",
        "value": "Printing"
    },
    {
        "id": "Professional Training & Coaching",
        "value": "Professional Training & Coaching"
    },
    {
        "id": "Program Development",
        "value": "Program Development"
    },
    {
        "id": "Public Policy",
        "value": "Public Policy"
    },
    {
        "id": "Public Relations and Communications",
        "value": "Public Relations and Communications"
    },
    {
        "id": "Public Safety",
        "value": "Public Safety"
    },
    {
        "id": "Publishing",
        "value": "Publishing"
    },
    {
        "id": "Railroad Manufacture",
        "value": "Railroad Manufacture"
    },
    // {
    //     "id": "Ranching",
    //     "value": "Ranching"
    // },
    {
        "id": "Real Estate",
        "value": "Real Estate"
    },
    {
        "id": "Recreational Facilities and Services",
        "value": "Recreational Facilities and Services"
    },
    {
        "id": "Religious Institutions",
        "value": "Religious Institutions"
    },
    {
        "id": "Renewables & Environment",
        "value": "Renewables & Environment"
    },
    {
        "id": "Research",
        "value": "Research"
    },
    {
        "id": "Restaurants",
        "value": "Restaurants"
    },
    {
        "id": "Retail",
        "value": "Retail"
    },
    {
        "id": "Security and Investigations",
        "value": "Security and Investigations"
    },
    {
        "id": "Semiconductors",
        "value": "Semiconductors"
    },
    {
        "id": "Shipbuilding",
        "value": "Shipbuilding"
    },
    {
        "id": "Sporting Goods",
        "value": "Sporting Goods"
    },
    {
        "id": "Sports",
        "value": "Sports"
    },
    {
        "id": "Staffing and Recruiting",
        "value": "Staffing and Recruiting"
    },
    {
        "id": "Supermarkets",
        "value": "Supermarkets"
    },
    {
        "id": "Telecommunications",
        "value": "Telecommunications"
    },
    {
        "id": "Textiles",
        "value": "Textiles"
    },
    {
        "id": "Think Tanks",
        "value": "Think Tanks"
    },
    // {
    //     "id": "Tobacco",
    //     "value": "Tobacco"
    // },
    {
        "id": "Translation and Localization",
        "value": "Translation and Localization"
    },
    {
        "id": "Transportation/Trucking/Railroad",
        "value": "Transportation/Trucking/Railroad"
    },
    {
        "id": "Utilities",
        "value": "Utilities"
    },
    {
        "id": "Venture Capital & Private Equity",
        "value": "Venture Capital & Private Equity"
    },
    {
        "id": "Veterinary",
        "value": "Veterinary"
    },
    {
        "id": "Warehousing",
        "value": "Warehousing"
    },
    {
        "id": "Web Development",
        "value": "Web Development"
    },
    {
        "id": "Wholesale",
        "value": "Wholesale"
    },
    // {
    //     "id": "Wine and Spirits",
    //     "value": "Wine and Spirits"
    // },
    {
        "id": "Wireless",
        "value": "Wireless"
    },
    {
        "id": "Writing and Editing",
        "value": "Writing and Editing"
    }
]

const Content = ({ id }) => {
    const [company_name, set_company_name] = useState('')
    const [phone_number, set_phone_number] = useState('')
    const [provides_service, set_provides_service] = useState('')

    const [employee_size, set_employee_size] = useState('')

    const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false)

    const errors = []
    if (isEmptyString(provides_service)) {
        errors.push(Messages.PROVIDES_SERVICE_IN_VALID)
    }

    if (isEmptyString(company_name)) {
        errors.push(Messages.COMPANY_IN_VALID)
    }

    if (isEmptyString(employee_size)) {
        errors.push(Messages.EMPLOYEE_SIZE_IN_VALID)
    }

    if (isEmptyString(phone_number)) {
        errors.push(Messages.PHONE_IN_VALID)
    }

    const router = useRouter()

    const isInvalid = errors.length > 0

    const handleSubmit = event => {
        event.preventDefault()
        setHasSubmittedOnce(true)
        if (!isInvalid) {
            const first_referrer = localStorage.getItem('first_referrer')
            const first_url_params = JSON.parse(localStorage.getItem('first_url_params'))


            const data = {
                first_referrer,
                first_url_params,
                company_name,
                employee_size,
                phone_number,
                provides_service,
                has_on_boarded: true,
            }

            const referral_code = localStorage.getItem('referral_code')
            const has_referral_code = isNotEmpty(referral_code)

            if (has_referral_code) {
                data["referral_code"] = referral_code
            }

            Api.updateOnboarding(id, data).then(() => {
                Api.trackAction('onboarded', {})
                pushToHome(router)
            })
        }
    }

    return (
        <div className="page-card-wrapper ">
            <EuiCard title="On Boarding Form">
                <EuiSpacer size="l" />

                <EuiForm
                    isInvalid={hasSubmittedOnce && isInvalid && true}
                    error={hasSubmittedOnce && isInvalid && errors}
                    component="form"
                    onSubmit={handleSubmit}>
                    <EuiFormRow label="Industry" fullWidth>
                        <SingleSelect
                            fullWidth
                            // placeholder="This helps us tailor yourcompanyname to your needs"
                            options={Services}
                            value={provides_service}
                            onChange={provides_service => {
                                return set_provides_service(provides_service)
                            }}
                        />
                    </EuiFormRow>
                    <Company
                        value={company_name}
                        onChange={e => set_company_name(e.target.value)}
                    />
                    <Employees
                        value={employee_size}
                        onChange={employee_size => {
                            return set_employee_size(employee_size)
                        }}
                    />
                    <Phone
                        value={phone_number}
                        onChange={e => set_phone_number(e.target.value)}
                    />
                    <EuiSpacer />
                    <EuiButton type="submit" fill>
                        Submit
                    </EuiButton>
                </EuiForm>
            </EuiCard>
        </div>
    )
}

const Page = props => {
    const Component = AuthedLanding

    return (
        <>
            <Seo title="On Boarding" />
            <Component>
                <Content {...props} />
            </Component>
        </>
    )
}

export default Page
