export default function Logout() {
    return(
        <main>
            <p>Are you sure you want to log out?</p>
            <div className="flex flex-row">
                <button className='bg-green-600 hover:bg-green-500 p-3 rounded-sm text-lg text-slate-50'>Yes</button>
                <button className='bg-red-600 hover:bg-red-500 p-3 rounded-sm text-lg text-slate-50'>No</button>
            </div>
        </main>
    )
}