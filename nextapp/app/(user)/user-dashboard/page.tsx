"use client"

import { useAuth } from '@/app/hooks/useAuth'
import React from 'react'

const page = () => {
  const {registrationId, email} = useAuth();
  return (
    <div className='text-white'>User Page {registrationId} with email {email}</div>
  )
}

export default page