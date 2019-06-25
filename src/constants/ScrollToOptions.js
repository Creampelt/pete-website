import sizes from "./Sizes";

export default {
  offset: window.innerWidth > 1000 ? -(sizes.navBarHeight - 2) : -(window.innerHeight - 2)
}