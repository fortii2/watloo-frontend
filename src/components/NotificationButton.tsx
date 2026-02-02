import { Bell } from 'lucide-react'

export default function NotificationButton() {
    const unreadCount = true

    return (
        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors relative">
            <Bell size={20} className="text-gray-600" />

            {unreadCount && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            )}
        </button>
    )
}