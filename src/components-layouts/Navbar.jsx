import { getSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { Image } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Offcanvas from 'react-bootstrap/Offcanvas'

function SiteNavbar() {
  const { pathname } = useRouter()
  const [currentUser, setCurrentUser] = useState('')

  const checkUser = async () => {
    const session = await getSession()
    if (session) {
      setCurrentUser(session?.user?.id)
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  return (
    currentUser && pathname !== '/' && pathname !== '/signin' ? (
      <>
        {['md'].map((expand) => (
          <Navbar key={expand} expand={expand} id="navbar" className="mb-5 py-3">
            <Container fluid>
              <Link href="/home" passHref>
                <a><Image
                  src="/images/world.png"
                  alt="world-image"
                  className="my-2 mx-4"
                  style={{ height: '45px', width: '45px' }}
                />
                </a>
              </Link>
              <Navbar.Brand href="/home" className="text-white fs-4">At Your Fingertips</Navbar.Brand>
              <Navbar.Toggle
                // className="bg-secondary border-secondary"
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton className="btn-close-white">
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Menu
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="text-white">
                  <Nav className="justify-content-end flex-grow-1 pe-3 gap-2">
                    <Nav.Link href="/home">Map</Nav.Link>
                    <Nav.Link href="/countries">Countries</Nav.Link>
                    <Nav.Link href="/users">Users</Nav.Link>
                    <Nav.Link href="/my/messages">
                      Messages
                      {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope-heart" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l3.235 1.94a2.76 2.76 0 0 0-.233 1.027L1 5.384v5.721l3.453-2.124c.146.277.329.556.55.835l-3.97 2.443A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741l-3.968-2.442c.22-.28.403-.56.55-.836L15 11.105V5.383l-3.002 1.801a2.76 2.76 0 0 0-.233-1.026L15 4.217V4a1 1 0 0 0-1-1H2Zm6 2.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                    </svg> */}
                    </Nav.Link>
                    {/* <Nav.Link href="#action4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                    </svg>
                  </Nav.Link> */}
                    <NavDropdown
                      title={(
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg>
                    )}
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                      align="end"
                      variant="dark"
                      menuVariant="dark"
                    >
                      <NavDropdown.Item href="/my/profile">Profile</NavDropdown.Item>
                      {/* <NavDropdown.Item href="/my/settings">
                      Account Settings
                    </NavDropdown.Item> */}
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        onClick={() => {
                          signOut({
                            callbackUrl: '/'
                          })
                          // push('/')
                        }}
                      >
                        Log Out
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>

                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </>
    ) : (
      null
    )
  )
}

export default SiteNavbar
