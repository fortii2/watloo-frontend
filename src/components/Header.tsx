import NotificationButton from "./NotificationButton"

export default function Header() {
    const today: string = "Dec 31, Monday"

    return (
        <div className="px-6 py-4 flex justify-between items-center bg-white z-20">
            <div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">Courses</div>
                <div className="text-xl font-bold text-gray-900">{today}</div>
            </div>
            <NotificationButton />
        </div >
    )
}