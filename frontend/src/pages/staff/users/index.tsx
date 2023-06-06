import Link from 'next/link'
import Seo from '../../../components/Seo'
import { useState } from 'react'
import {
  EuiForm,
  EuiFormRow,
  EuiPagination,
  EuiDataGrid,
  EuiButtonIcon,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiPortal,
  EuiTitle,
  EuiButton,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPopover,
  EuiPopoverTitle,
  EuiButtonEmpty,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiText,
  EuiModalHeaderTitle,
  formatDate,
} from '@elastic/eui'
import AuthedDashboard from '../../../layouts/AuthedDashboard'
import CenteredSpinner from '../../../components/CenteredSpinner'
import DashboardWrapper from '../../../components/DashboardWrapper'
import { FilterPanelWrapper } from '../../../components/FilterPanel'
import Api from '../../../utils/api'
import Select from '../../../components/inputs/Select'
import { generateListWithIdAndValue } from '../../../utils/missc'
import SearchField from '../../../components/inputs/SearchField'
import Hooks from '@omkar111111/utils/hooks'
import Toast from '@omkar111111/components/Toast'
import NumberField from '../../../components/inputs/NumberField'
import CheckboxBoxField from '../../../components/inputs/CheckBoxField'
import Language from '@omkar111111/utils/language'
import Links from '../../../utils/data/links'

function FilterPanel({ search, onChange, page, total_pages }) {
  const onDownloadAsCsv = () => {
    return Api.downloadUsers()
  }

  return (
    <EuiForm>
      <EuiFormRow   label="Search">
        <SearchField
          compressed
          placeholder="Search by Name or Email"
          onApply={search => {
            return onChange({ search })
          }}
          value={search}
          onChange={search => onChange({ search }, false)}
        />
      </EuiFormRow>

      <EuiFormRow   label="Page Count">
        <Select
          placeholder="Select Page"
          compressed
          options={generateListWithIdAndValue(total_pages)}
          value={page}
          onChange={page => {
            page = Number(page)
            return onChange({ page: page })
          }}
        />
      </EuiFormRow>
      <EuiButton onClick={onDownloadAsCsv}>
        Download Users
      </EuiButton>

    </EuiForm>
  )
}

const columns = [
  {
    id: 'id',
    display: 'Id',
  },
  {
    id: 'country',
    display: 'Country',
  },
  {
    id: 'company_name',
    display: 'Company Name',
  },
  {
    id: 'employee_size',
    display: 'Employee Size',
  },
  {
    id: 'name',
    display: 'Name',
  },
  {
    id: 'total_actions',
    display: 'Total Actions',
  },
  {
    id: 'actions_today',
    display: 'Actions Today',
  },
  {
    id: 'last_action_date',
    display: 'Last Action Date',
  },
  {
    id: 'email',
    display: 'Email',
  },
  {
    id: 'phone_number',
    display: 'Phone Number',
  },
  {
    id: 'provides_service',
    display: 'Provides Service',
  },
  {
    id: 'first_referrer',
    display: 'First Referrer',
  },
  {
    id: 'first_url_params',
    display: 'First Url Params',
  },
  {
    id: 'created_at',
    display: 'Joined At',
  },
  {
    id: 'pending_amount',
    display: 'Pending Amount',
  },
  {
    id: 'paid_amount',
    display: 'Paid Amount',
  },
  {
    id: 'referral_link_clicks',
    display: 'Referral Link Clicks',
  },
  {
    id: 'referral_code',
    display: 'Referral Code',
  },
  {
    id: 'referred_by',
    display: 'Referred By',
  },
  {
    id: 'auth_method',
    display: 'Auth Method',
  },
  {
    id: 'is_banned',
    display: 'Is Banned',
  },
]


const DataPanel = ({ data, onEdit, onDelete }) => {
  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  )

  const FlyoutRowCell = (rowIndex) => {
    const rowData = data[rowIndex.rowIndex]
    let flyout
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(false)

    const [pending_amount, set_pending_amount] = useState(
      rowData.pending_amount
    )

    const [paid_amount, set_paid_amount] = useState(
      rowData.paid_amount
    )

    const [is_banned, set_is_banned] = useState(rowData.is_banned)

    if (isFlyoutOpen) {
      const handleSubmit = event => {
        event.preventDefault()
        Api.updateUser(rowData.id, {
          pending_amount,
          paid_amount,
          is_banned,
        }).then(({ data }) => {
          Toast.success('Successfully Updated User')
          setIsFlyoutOpen(false)
          onEdit(rowData.id, data)
        })
      }

      flyout = (
        <EuiPortal>
          <EuiFlyout
            size="s"
            ownFocus
            onClose={() => setIsFlyoutOpen(!isFlyoutOpen)}>
            <EuiFlyoutHeader hasBorder>
              <EuiTitle size="m">
                <h2>{rowData.name}</h2>
              </EuiTitle>
            </EuiFlyoutHeader>
            <EuiFlyoutBody>
              <EuiForm component="form" onSubmit={handleSubmit}>
                <EuiFormRow label="Pending Amount" fullWidth>
                  <NumberField
                    value={pending_amount}
                    onChange={e => set_pending_amount(e)}
                    fullWidth
                  />
                </EuiFormRow>
                <EuiFormRow label="Paid Amount" fullWidth>
                  <NumberField
                    value={paid_amount}
                    onChange={e => set_paid_amount(e)}
                    fullWidth
                  />
                </EuiFormRow>
               
                <EuiFormRow label="Is Banned" fullWidth>
                  <CheckboxBoxField
                    value={is_banned}
                    onChange={e => set_is_banned(e)}
                    fullWidth
                  />
                </EuiFormRow>
                
                <EuiSpacer />
                <EuiButton type="submit" fullWidth fill>
                  Submit
                </EuiButton>
              </EuiForm>
            </EuiFlyoutBody>
          </EuiFlyout>
        </EuiPortal>
      )
    }

    return (
      <>
        <EuiButtonIcon
          color="text"
          iconType="documentEdit"
          iconSize="s"
          aria-label="Edit"
          onClick={() => setIsFlyoutOpen(!isFlyoutOpen)}
        />
        {flyout}
      </>
    )
  }

  const leadingControlColumns = [
    {
      id: 'Edit',
      width: 36,
      headerCellRender: () => null,
      rowCellRender: FlyoutRowCell,
    },
    {
      id: 'View',
      width: 36,
      headerCellRender: () => null,
      rowCellRender: (rowIndex) => {
        const rowData = data[rowIndex.rowIndex]
        return (
          <>
            <Link href={`/staff/users/${rowData.id}/`} passHref>
              <EuiButtonIcon
                color="text"
                iconType="eye"
                iconSize="s"
                aria-label="View" />
            </Link>
          </>
        )
      },
    },
  ]

  const trailingControlColumns = [
    {
      id: 'actions',
      width: 40,
      headerCellRender: () => null,
      rowCellRender: function RowCellRender(rowIndex) {
        const rowData = data[rowIndex.rowIndex]

        const [isPopoverOpen, setIsPopoverOpen] = useState(false)
        const closePopover = () => setIsPopoverOpen(false)
        const [isModalVisible, setIsModalVisible] = useState(false)

        const closeModal = () => {
          setIsModalVisible(false)
        }

        const openModal = () => {
          setIsModalVisible(true)
        }

        const confirmDelete = () => {
          Api.deleteUser(rowData.id).then(() => {
            Toast.success('Successfully Delete User')
            closeModal()
            onDelete(rowData.id)
          })
        }

        return (
          <div>
            {isModalVisible && (
              <EuiModal onClose={closeModal}>
                <EuiModalHeader>
                  <EuiModalHeaderTitle>Confirm Delete</EuiModalHeaderTitle>
                </EuiModalHeader>
                <EuiModalBody>
                  <EuiText>
                    Are you sure you want to delete User <b>{rowData.name}</b>?
                    The action is <b>irreversible</b>.
                  </EuiText>
                </EuiModalBody>
                <EuiModalFooter>
                  <EuiButtonEmpty onClick={closeModal}>Cancel</EuiButtonEmpty>
                  <EuiButton color="danger" onClick={confirmDelete}>
                    Delete
                  </EuiButton>
                </EuiModalFooter>
              </EuiModal>
            )}

            <EuiPopover
              isOpen={isPopoverOpen}
              anchorPosition="upCenter"
              panelPaddingSize="s"
              button={
                <EuiButtonIcon
                  aria-label="show actions"
                  iconType="boxesHorizontal"
                  color="text"
                  onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                />
              }
              closePopover={closePopover}>
              <EuiPopoverTitle>Actions</EuiPopoverTitle>
              <div>
                <button
                  onClick={() => {
                    closePopover()
                    openModal()
                  }}>
                  <EuiFlexGroup
                    alignItems="center"
                    component="span"
                    gutterSize="s">
                    <EuiFlexItem grow={false}>
                      <EuiButtonIcon
                        aria-label="Delete selected items"
                        iconType="trash"
                        color="text"
                      />
                    </EuiFlexItem>
                    <EuiFlexItem>Delete</EuiFlexItem>
                  </EuiFlexGroup>
                </button>
              </div>
            </EuiPopover>
          </div>
        )
      },
    },
  ]

  return (
    <EuiDataGrid
      aria-label="Users Grid"
      trailingControlColumns={trailingControlColumns}
      leadingControlColumns={leadingControlColumns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      columns={columns}
      rowCount={data.length}
      renderCellValue={({ rowIndex, columnId }) => {
        const el = data[rowIndex]

        const value = el[columnId]

        if (columnId == 'is_banned' || columnId == 'show_all_pages') {
          if (value) {
            return 'Yes'
          } else {
            return 'No'
          }
        }

        if (['created_at', 'last_action_date', 'updated_at'].includes(columnId)) {
          return value ? formatDate(value): null
        }

        if (columnId == 'first_url_params') {
          return JSON.stringify(value)
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
    page: 1,
    search: '',
  })

  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [total_pages, setTotalPages] = useState(1)

  function updateState(change) {
    setstate(prev => ({ ...prev, ...change }))
  }

  function goToFirstPage() {
    updateState({ page: 1 })
  }

  const onApplyFilters = state => {
    async function fetchData() {
      setLoading(true)
      const data = (await Api.getUsers(state)).data
      const { total_pages, results } = data
      setTotalPages(total_pages)

      if (state.page > total_pages) {
        goToFirstPage()
      }

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
    data: [...data].reverse(),
    onChange,
    onApplyFilters,
    total_pages,
    onDelete: id => {
      const newdata = [...data].filter(x => x.id !== id)
      setData(newdata)
    },
    onEdit: (id, updated_record) => {
      const newdata = [...data]
      const index = newdata.indexOf(Language.findById(newdata, id))
      newdata[index] = { ...newdata[index], ...updated_record }
      setData(newdata)
    },
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
            <EuiPagination
              aria-label={'Pagination'}
              style={{
                display: 'flex',
                justifyContent: 'end',
              }}
              pageCount={total_pages}
              activePage={state.page - 1}
              onPageClick={page => onChange({ page: page + 1 })}
            />
          </>
        )}
      </div>
    </DashboardWrapper>
  )
}

const Page = () => {
  return (
    <>
      <Seo title="Users" />
      <AuthedDashboard>
        <Content />
      </AuthedDashboard>
    </>
  )
}

export default Page
