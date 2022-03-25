import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Nav, NavItem } from "reactstrap";


const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Add Resturant",
    href: "/ui/alerts",
    icon: "bi bi-bell",
  },
    {
    title: "Requests",
    href: "/ui/badges",
    icon: "bi bi-patch-check",
  },
  {
    title: "Mange Resturants",
    href: "/ui/badges",
    icon: "bi bi-patch-check",
  },
  {
    title: "My Resturants",
    href: "/ui/buttons",
    icon: "bi bi-hdd-stack",
  },

];

const Sidebar = ({ showMobilemenu }) => {
  let curl = useRouter();
  const location = curl.pathname;

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Link href="/">   
        <h3 className="logo-text">Admin Dashboard</h3>
         </Link>
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={showMobilemenu}
        ></Button>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link href={navi.href}>
                <a
                  className={
                    location === navi.href
                      ? "text-primary nav-link py-3"
                      : "nav-link text-secondary py-3"
                  }
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </a>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
