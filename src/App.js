import { URLBACK } from './env'
import { TwitterOutlined } from '@ant-design/icons'
import logo from './media/logo/logo_social_archiver_white.png'

function SignUpPage() {
  return (
    <div className="flex h-screen w-screen justify-center pt-20 md:items-center md:pt-0">
      <div className="md:grid md:grid-cols-2 md:gap-4 md:px-10">
        <div className=" flex flex-shrink-0 items-center justify-center px-4 md:pr-8">
          <img className="h-40 w-auto md:h-56" src={logo} alt="Your Company" />
        </div>{' '}
        <div className="mx-10 md:mx-0 md:self-center">
          <h1 className="pt-10 text-center text-xl font-bold text-sa-white md:pt-0 md:text-left md:text-2xl">
            Sign up with Twitter <br />
            to gain access
          </h1>{' '}
          <div className="flex justify-center pt-4 md:justify-start md:pt-4">
            <button
              onClick={() => {
                window.location.assign(`${URLBACK}twitter/connect`)
              }}
              className="flex items-center rounded-lg bg-blue-500 font-bold text-sa-white hover:bg-blue-700"
            >
              <div className=" flex h-10 items-center  justify-center border-r border-r-blue-600 py-2 px-4">
                {' '}
                <TwitterOutlined className="" />
              </div>{' '}
              <div className="h-10 py-2 px-4  ">Sign up</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
