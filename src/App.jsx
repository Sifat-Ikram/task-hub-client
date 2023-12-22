import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/shared/navbar/Navbar'
import Footer from './components/shared/footer/Footer'

function App() {

  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default App
