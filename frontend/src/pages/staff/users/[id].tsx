import { GetServerSideProps } from 'next/types'
import Seo from '../../../components/Seo'
import AuthedLanding from '../../../layouts/AuthedLanding'
import UnAuthedLanding from '../../../layouts/UnAuthedLanding'
import BackendAxios from '../../../utils/axios/backend'
import Api from '../../../utils/api'
import AuthedDashboard from '../../../layouts/AuthedDashboard'
import { EuiText } from '@elastic/eui'

function Content({ is_authenticated, data }) {
  const Component = is_authenticated ? AuthedLanding : UnAuthedLanding

  return (
    <>
      <Seo title="User Details" />
      <AuthedDashboard>
        <div className='max-w-screen-lg			mt-6 px-6    m-auto'>

          <EuiText>
            <ol className="whitespace-pre	list-decimal pl-12">
              {data.map((item) => {
                return <li>{item}</li>
              })}
            </ol>
          </EuiText>
        </div>
      </AuthedDashboard>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params,
  res,
  req,
}) => {
  const id = (params as any).id
  const cookie = req.headers.cookie
  const { data } = await BackendAxios.get(`/users/${id}/actions/`, {
    silent: true,
    headers: cookie ? { cookie } : undefined,
  })

  return {
    props: { data },
  }
}

export default Content
