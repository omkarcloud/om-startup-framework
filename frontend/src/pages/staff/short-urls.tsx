import Seo from '../../components/Seo'
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
  EuiLink,
} from '@elastic/eui'
import AuthedDashboard from '../../layouts/AuthedDashboard'
import CenteredSpinner from '../../components/CenteredSpinner'
import DashboardWrapper from '../../components/DashboardWrapper'
import { FilterPanelWrapper } from '../../components/FilterPanel'
import Api from '../../utils/api'
import Select from '../../components/inputs/Select'
import { generateListWithIdAndValue } from '../../utils/missc'
import SearchField from '../../components/inputs/SearchField'
import Hooks from '@omkar111111/utils/hooks'
import Toast from '@omkar111111/components/Toast'
import Language from '@omkar111111/utils/language'
import TextField from '../../components/inputs/TextField'
import Config from '../../utils/config'
import TextAreaField from '../../components/inputs/TextAreaField'

function formatShortUrl(short_url) {
  return `https://${Config.DOMAIN_NAME}/l/${short_url}/`

}

const columns = [
  {
    id: 'id',
    display: 'Id',
  },
  {
    id: 'note',
    display: 'Note',
  },
  {
    id: 'original_url',
    display: 'Original Url',
  },
  {
    id: 'short_url',
    display: 'Short Url',
  },
  {
    id: 'click_count',
    display: 'Click Count',
  },
  {
    id: 'created_at',
    display: 'Created At',
  },

  {
    id: 'updated_at',
    display: 'Updated At',
  },
]

function FlyOutComponent({ data, onClose, onSubmit }) {
  const [state, setstate] = useState(data)

  function onChange(change) {
    setstate(prev => ({ ...prev, ...change }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    onSubmit(state)
  }

  return (
    <EuiPortal>
      <EuiFlyout
        size="s"
        ownFocus
        onClose={onClose}>
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2>Short Url</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiForm component="form" onSubmit={handleSubmit}>
            <EuiFormRow label="Original Url" fullWidth>
              <TextField
                placeholder="https://www.yourdomain.com/blog/how-to-get-clients-for-your-digital-marketing-agencies/"
                name="original_url"
                value={state.original_url}
                onChange={(original_url) => onChange({ original_url })}
                fullWidth
              />
            </EuiFormRow>
            <EuiFormRow label="Short Url" fullWidth>
              <TextField
                placeholder="how-to-get-clients"
                name="short_url"
                value={state.short_url}
                onChange={(short_url) => onChange({ short_url })}
                fullWidth
              />
            </EuiFormRow>
            <EuiFormRow label="Note" fullWidth>
              <TextAreaField
              rows={4}
                placeholder="Note..."
                name="note"
                value={state.note}
                onChange={(note) => onChange({ note })}
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

function useFlyout(props) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  function successClose(data) {
    props.onSubmit(data)
    toggleModal()
  }

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  const flyout = isModalVisible && (
    <FlyOutComponent {...props} onClose={toggleModal} onSubmit={successClose} />
  )
  return { showFlyout: () => setIsModalVisible(true), flyout }
}



function FilterPanel({ search, onChange, page, total_pages, refetch }) {
  const onSubmit = ({ ...data }) => {
    Api.createShortUrl(data).then(({ data }) => {
      Toast.success('Successfully Created Url')
      refetch()
    })
  }

  const { flyout, showFlyout } = useFlyout({
    data: { original_url: "", short_url: "", note: "" }, onSubmit
  })

  return (
    <>
      {flyout}
      <EuiForm>
        <EuiFormRow   label="Search">
          <SearchField
            compressed
            placeholder="Search by Short Url or Long Url"
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
        <EuiButton onClick={showFlyout}>
          Create Short URL
        </EuiButton>

      </EuiForm>
    </>
  )
}

const DataPanel = ({ refetch, data, onEdit, onDelete }) => {
  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  )

  const FlyoutRowCell = rowIndex => {
    const onSubmit = ({ id, ...data }) => {
      Api.updateShortUrl(id, data).then(({ data }) => {
        Toast.success('Successfully Updated Url')
        onEdit(id, data)
      })
    }


    const rowData = data[rowIndex.rowIndex]
    const { flyout, showFlyout } = useFlyout({
      data: rowData, onSubmit
    })

    return (
      <>
        <EuiButtonIcon
          color="text"
          iconType="documentEdit"
          iconSize="s"
          aria-label="Edit"
          onClick={showFlyout}
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
          Api.deleteShortUrl(rowData.id).then(() => {
            Toast.success('Successfully Deleted Short Url')
            closeModal()
            onDelete(rowData.id)
          })
        }

        const onSubmit = ({
          original_url,
          note,
          short_url, 
          }) => {
          Api.createShortUrl({
            original_url,
            note,
            short_url,
          }).then(({ }) => {
            Toast.success('Successfully Created Url')
            refetch()
          })
        }

        const { flyout, showFlyout } = useFlyout({
          data: rowData, onSubmit
        })


        const duplicate = () => {
          closePopover()
          showFlyout()
        }

        return (
          <div>
            {flyout}
            {isModalVisible && (
              <EuiModal onClose={closeModal}>
                <EuiModalHeader>
                  <EuiModalHeaderTitle>Confirm Delete</EuiModalHeaderTitle>
                </EuiModalHeader>
                <EuiModalBody>
                  <EuiText>
                    Are you sure you want to delete <b>{formatShortUrl(rowData.short_url)}</b> linking to <b>{rowData.original_url}</b>?
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
              <div>
                <button
                  onClick={() => {
                    duplicate()

                  }}>
                  <EuiFlexGroup
                    alignItems="center"
                    component="span"
                    gutterSize="s">
                    <EuiFlexItem grow={false}>
                      <EuiButtonIcon
                        aria-label="Duplicate"
                        iconType="copy"
                        color="text"
                      />
                    </EuiFlexItem>
                    <EuiFlexItem>Duplicate</EuiFlexItem>
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
      aria-label="Links Grid"
      trailingControlColumns={trailingControlColumns}
      leadingControlColumns={leadingControlColumns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      columns={columns}
      rowCount={data.length}
      renderCellValue={({ rowIndex, columnId }) => {
        const el = data[rowIndex]

        const value = el[columnId]

        if (columnId == 'created_at' || columnId == 'updated_at') {
          return formatDate(value)
        }

        if (columnId == 'short_url') {
          return <EuiLink target={'_blank'} href={formatShortUrl(value)}>{value}</EuiLink>
        }

        if (columnId == 'original_url') {
          return <EuiLink target={'_blank'} href={value}>{value}</EuiLink>
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
      const data = (await Api.getShortUrls(state)).data
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
    data,
    onChange,
    onApplyFilters,
    total_pages,
    refetch: () => onChange({}),
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
      <Seo title="Url Shortner" />
      <AuthedDashboard>
        <Content />
      </AuthedDashboard>
    </>
  )
}

export default Page
