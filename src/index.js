import React from 'react'
import './index.css'
import { render } from 'react-dom'
import store from './app/store'
import Root from './Root'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'

const persistor = persistStore(store)
const queryClient = new QueryClient()
// persistor.purge()

render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
      </PersistGate>
    </QueryClientProvider>
  </Provider>,
  document.getElementById('root'),
)
