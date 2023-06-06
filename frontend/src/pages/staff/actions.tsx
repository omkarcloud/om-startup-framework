import Seo from '../../components/Seo'
import { useState } from 'react'
import {
    EuiDataGrid,
    EuiForm,
    EuiFormRow,
    formatDate,
} from '@elastic/eui'
import AuthedDashboard from '../../layouts/AuthedDashboard'
import DashboardWrapper from '../../components/DashboardWrapper'
import { FilterPanelWrapper } from '../../components/FilterPanel'
import Hooks from '@omkar111111/utils/hooks'
import Api from '../../utils/api'
import { EuiDatePicker, } from '@elastic/eui'
import CenteredSpinner from '../../components/CenteredSpinner'
import _ from 'lodash'
import SingleSelect from '../../components/inputs/SingleSelect'
import { actionTypesOptions, revenueOptions } from '../../utils/data/options'


function FilterPanel({ end_date, start_date, type, onChange, }) {
    return (
        <>
            <EuiForm>
                <EuiFormRow label="Type">

                    <SingleSelect
                        placeholder="Type"
                        options={actionTypesOptions}
                        value={type}
                        onChange={type => {
                            return onChange({ type })
                        }}
                    />
                </EuiFormRow>

                <EuiFormRow label="Start Date">

                    <EuiDatePicker selected={start_date}
                        onChange={start_date => onChange({ start_date })}
                    />
                </EuiFormRow>
                <EuiFormRow label="End Date">
                    <EuiDatePicker selected={end_date}
                        onChange={end_date => onChange({ end_date })}
                    />
                </EuiFormRow>

            </EuiForm>
        </>
    )
}


const columns = [
    {
      id: 'id',
      display: 'Id',
    },
    {
      id: 'type',
      display: 'type',
    },
    {
      id: 'data',
      display: 'data',
    },  
    {
      id: 'ip',
      display: 'ip',
    },
    {
      id: 'user_agent',
      display: 'user_agent',
    },
    {
      id: 'user',
      display: 'user',
    }
  ]
const DataPanel = ({ data }) => {
    const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  )


  return (
    <EuiDataGrid
      aria-label="Actions Grid"
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      columns={columns}
      rowCount={data.length}
      renderCellValue={({ rowIndex, columnId }) => {
        const el = data[rowIndex]

        const value = el[columnId]

        if (['created_at', 'last_action_date', 'updated_at'].includes(columnId)) {
            return value ? formatDate(value): null
          }
          if (['data'].includes(columnId)) {
            return JSON.stringify(value, null, 2)
          }

        return value ?? null
      }}
      toolbarVisibility={{
        showColumnSelector: true,
        showSortSelector: true,
        showFullScreenSelector: true,
        showDisplaySelector: true,
      }}
    />
  )
}

const Content = () => {

    const [state, setstate] = useState({
        type: null,
        start_date: null,
        end_date: null,
    })

    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState({})

    function updateState(change) {
        setstate(prev => ({ ...prev, ...change }))
    }
    const onApplyFilters = state => {
        async function fetchData() {
            setLoading(true)
            const params = _.omitBy({ ...state, }, _.isNull)
            if (params.start_date){
                params.start_date = params.start_date.format('YYYY-MM-DD')
            }
            if (params.end_date){
                params.end_date = params.end_date.format('YYYY-MM-DD')
            }
            const data = (await Api.getActions(params)).data
            const { total_pages, results } = data

            setData(results)
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
            <Seo title="Actions" />
            <AuthedDashboard>
                <Content />
            </AuthedDashboard>
        </>
    )
}

export default Page
