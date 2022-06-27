import React from 'react'
import { useEffect } from 'react';
import { FormRow, Alert } from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useAppContext } from '../../context/appContext';
import FormRowSelect from '../../components/FormRowSelect';
import { useNavigate } from 'react-router-dom'
const Lobby = () => {
  const {roomId, handleChange , displayAlert,showAlert,isStreaming} = useAppContext();
  const navigate = useNavigate();
  // useEffect(()=>{
    
  // },[isStreaming])
  
 const handleSubmit = (e) => {
    e.preventDefault();
    if(!roomId){
        displayAlert();
        return;
    }

     const redirecLink = `/stream/${roomId}`
     navigate(redirecLink)
    
 }


  const handleRoom = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    handleChange({name,value})
  }


  return (
    <Wrapper>
      <div style = {{columnGap : 20}}>
        <h2>👋 Join or Create a chat room</h2>
        <form className='form'>
            {showAlert && <Alert /> }
            <div className='form-center'>
                <FormRow 
                    type='text'
                    name = 'roomId'
                    value = {roomId}
                    handleChange = {handleRoom}
                /> 
            </div>

            <div className='btn-container'>
               <button
                  className='btn btn-block submit-btn'
                  type='submit'
                  onClick={handleSubmit}
               >
               Join the room
               </button>

            </div>
        </form>
        </div>
    </Wrapper>
  )
}

export default Lobby