import React, { useState } from 'react'

const SidebarLink = ({name, url, svg}) => {
    const [active, setActive] = useState('organization')
    return (
        <a className={`font-medium transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-200 cursor-pointer flex justify-start items-center pl-5 py-2.5 rounded ${name === 'Organization'? 'bg-purple-900 my-2':''}`} href={url}>
            {svg}
            <span className='text-left text-sm text-gray-200 pl-5'>{name}</span>
        </a>
    )
}

export default SidebarLink