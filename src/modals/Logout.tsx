export default function Logout() {
    return(
        <main className="flex flex-col justify-center gap-5">
            <p>Are you sure you want to log out?</p>
            <div className="flex flex-row justify-center gap-5">
                <button className='flex-grow bg-green-500 hover:bg-green-400 p-3 rounded-sm text-lg text-slate-50'>Yes</button>
                <button className='flex-grow bg-red-500 hover:bg-red-400 p-3 rounded-sm text-lg text-slate-50'>No</button>
            </div>
        </main>
    )
}