import { ACCOUNT_TYPE } from "../utils/constant";
import { VscDashboard, VscVm, VscAdd, VscMortarBoard, VscHistory, VscBook, VscBookmark} from 'react-icons/vsc';
import { BsPerson } from "react-icons/bs";

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/profile",
    icon: BsPerson,
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: VscDashboard,
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: VscVm,
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-course",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: VscAdd,
  },
  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: VscBook,
  },
  {
    id: 6,
    name: "WishList",
    path: "/dashboard/wishlist",
    type: ACCOUNT_TYPE.STUDENT,
    icon: VscBookmark ,
  },
  {
    id: 7,
    name: "Your Cart",
    path: "/dashboard/cart",
    type: ACCOUNT_TYPE.STUDENT,
    icon: VscHistory,
  },
  {
    id: 8,
    name: "Courses",
    path: "/search",
    icon: VscMortarBoard,
  },
];
