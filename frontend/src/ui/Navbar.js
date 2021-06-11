import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth0 } from '@auth0/auth0-react'
const Navbar = () => {
    const [headerOpen, setHeaderOpen] = useState(false)
    const [mobileView, setMobileView] = useState(false)

    // Auth0
    const { isAuthenticated, logout } = useAuth0()
    // router
    const router = useRouter()
    useEffect(() => {
        const mobileViewHandler = () => {
            const width = window.innerWidth
            if (width < 1024) {
                setMobileView(true)
            } else {
                setHeaderOpen(false)
                setMobileView(false)
            }
        }
        window.addEventListener('resize', mobileViewHandler)
        return function removeEventListeners() {
            window.removeEventListener('resize', mobileViewHandler)
        }
    }, [mobileView])

    const navItemBaseClass =
        'transition duration-500 ease-in-out mr-3 flex px-8 py-3 items-center text-sm font-bold text-text-500 hover:bg-highlight-500'
    const navItemActiveClass = ' bg-highlight-500 text-primary-500'
    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-transparent mb-3 text-coolGray-800">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between mt-5">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <Link href="/" exact>
                            <a className="px-8 py-3 text-sm font-bold text-primary leading-relaxed inline-block mr-4 whitespace-no-wrap">
                                ShortCasts
                            </a>
                        </Link>
                        <button
                            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setHeaderOpen(!headerOpen)}
                        >
                            {headerOpen ? (
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                    <div
                        className={
                            'lg:flex flex-grow items-center' +
                            (headerOpen ? ' flex' : ' hidden')
                        }
                    >
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto lg:flex ">
                            <li className="nav-item">
                                <Link href="/dashboard">
                                    <a
                                        className={
                                            navItemBaseClass +
                                            (router.asPath == '/dashboard'
                                                ? navItemActiveClass
                                                : '')
                                        }
                                    >
                                        Dashboard
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/podcasts">
                                    <a
                                        className={
                                            navItemBaseClass +
                                            (router.asPath == '/podcasts'
                                                ? navItemActiveClass
                                                : '')
                                        }
                                    >
                                        Podcasts
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/explore">
                                    <a
                                        className={
                                            navItemBaseClass +
                                            (router.asPath == '/explore'
                                                ? navItemActiveClass
                                                : '')
                                        }
                                    >
                                        Explore
                                    </a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/account">
                                    <a
                                        className={
                                            navItemBaseClass +
                                            (router.asPath == '/account'
                                                ? navItemActiveClass
                                                : '')
                                        }
                                    >
                                        Account
                                    </a>
                                </Link>
                            </li>
                            {isAuthenticated ? (
                                <li
                                    onClick={() => logout()}
                                    className="nav-item"
                                >
                                    <button className="mr-3 flex px-8 py-3 items-center text-sm font-bold text-text-500 hover:text-text-700 focus:outline-none">
                                        Logout
                                    </button>
                                </li>
                            ) : null}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
