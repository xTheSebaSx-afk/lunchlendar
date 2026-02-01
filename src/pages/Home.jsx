import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import Footer from '../components/Footer'

const NavBar = ({ isAuthenticated, user }) => {
    return (
        <nav className="p-2 to-[#c1dff9] from-[#e8f2fc] bg-linear-to-l flex justify-around items-center relative top-3 [box-shadow:0px_1px_10px_2px_#abc6dd] text-[#1b3a49] text-[18px] text-center">
            <ul className='md:w-100 flex w-50 justify-around'>
                <li className='cursor-pointer hover:bg-[#a5b1bd62] rounded 2xl px-5 py-2 transition-all duration-300'>Item 1</li>
                <li className='cursor-pointer hover:bg-[#a5b1bd62] rounded 2xl px-5 py-2 transition-all duration-300'>Item 2</li>
                <li className='cursor-pointer hover:bg-[#a5b1bd62] rounded 2xl px-5 py-2 transition-all duration-300'>Item 3</li>
            </ul>
            {!isAuthenticated ? (
                <Link className="from-[#94c255] to-[#398a5b] from-30% bg-linear-150 px-5 py-2 rounded border-[#366f43] text-white transition-all duration-300 hover:scale-105 brightness-110" to="/login" target="_blank">Login</Link>
            ) : (<>
                <p>Bienvenido, <span className='text-shadow-[0_0px_2px_#000] underline'>{user.username}</span></p>
            </>)}
        </nav>
    )
}


const Header = ({ isAuthenticated, user }) => {
    return (
        <>
            <header className='header py-10 md:h-[570px] h-[500px]' >
                <NavBar isAuthenticated={isAuthenticated} user={user} />
                <div className='flex justify-center'>
                    <div className='text-center mt-[120px]'>
                        <h1 className='md:text-7xl sm:text-5xl text-3xl text-[#23282c]'>Lunch Calendar</h1>
                        <p className='text-center mt-2'>Una aplicación web para ayudarte a planear tus comidas</p>
                        <button className='mt-10'><Link to="/dishes" className='p-4 text-white text-[20px] w-[150px] from-[#48945c] to-[#88bf4a] bg-linear-60 rounded-2xl focus:outline-[#46FF17]'>Comenzar</Link></button>
                    </div>
                </div>
            </header >
        </>
    )
}

const ObjectiveItem = ({ icon, title, description }) => {
    return (
        <li className="flex flex-col items-center text-center gap-3 max-w-[220px] ">

            {/* Círculo del icono */}
            <div className="md:w-[150px] md:h-[150px] sm:size-[120px] size-[60px] rounded-full bg-white shadow-md flex items-center justify-center shrink-0" >
                <img src={icon} alt={title} className="md:w-[100px] md:h-[100px] sm:size-[100px] size-10 object-contain" />
            </div>

            {/* Texto */}
            <h3 className="font-semibold text-gray-800">
                {title}
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed">
                {description}
            </p>
        </li>
    )
}

const Objectives = () => {
    return (
        <ul className="flex justify-between items-start w-[80%] mx-auto gap-8 mb-[100px]">
            <ObjectiveItem icon="/calendar-icon.svg" title="Plan Your Meals" description="Easily schedule your lunches" />

            <ObjectiveItem icon="/heart.svg" title="Discover Recipes" description="Explore delicious recipe ideas" />

            <ObjectiveItem icon="/hat.svg" title="Balanced Diet" description="Maintain healthy & varied meals" />
        </ul>
    )
}

const Main = () => {
    return (
        <main className='body py-5' id='main'>
            <Objectives />
        </main >
    )
}

function Home() {
    const { user, isAuthenticated } = useUser()

    return (
        <div className=''>
            <img src="/icon.svg" alt="lunchcalendar" className='size-[100px] bg-linear-120 from-[#8cbd56] to-[#b8defc] rounded-full z-10 bottom-0 right-0 m-4 fixed' />
            <Header isAuthenticated={isAuthenticated} user={user} />
            <Main />
            <Footer />
        </div>
    )
}

export default Home