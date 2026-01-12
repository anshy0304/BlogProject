import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import { useForm } from 'react-hook-form'
function Signup() {

    const [error,setError] = useState('')
    const {register,handleSubmit} = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const create = async(data) => {
        try {
            const userdata = await authService.createAccount(data)
            if(userdata){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData))
                    navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit(create)}>
            <Input 
            label = "Full Name: "
            placeholder="Enter Your Name"
            {...register('name',{
                required:true
            })}
            />
            <Input 
            label = 'Email: '
            type = "email"
            placeholder ="Enter your Email"
            {...register("email", {
                required:true
            })}
            />
            <Input 
            label = "Password"
            type = "password"
            placeholder="Enter Your Password"
            {...register("password", {
            required:true
            })}
            />
            <Button type="submit"
            className='w-full'
            >
                Create Account
            </Button>
        </form>

    </div>
  )
}

export default Signup