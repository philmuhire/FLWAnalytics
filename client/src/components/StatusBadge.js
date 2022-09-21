import React from 'react'

const StatusBadge = ({ message, status }) => {
    return (
        status ?
            (<span className="bg-green-100 text-green-800 text-xs font-bold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">{message}</span>)
            :
            (<span class="bg-red-100 text-red-800 text-xs font-bold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">{message}</span>)
    )
}

export default StatusBadge