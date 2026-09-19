import { Outlet } from 'react-router'
import './App.css'
import RolarParaTopo from './components/RolarParaTopo'
import FundoAnimado from './components/FundoAnimado'
import Cabecalho from './components/Cabecalho'
import Rodape from './components/Rodape'

const App = () => {

  return (
    <div className="app">
      <RolarParaTopo />
      <FundoAnimado />

      <Cabecalho />

      <main className="content">
        <Outlet />
      </main>

      <Rodape />
    </div>
  )
}

export default App
