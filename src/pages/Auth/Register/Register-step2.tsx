import { useRegisterUsersStore } from '@/store/RegisterUser';
import React from 'react'

const RegisterStep2 = () =>{
  const email = useRegisterUsersStore(state => state.email)
  console.log(email);
  
  return (
    <div>Register Step 2</div>
  )
}

export default RegisterStep2