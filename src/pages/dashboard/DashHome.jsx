import Sidebar from '../../components/Sidebar'
import NavDash from "../../components/NavDash"

const DashHome = () => {
  return (
    <div className='homeDash'>
        <Sidebar />
        <div className="homeContainer">
            <NavDash />
            
        </div>
    </div>
  )
}

export default DashHome