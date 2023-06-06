import Seo from '../../components/Seo'
import { useState } from 'react'
import {
  EuiForm,
  EuiFormRow,
} from '@elastic/eui'
import AuthedDashboard from '../../layouts/AuthedDashboard'
import DashboardWrapper from '../../components/DashboardWrapper'
import { FilterPanelWrapper } from '../../components/FilterPanel'
import Hooks from '@omkar111111/utils/hooks'
import Api from '../../utils/api'
import { EuiDatePicker, } from '@elastic/eui'
import moment from 'moment'
import CenteredSpinner from '../../components/CenteredSpinner'

function FilterPanel({ date, onChange, }) {
  return (
    <>
      <EuiForm>
        <EuiFormRow label="Select a Date">
          <EuiDatePicker selected={date}
            onChange={date => onChange({ date })}
          />
        </EuiFormRow>
      </EuiForm>
    </>
  )
}

const DataPanel = ({ data }) => {

  return (
    <>
      <div>
        {JSON.stringify(data)}
      </div>
    </>
  )
}

const Content = () => {
  const [state, setstate] = useState({
    date: moment(),
  })
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState({})

  function updateState(change) {
    setstate(prev => ({ ...prev, ...change }))
  }
  const onApplyFilters = state => {
    async function fetchData() {
      setLoading(true)
      const data = (await Api.getStats({...state, date: state.date.format('YYYY-MM-DD')})).data

      setData(data)
      setLoading(false)
    }
    fetchData()
  }

  Hooks.useDidMount(() => onApplyFilters(state))

  const onChange = (change, applyFilters = true) => {
    updateState(change)
    if (applyFilters) {
      onApplyFilters({ ...state, ...change })
    }
  }

  const props = {
    ...state,
    data: data,
    onChange,
    onApplyFilters,
  }

  return (
    <DashboardWrapper>
      <FilterPanelWrapper>
        <FilterPanel {...props} />
      </FilterPanelWrapper>
      <div className="w-full">
        {isLoading ? (
          <CenteredSpinner />
        ) : (
          <>
            <div className="table-height">
              <DataPanel {...props} />
            </div>
          </>
        )}
      </div>
    </DashboardWrapper>
  )
}

const Page = () => {
  return (
    <>
      <Seo title="Statistics" />
      <AuthedDashboard>
        <Content />
      </AuthedDashboard>
    </>
  )
}

export default Page
