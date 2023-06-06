import Seo from '../../components/Seo'
import { useState } from 'react'
import {
  EuiForm,
  EuiFormRow,
  EuiDataGrid,
} from '@elastic/eui'
import AuthedDashboard from '../../layouts/AuthedDashboard'
import DashboardWrapper from '../../components/DashboardWrapper'
import { FilterPanelWrapper } from '../../components/FilterPanel'
import SearchField from '../../components/inputs/SearchField'
import { PricingList } from '../pricing'
import { isEmptyString } from '../../utils/data/validators'

const columns = [
  {
    id: 'country',
    display: 'Country',
  },
  {
    id: 'currencySymbol',
    display: 'Currency Symbol',
  },
  {
    id: 'MonthlyPrice',
    display: 'Monthly Price',
  },
  {
    id: 'MonthlyDiscountedPrice',
    display: 'Monthly Discounted Price',
  },
  {
    id: 'yearlyTotalMonthlyDiscountedPrice',
    display: 'Monthly Discounted Price (Annual)',
  },
  {
    id: 'savingsAnnual',
    display: 'Savings (Annual)',
  },
  {
    id: 'ReferredMonthlyPrice',
    display: 'Referred Monthly Price',
  },
  {
    id: 'ReferredMonthlyDiscountedPrice',
    display: 'Referred Monthly Discounted Price',
  },
  {
    id: 'yearlyReferredMonthlyDiscountedPrice',
    display: 'Referred Monthly Discounted Price (Annual)',
  },
  {
    id: 'savingsAnnualReferred',
    display: 'Savings Referred (Annual)',
  }
]

function FilterPanel({ search, onChange, }) {
  return (
    <>
      <EuiForm>
        <EuiFormRow   label="Search">
          <SearchField
            compressed
            placeholder="Search by Country Code"
            onApply={search => {
              return onChange({ search })
            }}
            value={search}
            onChange={search => onChange({ search }, false)}
          />
        </EuiFormRow>
      </EuiForm>
    </>
  )
}

const DataPanel = ({ data }) => {
  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  )

  return (
    <EuiDataGrid
      aria-label="Pricing Grid"
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      columns={columns}
      rowCount={data.length}
      renderCellValue={({ rowIndex, columnId }) => {
        const el = data[rowIndex]
        const value = el[columnId]

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
    search: '',
  })

  function updateState(change) {
    setstate(prev => ({ ...prev, ...change }))
  }


  const onChange = (change, applyFilters = true) => {
    updateState(change)

  }

  const props = {
    ...state,
    data: PricingList.filter(x => {
      if (isEmptyString(state.search)) {
        return true
      } else {
        return x.country.toUpperCase().includes(state.search.trim().toUpperCase())
      }
    }),
    onChange,
  }

  return (
    <DashboardWrapper>
      <FilterPanelWrapper>
        <FilterPanel {...props} />
      </FilterPanelWrapper>
      <div className="w-full">
        <DataPanel {...props} />
      </div>
    </DashboardWrapper>
  )
}

const Page = () => {
  return (
    <>
      <Seo title="Pricing Page" />
      <AuthedDashboard>
        <Content />
      </AuthedDashboard>
    </>
  )
}

export default Page
