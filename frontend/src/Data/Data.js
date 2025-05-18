// Data.js
import {
  FiHome,
  FiShoppingBag,
  FiUsers,
  FiMessageSquare,
  FiImage,
  FiPackage,
  FiSettings,
  FiUser,
  FiLogOut,
  FiAward,
} from "react-icons/fi";
import { AiOutlineDashboard } from "react-icons/ai";

export const sidebarNavigation = {
  primary: [
    { icon: <FiHome size={20} />, name: "Home", link: "/" },
    { icon: <FiShoppingBag size={20} />, name: "Products", link: "/products" },
    { icon: <FiUsers size={20} />, name: "Customers", link: "/customers" },
    {
      icon: <FiMessageSquare size={20} />,
      name: "Messages",
      link: "/messages",
    },
    { icon: <FiImage size={20} />, name: "Images", link: "/images" },
    { icon: <FiPackage size={20} />, name: "Inventory", link: "/inventory" },
  ],
  secondary: [
    {
      icon: <AiOutlineDashboard size={20} />,
      name: "Dashboard",
      link: "/dashboard",
    },
    { icon: <FiShoppingBag size={20} />, name: "Products", link: "/products" },
    { icon: <FiUsers size={20} />, name: "Customers", link: "/customers" },
    {
      icon: <FiMessageSquare size={20} />,
      name: "Messages",
      link: "/messages",
    },
    { icon: <FiImage size={20} />, name: "Images", link: "/images" },
    { icon: <FiPackage size={20} />, name: "Inventory", link: "/inventory" },
    { icon: <FiAward size={20} />, name: "Rankings", link: "/rankings" },
  ],
  footer: [
    { icon: <FiSettings size={20} />, name: "Settings", link: "/settings" },
    { icon: <FiUser size={20} />, name: "Profile", link: "/profile" },
    { icon: <FiLogOut size={20} />, name: "Logout", link: "/logout" },
  ],
};
