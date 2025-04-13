import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, LogIn, User, Shield, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useGetCurrentUserQuery,
  useLogoutMutation,
} from "@/services/authenticationApi";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const skipQuery = !token;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { data: user, refetch } = useGetCurrentUserQuery(undefined, {
    skip: skipQuery,
  });
  const [logout, ref] = useLogoutMutation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();

  const isAdmin = () => {
    return user?.role === "ADMIN";
  };

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      refetch();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const isMenuItemActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    {
      name: "Home",
      link: "/",
      hasDropdown: false,
      icon: <Home className="mr-1 h-4 w-4" />,
    },
    {
      name: "Products",
      link: "/products",
      hasDropdown: true,
      dropdownItems: [
        { name: "Orthopedic Devices", link: "/products/orthopedic-devices" },
        {
          name: "Surgical Instruments",
          link: "/products/surgical-instruments",
        },
        {
          name: "Diagnostic Equipment",
          link: "/products/diagnostic-equipment",
        },
        { name: "Medical Consumables", link: "/products/medical-consumables" },
      ],
    },
    {
      name: "Services",
      link: "/services",
      hasDropdown: true,
      dropdownItems: [
        { name: "Consulting", link: "/services/consulting" },
        { name: "Installation Support", link: "/services/installation" },
        { name: "After-Sales Service", link: "/services/after-sales" },
        { name: "Technical Support", link: "/services/technical-support" },
      ],
    },
    { name: "Blog", link: "/blog", hasDropdown: false },
    { name: "About Us", link: "/about", hasDropdown: false },
    { name: "Partners", link: "/partners", hasDropdown: false },
    { name: "Contact", link: "/contact", hasDropdown: false },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                src="/assets/images/81d0bbd7-1d17-4b9c-b3ed-62f66bc737be.png"
                alt="EldekaHealth Logo"
                className="h-14 w-auto"
              />
              <span className="text-2xl font-bold text-medical-600 ml-2">
                Eldeka<span className="text-gray-800">Health</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.hasDropdown ? (
                  <button
                    className={`text-gray-700 hover:text-medical-600 px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                      isMenuItemActive(item.link)
                        ? "text-medical-600 font-semibold border-b-2 border-medical-600"
                        : ""
                    }`}
                    onClick={() => toggleDropdown(item.name)}
                    onMouseEnter={() => setActiveDropdown(item.name)}
                  >
                    {item.icon && item.icon}
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                ) : (
                  <Link
                    to={item.link}
                    className={`text-gray-700 hover:text-medical-600 px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                      isMenuItemActive(item.link)
                        ? "text-medical-600 font-semibold border-b-2 border-medical-600"
                        : ""
                    }`}
                  >
                    {item.icon && item.icon}
                    {item.name}
                  </Link>
                )}

                {item.hasDropdown && (
                  <div
                    className="absolute left-0 mt-0 w-56 origin-top-left bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-150 ease-in-out z-10"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {/* Add invisible spacer to prevent dropdown from closing */}
                    <div className="h-2 bg-transparent"></div>
                    <div className="py-1">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.link}
                          className={`block px-4 py-2 text-sm text-gray-700 hover:bg-medical-50 hover:text-medical-600 ${
                            isMenuItemActive(dropdownItem.link)
                              ? "bg-medical-50 text-medical-600 font-medium"
                              : ""
                          }`}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {user ? (
              <div className="flex items-center space-x-2">
                {isAdmin() && (
                  <Button
                    asChild
                    variant="outline"
                    className={`border-medical-600 ${
                      isMenuItemActive("/admin")
                        ? "bg-medical-50 text-medical-700"
                        : "text-medical-600"
                    }`}
                  >
                    <Link to="/admin">
                      <Shield className="mr-2 h-4 w-4" />
                      Admin
                    </Link>
                  </Button>
                )}
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-gray-700"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                asChild
                className={`bg-medical-600 hover:bg-medical-700 ml-2 ${
                  isMenuItemActive("/login") ? "ring-2 ring-medical-300" : ""
                }`}
              >
                <Link to="/login">
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-medical-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`text-gray-700 hover:text-medical-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium w-full text-left flex justify-between items-center ${
                        isMenuItemActive(item.link)
                          ? "text-medical-600 bg-gray-50 font-medium"
                          : ""
                      }`}
                    >
                      <span className="flex items-center">
                        {item.icon && item.icon}
                        {item.name}
                      </span>
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="pl-4 space-y-1">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            to={dropdownItem.link}
                            className={`text-gray-600 hover:text-medical-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-sm ${
                              isMenuItemActive(dropdownItem.link)
                                ? "text-medical-600 bg-gray-50 font-medium"
                                : ""
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.link}
                    className={`text-gray-700 hover:text-medical-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                      isMenuItemActive(item.link)
                        ? "text-medical-600 bg-gray-50 font-medium"
                        : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon && item.icon}
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {user ? (
              <div className="space-y-1 pt-2">
                {isAdmin() && (
                  <Link
                    to="/admin"
                    className={`text-medical-600 hover:text-medical-700 hover:bg-gray-50 flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      isMenuItemActive("/admin") ? "bg-gray-50 font-medium" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-medical-600 hover:bg-gray-50 flex items-center w-full px-3 py-2 rounded-md text-base font-medium"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-4">
                <Button
                  asChild
                  className="w-full bg-medical-600 hover:bg-medical-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to="/login">
                    <User className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
