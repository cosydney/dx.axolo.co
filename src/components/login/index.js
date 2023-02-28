import React from 'react'
import { URLBACK } from '../../../src/env'

export const Login = () => {
  return (
    <div className="flex h-[88vh] flex-col justify-center bg-white py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="/logo/dx_full_logo.png"
          alt="Logo Axolo"
        />
        <h2 className="text-ourBlack mt-6 text-center text-3xl font-bold">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-ourGrey">
          Improve developer experience with regular, meaningful feedback
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-md">
        <AddToSlack />
        <br></br>
        <SlackSignIn />
      </div>
    </div>
  )
}

class SlackSignIn extends React.Component {
  render() {
    const handleClick = () => {
      // window.location.assign(`${URLBACK}identify/slack`);
      window.location.assign(`${URLBACK}signIn/slack`)
    }
    return (
      <a
        href={'#'}
        onClick={handleClick}
        style={{
          alignItems: 'center',
          color: '#fff',
          backgroundColor: '#4A154B',
          border: 0,
          borderRadius: '4px',
          display: 'inline-flex',
          fontFamily: 'Lato, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          height: '44px',
          justifyContent: 'center',
          textDecoration: 'none',
          width: '224px',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: '16px', width: '16px', marginRight: '12px' }}
          viewBox="0 0 122.8 122.8"
        >
          <path
            d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"
            fill="#e01e5a"
          />
          <path
            d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"
            fill="#36c5f0"
          />
          <path
            d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z"
            fill="#2eb67d"
          />
          <path
            d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"
            fill="#ecb22e"
          />
        </svg>
        Sign in with Slack
      </a>
    )
  }
}

class AddToSlack extends React.Component {
  render() {
    const handleClick = () => {
      window.location.assign(`${URLBACK}identify/slack`)
    }
    return (
      <a
        href={'#'}
        onClick={handleClick}
        style={{
          alignItems: 'center',
          color: '#000',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '4px',
          display: 'inline-flex',
          fontFamily: 'Lato, sans-serif',
          fontSize: '18px',
          fontWeight: 600,
          height: '56px',
          justifyContent: 'center',
          textDecoration: 'none',
          width: '276px',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: '24px', width: '24px', marginRight: '12px' }}
          viewBox="0 0 122.8 122.8"
        >
          <path
            d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"
            fill="#e01e5a"
          />
          <path
            d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"
            fill="#36c5f0"
          />
          <path
            d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z"
            fill="#2eb67d"
          />
          <path
            d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"
            fill="#ecb22e"
          />
        </svg>
        Add to Slack
      </a>
    )
  }
}
