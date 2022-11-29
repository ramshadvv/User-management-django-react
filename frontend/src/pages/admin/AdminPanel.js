import AdminNavbar from "../../components/Navbar/AdminNavbar";
import React, { useEffect, useState } from "react";
// import { Button } from "@material-tailwind/react"
import axios from "axios";
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'


const baseUrl = 'http://127.0.0.1:8000/'
function AdminPanel() {
  const [pending, setPending] = useState([])
    const navigate = useNavigate();

    useEffect( () => {
        axios.get('http://127.0.0.1:8000/all/',
        {
            headers:{
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            setPending(response.data)
            console.log(response.data)

        })
    },[])

    const handleBlock=(id)=>{
        Swal.fire({
            title: 'Confirm!',
            text: 'Do you want to Block ?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton:true
        }).then((result)=>{
            if(result.isConfirmed){
                try{
                    axios.get(baseUrl+'blockuser/'+ id+'/').then(res =>{
                        Swal.fire('Success','Successfully Completed')
                        navigate('/admin/panel')
                        window.location.reload()
                        console.log('successssssssssssssssssssssssss')
                    })
                } catch (err) {
                    Swal.fire('Error', 'Form has not been declined.')
                }
            }
        })
    }

    const handleUnBlock=(id)=>{
        Swal.fire({
            title: 'Confirm!',
            text: 'Do you want to Unblock ?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton:true
        }).then((result)=>{
            if(result.isConfirmed){
                try{
                    axios.get(baseUrl+'blockuser/'+ id+'/').then(res =>{
                        Swal.fire('Success','Successfully Completed')
                        navigate('/admin/panel')
                        window.location.reload()
                        console.log('successssssssssssssssssssssssss')
                    })
                } catch (err) {
                    Swal.fire('Error', 'Form has not been declined.')
                }
            }
        })
    }

    const handleDelete=(id)=>{
        Swal.fire({
            title: 'Confirm!',
            text: 'Do you want to Delete ?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton:true
        }).then((result)=>{
            if(result.isConfirmed){
                try{
                    axios.post(baseUrl+'deleteuser/'+ id+'/').then(res =>{
                        Swal.fire('Error','Deleted Successfully')
                        navigate('/admin/panel')
                        window.location.reload()
                        console.log('successssssssssssssssssssssssss')
                    })
                } catch (err) {
                    Swal.fire('Error', 'Form has not been declined.')
                }
            }
        })
    }


  return (
    <div className="flex">
      <div>
        <AdminNavbar />
      </div>
      <div style={{flexGrow:1}}>
        <div>
          <h1 className="text-center fs-5 fw-bold mt-5">USERS</h1>
        </div>
        <div className="flex flex-col mt-5">
            <div className="overflow-x-auto">
                <div className="p-1.5 w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                       <span>ID</span> 
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        Phone
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center text-xs font-bold text-right text-gray-500 uppercase "
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {pending.length>1 ? pending.map((data,index)=>{
                                return(

                                
                                <tr key={data.id}>
                                    <td className="py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                        {index+1}
                                    </td>
                                    <td className="py-4 text-sm text-gray-800 whitespace-nowrap">
                                        {data.username}
                                    </td>
                                    <td className="py-4 text-sm text-gray-800 whitespace-nowrap">
                                        {data.email}
                                    </td>
                                    <td className="py-4 text-sm text-gray-800 whitespace-nowrap">
                                        {data.phone}
                                    </td>
                                    <td className="py-4 text-sm font-medium text-center text-right whitespace-nowrap">
                                        {data.is_active === true ?(<button
                                            onClick={()=>handleBlock(data.id)}
                                            className="text-green-500 hover:text-green-700 me-2"
                                            
                                        >
                                            Block
                                        </button>)
                                        :
                                       ( <button
                                            onClick={()=>handleUnBlock(data.id)}
                                            className="text-green-500 hover:text-green-700 me-2"
                                            
                                        >
                                            Unblock
                                        </button>)
                                        }
                                        <button
                                            onClick={()=>handleDelete(data.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                )
                              }):<p className="text-center">No users</p>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
