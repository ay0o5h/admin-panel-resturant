
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import {
  Button, Collapse, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand
} from "reactstrap";
import user1 from "../assets/images/users/avatar.svg";

const Header = ({ showMobmenu }) => {

  const t = useTranslations('home');
  const { locale, locales, defaultLocale, asPath } = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

  return (


    <Navbar style={{ direction: `${locale === "ar" ? "rtl" : "ltr"}` }} color="primary" dark expand="md" >
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          <h1 className="logo-text">{t('logo')}</h1>
        </NavbarBrand>
        <Button color="primary" className="d-lg-none" onClick={showMobmenu}>
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button

          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>

        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="#F2F7F8">
            <div style={{ lineHeight: "0px" }}>
              <Image
                src={user1}
                alt="profile"
                className="rounded-circle"
                width="40"
                height="40"
              />
            </div>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>{t('info')}</DropdownItem>
            <DropdownItem>{t("MyAccount")}</DropdownItem>
            <DropdownItem>{t('EditProfile')}</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>{t('inbox')}</DropdownItem>
            <DropdownItem>{t('logout')}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar >

  );
};

export default Header;
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../lang/${locale}.json`)).default
    }
  };
}
