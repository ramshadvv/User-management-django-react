import {useEffect,useState} from 'react'
import NavBar from '../components/Navbar/NavBar'
import { Navigate } from 'react-router-dom'
import CheckLogin from '../utils/checkLogin';
import axios from 'axios'


const HomePage = () => {
    const [user, setUser] = useState({})
    const token = JSON.parse(localStorage.getItem('authToken'))
    const fetchUserDetails=async()=>{
      console.log(token)
      const result = await axios.get(`http://127.0.0.1:8000/profile/`, { headers: {"Authorization" : `Bearer ${token.access  }`} })
      setUser(result.data)
  
    }
    useEffect(() => {
    fetchUserDetails()
    }, [])

  if(CheckLogin() === false){
    return <Navigate to="/" />
  }

  return (
    <div>
      <NavBar/>
      <div><h1 className='fw-bold' style={{fontSize:'4rem',marginTop:'20rem'}}>Hi {user.username} !!</h1></div>

    </div>
  )
}

export default HomePage