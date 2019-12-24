import Home from "../pages/home/Home";
import RegisterToVote from "../pages/home/RegisterToVote";
import SignUp from "../pages/home/SignUp";
import Highlights from "../pages/home/Highlights";
import MeetPete from "../pages/home/MeetPete";
import Collateral from "../pages/Collateral";
import { Manage } from "../pages/Manage";

export default [
  {
    href: "/",
    sections: [
      { title: "Home", id: "#home", Component: Home, ref: true },
      { title: "About Us", id: "#about-us", Component: SignUp, ref: true },
      { title: "Highlights", id: "#highlights", Component: Highlights, ref: false},
      { title: "Meet Pete", id: "#meet-pete", Component: MeetPete, ref: true },
      { title: "Register to Vote", id: "#register-to-vote", Component: RegisterToVote, ref: false}
    ]
  },
  {
    href: "/collateral",
    sections: [
      { title: "Collateral", id: "#collateral", Component: Collateral, ref: false }
    ]
  },
  {
    href: "/manage",
    sections: [
      { title: "Manage", id: "#manage", Component: Manage, ref: false }
    ]
  }
]
