import React from 'react'
import useStateContext from '../hooks/useStateContext'
import { Outbound } from '@mui/icons-material'
import { Navigate, Outlet } from 'react-router-dom'

export default function Authentication() {
  const { context } = useStateContext()
  return (
    context.participantId === 0
      ? <Navigate to="/" />
      : <Outlet />
  )
}
