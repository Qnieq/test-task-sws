import ReactDOM from 'react-dom/client'
import './index.scss'
import Home from './components/pages/Home/Home'
import { Provider } from 'react-redux'
import { store } from './store/store'
import RowsProvider from './provider/RowsProvider'
import { Analytics } from "@vercel/analytics/react"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RowsProvider>
      <Home />
      <Analytics />
    </RowsProvider>
  </Provider>
)
