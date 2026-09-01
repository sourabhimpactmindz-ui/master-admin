import {createBrowserRouter, Outlet } from "react-router-dom"
import PublicRouter from "../protectedRouter/publicRouter"
import Authlogin from "../pages/authlogin/authlogin"
import PrivateRouter from "../protectedRouter/privateRouter";
import AdminLayout from "@/components/layout/adminlayout/AdminLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import CreateClient from "@/pages/createclient/createclient";
import Projects from "@/pages/createproject/createproject";
import Features from "@/pages/createfeature/createfeature";
import ProjectFeatures from "@/pages/createprojectfeature/projectfeature";



const router = createBrowserRouter([
    {
    
        element : <PublicRouter />,
        children : [
            {
                path : "/",
                element : <Authlogin />

            }
        ]
        
      
    },

    {
        element :( <PrivateRouter><Outlet /></PrivateRouter>),
    
    children : [
        {
            element : <AdminLayout />,

            children : [
                {path : "/admin/dashboard" , element : <Dashboard />},
                {path : "/admin/client" , element : <CreateClient />},
                {path : "/admin/projects" , element : <Projects />},
                {path : "/admin/features" , element : <Features />},
                {path : "/admin/project-feature" , element : <ProjectFeatures />}
            ]
        }

    ]

    }

    
])


export default router;