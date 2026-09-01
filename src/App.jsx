import { useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/routes'
import { Toaster } from "@/components/ui/sonner";

function App() {


  return (
    <>
     <Toaster
                position="top-right"
                // richColors
                closeButton
            />
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
