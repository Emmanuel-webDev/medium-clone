import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <>
            <header className="h-14 bg-slate-50">

                <div className="parent-div p-2 flex justify-between">
                    {/* top left logo */}
                    <div className="top-left-image ml-4 flex">
                        <div> <img className="w-14 h-8" src="/Images/top_logo.png" alt="logo" /> </div>
                    </div>
                </div>
            </header>

            <section className='grid grid-cols-1 lg:grid-cols-2 mt-5'>
                <div className="left-image w-[70%] ml-[15%] mt-[3rem]">
                    <img src='/Images/Error_404.png' />
                </div>

                <div>
                    <h3 className='text-center mt-3 text-lg'>PAGE NOT FOUND</h3>
                    <h1 className='text-gray-400 text-[5rem] text-center'>404</h1>

                    <p className='text-black text-[2rem] text-center'>Out of nothing,
                        <br />something.</p>

                    <p className='text-black text-center text-2xl p-3'>
                        You can find (just about) anything on Medium — apparently even a page that doesn’t exist. Maybe these stories about finding what you didn’t know you were looking for will take you somewhere new?
                    </p>

                    <Link to='/' className='underline mb-8 text-xl font-semibold '> <p className='text-center'>Home</p></Link>
                </div>
            </section>
        </>
    )
}

export default Error
