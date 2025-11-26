import React from 'react'
import { Link } from 'react-router-dom'

const NavItem = ({ navTo, label, newPage = false }) => {
    return (
        <>
            <li className='basis-1xs text-center grow hover:grow-2 hover:bg-sky-300 transition-all duration-300 last:bg-emerald-500 last:hover:bg-emerald-200'>
                <Link className='p-2 block' target={newPage ? '_blank' : '_self'} to={navTo}>{label}</Link>
            </li>
        </>
    )
}

function Home() {
    return (
        <>
            <header className='h-110 bg-emerald-300 flex items-center justify-center'>
                <nav className='self-start absolute bg-sky-500'>
                    <ul className="flex w-screen flex-wrap basis-2">
                        <NavItem label="Item 1" />
                        <NavItem label="Item 2" />
                        <NavItem label="Item 3" />
                        <NavItem label="Login" navTo="/login" newPage/>
                    </ul>
                </nav>
                <div>
                    <h1 className="md:text-6xl text-3xl text-left ">Lunch Calendar</h1>
                    <p className='underline text-right'>A web app to help you plan your lunch</p>
                </div>
            </header>
            <main>

            </main>
            <footer>

            </footer>
        </>
    )
}

export default Home