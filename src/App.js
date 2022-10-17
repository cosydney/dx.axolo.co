import './App.css'
import { URLBACK, URLFRONT } from './env'

function App() {
  console.log('url bacj', URLFRONT, process.env.RHM_URLBACK, process.env.NODE_ENV)
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="bg-red-500  text-3xl font-bold underline">Hello world!</h1>{' '}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button
          onClick={() => {
            console.log(`click: ${URLBACK}twitter/connect`)
            window.location.assign(`${URLBACK}twitter/connect`)
          }}
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >
          Sign in with twitter
        </button>
      </header>
    </div>
  )
}

export default App
