"use client"
import { useAuth } from '@/app/hooks/useAuth';
import api from '@/app/lib/api';
import { logout } from '@/app/redux/slice/authSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const Page = () => {
  const { registrationId, email = null } = useAuth();
  const splitEmail = email.split('@')[0].charAt(0).toUpperCase() || '';

  const s: string = "Muhammad Hammad Irfan";
  const initials = s.split(' ').filter(x => x.trim()).map(x => x[0]);
  const dispatch = useDispatch();
  const router = useRouter();

  const { token } = useAuth()

  const handleLogout = async () => {
    try {
      const res = await api.post("/api/auth/logout");

      console.log(res.data);
      router.replace("/");
      dispatch(logout());

    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div>Admin with {registrationId} with email {email} </div>
      <div>{splitEmail.toUpperCase()}</div>
      <div>{initials}</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Page