import { Link } from 'gatsby'
import React from 'react'
import Logo from 'src/components/ui/Logo'

function Navlinks() {
  return (
    <nav className="flex flex-row items-end ml-10">
      <Link className="m-1" to="/">
        <Logo />
      </Link>
    </nav>
  )
}

export default Navlinks
