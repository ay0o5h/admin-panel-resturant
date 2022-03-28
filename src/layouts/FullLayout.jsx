import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import Header from "./Header";
import Sidebar from "./Sidebar";
const FullLayout = ({ children }) => {
  const [token, setToken] = useState("")
  const { locale, locales, defaultLocale, asPath } = useRouter();
  const [open, setOpen] = React.useState(false);
  const showMobilemenu = () => {
    setOpen(!open);
  };
  useEffect(() => {
    setToken(() => Cookies.get("token"));
  }, [])
  return (
    <main>
      {locale === 'en' ?
        <div className="pageWrapper d-md-block d-lg-flex">

          {/******** Sidebar **********/}
          {token &&
            <aside
              className={`sidebarArea shadow bg-white ${!open ? "" : "showSidebar"
                }`}
            >
              <Sidebar showMobilemenu={() => showMobilemenu()} />
            </aside>}
          {/********Content Area**********/}

          <div className="contentArea">
            {/********header**********/}
            <Header showMobmenu={() => showMobilemenu()} />

            {/********Middle Content**********/}
            <Container className="p-4 wrapper" fluid>
              <div>{children}</div>
            </Container>
          </div>
        </div> : <div className="pageWrapper d-md-block d-lg-flex">


          {/********Content Area**********/}

          <div className="contentArea">
            {/********header**********/}
            <Header showMobmenu={() => showMobilemenu()} />

            {/********Middle Content**********/}
            <Container className="p-4 wrapper" fluid>
              <div>{children}</div>
            </Container>
          </div>
          {/******** Sidebar **********/}
          {token && <aside
            className={`sidebarArea shadow bg-white ${!open ? "" : "showSidebar"
              }`}
          >
            <Sidebar showMobilemenu={() => showMobilemenu()} />
          </aside>}
        </div>
      }
    </main>
  );
};

export default FullLayout;
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../lang/${locale}.json`)).default
    }
  };
}

