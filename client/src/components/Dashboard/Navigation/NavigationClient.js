import Nav from "react-bootstrap/Nav";
import logo from "../../../assets/imgs/logo-funiro.png";
import { NavLink } from "react-router-dom";
import { CiUser, CiShoppingCart, CiSearch } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/actionLogin";
import Dropdown from "react-bootstrap/Dropdown";
function NavigationClient() {
    const dispatch = useDispatch();
    const { user, isAuthenticated, id } = useSelector((state) => state.auth);
    return (
        <header className="d-flex align-items-center justify-content-between px-3 py-2 bg-light-subtle">
            <div className="d-flex p-3 align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <img className="nav__img" src={logo} />
                    <span className="ms-2  fs-4 ">Funiro</span>
                </div>
            </div>
            <Nav variant="pills" className="d-flex gap-4 align-items-center">
                <Nav.Item className="p-4">
                    <NavLink
                        to="/"
                        className="text-decoration-none text-black "
                    >
                        Home
                    </NavLink>
                </Nav.Item>
                <Nav.Item className="p-4">
                    <NavLink
                        to="/shop"
                        className="text-decoration-none text-black "
                    >
                        Shop
                    </NavLink>
                </Nav.Item>
                <Nav.Item className="p-4">
                    <NavLink
                        to="#"
                        className="text-decoration-none text-black "
                    >
                        About
                    </NavLink>
                </Nav.Item>
                <Nav.Item className="p-4">
                    <NavLink
                        to="#"
                        className="text-decoration-none text-black "
                    >
                        Contact
                    </NavLink>
                </Nav.Item>
            </Nav>
            {isAuthenticated ? (
                <div className="d-flex align-items-center gap-4">
                    <span>Xin chào: {user}</span>
                    <Dropdown>
                        <Dropdown.Toggle>
                            <CiUser className="fs-4" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">
                                Account
                            </Dropdown.Item>
                            <Dropdown.Item
                                href="#/action-2"
                                onClick={() => dispatch(logout())}
                            >
                                Logout
                            </Dropdown.Item>
                            <Dropdown.Item href={`/myorders`}>
                                My Order
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <CiSearch className="fs-4" />
                    <NavLink
                        to={`/cart/${id}/detail `}
                        style={{ cursor: "pointer" }}
                    >
                        <CiShoppingCart className="fs-4 text-black" />
                    </NavLink>
                </div>
            ) : (
                <button className="btn btn-primary">
                    <NavLink
                        className="text-decoration-none text-white fw-bold"
                        to="/login"
                    >
                        LOGIN
                    </NavLink>
                </button>
            )}
        </header>
    );
}

export default NavigationClient;
