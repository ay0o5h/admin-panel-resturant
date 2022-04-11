import { useTranslations } from 'next-intl';
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Nav, NavItem } from "reactstrap";
import RouteProtect from "../../HOC/RouteProtect";

const Sidebar = ({ showMobilemenu }) => {
  let curl = useRouter();
  const location = curl.pathname;
  const t = useTranslations('home');
  const { locale, locales, defaultLocale, asPath } = useRouter();
  const navigation = [
    {
      title: t('Dashboard'),
      href: "/",
      icon: "bi bi-speedometer2",
    },
    {
      title: t("AddResturant"),
      href: "/sidebar/add-resturant",
      icon: "bi bi-plus",
    },
    {
      title: t("Requests"),
      href: "/sidebar/requests",
      icon: "bi bi-bell",
    },
    {
      title: t("MangeResturants"),
      href: "/sidebar/mange-resturants",
      icon: "bi bi-hdd-stack",
    },
  ];
  return (
    <RouteProtect>
      <div style={{ direction: `${locale === "ar" ? "rtl" : "ltr"}` }} className="p-3">
        <div className="d-flex align-items-center">
          <Link href="/">
            <h3 className="logo-text">{t("logo")}</h3>
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
                    <i className={navi.icon} style={{ margin: "auto 10px" }}></i>
                    <span className="ms-3 d-inline-block">{navi.title}</span>
                    {/* {navi.title === t("Requests") && <Badge size="default" style={{ margin: "auto 10px", backgroundColor: "#f50" }} count={0}>{0}</Badge>} */}
                  </a>
                </Link>
              </NavItem>
            ))}
          </Nav>
        </div>
      </div>
    </RouteProtect>
  );
};

export default Sidebar;
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../lang/${locale}.json`)).default
    }
  };
}