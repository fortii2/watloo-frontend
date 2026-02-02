interface ViewSwitcherProps {
    view: 'today' | 'week';
    onViewChange: (view: 'today' | 'week') => void;
}

export default function ViewSwitcher({ view, onViewChange }: ViewSwitcherProps) {
    return (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50">
            <div className="bg-white rounded-full p-1 shadow-lg border border-gray-200 flex">
                <button
                    onClick={() => onViewChange('today')}
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${view === 'today'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Today
                </button>
                <button
                    onClick={() => onViewChange('week')}
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${view === 'week'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Week
                </button>
            </div>
        </div>
    )
}
