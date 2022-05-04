import Sidebar from '../../components/Sidebar'
import NavDash from "../../components/NavDash"
import Datatable from '../../components/Datatable'

const DashHome = () => {
  return (
    <div className='homeDash'>
        <Sidebar />
        <div className="homeContainer">
            <NavDash />
            <Datatable />
        </div>
    </div>
  )
}

export default DashHome