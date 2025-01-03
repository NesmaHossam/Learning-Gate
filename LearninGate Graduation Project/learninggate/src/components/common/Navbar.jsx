import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineMessage,
} from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { RiDoorOpenLine } from "react-icons/ri";
import { BsChevronDown } from "react-icons/bs";
import { TbMessageChatbot } from "react-icons/tb";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropDown";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch categories.", error);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  const matchRoute = (route) => {
    return location.pathname === route;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Logic to handle search submission (e.g., redirect to search results page)
    navigate(`/search/${searchTerm}`);
  };

  const renderLoggedOutLinks = () => (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-y-4 md:gap-y-0 md:gap-x-4">
      <Link to="/login" onClick={closeMobileMenu}>
        <button className="rounded-[20px] px-7 py-1 bg-[#ffffff] text-[#080474] border-[2px] border-[#080474] box-border transition duration-300 hover:bg-[#080474] hover:text-[#ffffff]">
          Login
        </button>
      </Link>
      <Link to="/signup" onClick={closeMobileMenu}>
        <button className="rounded-[20px] px-7 py-1 bg-[#080474] text-[#ffffff] border-[2px] border-[#080474] box-border transition duration-300 ease-in-out hover:bg-[#080474] hover:text-[#ffffff] hover:shadow-md">
          Sign up
        </button>
      </Link>
    </div>
  );

  const renderUserIcons = () => (
    <>
      {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
        <>
          <Link
            to="/dashboard/cart"
            className="relative"
            onClick={closeMobileMenu}
          >
            <AiOutlineShoppingCart className="text-2xl text-[#080474]" />
            {totalItems > 0 && (
              <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-[#c2daff] text-center text-xs font-bold text-[#080474]">
                {totalItems}
              </span>
            )}
          </Link>
          <Link
            to="http://localhost:3000/dashboard/bookmarked-courses"
            onClick={closeMobileMenu}
          >
            <FaRegHeart className="text-2xl text-[#080474]" />
          </Link>
          <Link
            to="http://localhost:5050/"
            target="_blank"
            onClick={closeMobileMenu}
          >
            <RiDoorOpenLine className="text-2xl text-[#080474]" />
          </Link>
          <a
            href="http://localhost:8501"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
          >
            <TbMessageChatbot className="text-2xl text-[#080474]" />
          </a>
          <Link to="/dashboard/my-profile" onClick={closeMobileMenu}>
            <AiOutlineUser className="text-2xl text-[#080474]" />
          </Link>
        </>
      )}
      {user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
        <>
          <Link
            to="http://localhost:5050/"
            target="_blank"
            onClick={closeMobileMenu}
          >
            <RiDoorOpenLine className="text-2xl text-[#080474]" />
          </Link>
          <a
            href="http://localhost:8501"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
          >
            <TbMessageChatbot className="text-2xl text-[#080474]" />
          </a>
          <Link to="/dashboard/my-profile" onClick={closeMobileMenu}>
            <AiOutlineUser className="text-2xl text-[#080474]" />
          </Link>
        </>
      )}
    </>
  );

  return (
    <div className="navbarContainer bg-white border-b-[1px] border-b-[#b8c1c6]">
      <div className="flex items-center justify-center bg-[#ffffff] border-b-[1px] border-b-[#b8c1c6]">
        <div className="flex flex-col md:flex-row w-full max-w-maxContent items-center justify-between px-4 py-2">
          <div className="flex items-center justify-between w-full md:w-auto px-1 py-1">
            <Link to="/" onClick={closeMobileMenu}>
              <img src={logo} alt="Logo" loading="lazy" />
            </Link>
            <button
              className="block md:hidden text-2xl text-[#080474] focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? "✖" : <AiOutlineMenu />}
            </button>
          </div>
          <nav
            className={`${
              mobileMenuOpen ? "block" : "hidden"
            } md:block mt-4 md:mt-0`}
          >
            <ul className="flex flex-col md:flex-row w-full max-w-maxContent items-center justify-between px-4 py-2 gap-y-4 md:gap-y-0 md:gap-x-4">
              {NavbarLinks.map(({ title, path }, index) => (
                <li key={index} className="mb-2 md:mb-0">
                  {title === "Categories" ? (
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/categories/:categoriesName")
                          ? "text-[#b6a168]"
                          : "text-[#080474]"
                      }`}
                    >
                      <p>{title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-[#c2daff] p-4 text-[#080474] opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-[#c2daff]"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks && subLinks.length ? (
                          <div className="max-h-[250px] overflow-y-auto custom-scrollbar">
                            {subLinks
                              .filter((subLink) => subLink?.courses?.length > 0)
                              .map((subLink, i) => (
                                <Link
                                  to={`/categories/${
                                    subLink.name
                                      ? subLink.name
                                          .split(" ")
                                          .join("-")
                                          .toLowerCase()
                                      : ""
                                  }`}
                                  className="block rounded-lg bg-transparent py-4 pl-4 hover:bg-[#b8c1c6]"
                                  key={i}
                                  onClick={closeMobileMenu}
                                >
                                  <p>{subLink.name || "Unnamed Category"}</p>
                                </Link>
                              ))}
                          </div>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={path} onClick={closeMobileMenu}>
                      <p
                        className={`${
                          matchRoute(path) ? "text-[#b6a168]" : "text-[#080474]"
                        } hover:text-[#b6a168]`}
                      >
                        {title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}
              <li className="mb-2 md:mb-0">
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center"
                >
                  <div className="relative rounded-full overflow-hidden border-[1px] border-[#b8c1c6]">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      placeholder="Search..."
                      className="px-4 py-2 w-[300px] md:w-[400px] focus:outline-none focus:border-[#080474]"
                    />
                    <button
                      type="submit"
                      className="absolute right-0 top-0 bottom-0 px-3"
                    >
                      <AiOutlineSearch className="text-[#080474] cursor-pointer hover:text-[#b6a168]" />
                    </button>
                  </div>
                </form>
              </li>
            </ul>
          </nav>
          <div
            className={`${
              mobileMenuOpen ? "block" : "hidden"
            } md:block mt-2 md:mt-0`}
          >
            <div className="flex flex-col items-center md:flex-row md:items-center justify-center md:justify-start gap-y-4 md:gap-y-0 gap-x-4">
              {token ? renderUserIcons() : renderLoggedOutLinks()}
              {token && <ProfileDropdown />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
