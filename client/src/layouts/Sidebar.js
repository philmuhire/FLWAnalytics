import React, { useState } from "react";
import SidebarLinks from "./SidebarLinks";
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { useEffect } from "react";



const Sidebar = ({currentTab}) => {

    const [currentLinks, setCurrentLinks] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = JSON.parse(localStorage.getItem(process.env.REACT_APP_AUTH))

    useEffect(() => {
        if (auth === null) {
            navigate('/');
        } 
    }, [])
    
    return (
        <aside className="h-screen overflow-y-auto w-60 bg-gradient-to-b from-dark-green to-light-green ">
            <div className="flex items-center px-8 text-blue-600 bg-white h-16">
                <a href="/admin/dashboard" className="font-bold">FLWAnalytics</a>
            </div>
            <SidebarLinks currentTab={currentTab}/>
        </aside>
    );
};

export default Sidebar;
