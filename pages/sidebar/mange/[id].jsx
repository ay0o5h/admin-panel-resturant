import { Spin, Tag } from 'antd';
import Cookies from "js-cookie";
import { useTranslations } from 'next-intl';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiFloormap, updateResturantState } from '../../../api';
import RouteProtect from "../../../HOC/RouteProtect";
const Mange = () => {
    const { locale, locales, defaultLocale, asPath } = useRouter();
    const t = useTranslations('home');
    const Router = useRouter();
    const { id } = Router.query;
    const [token, setToken] = useState("");
    const [restaurant, setRestaurant] = useState();
    const [isopen, setIsOpen] = useState(false);
    useEffect(() => {

        const token = Cookies.get("token");
        setToken(token);
        console.log(token);
        ApiFloormap(id, (data, error) => {
            console.log(data);
            if (error) return message.error(error);
            setRestaurant(data);

        });
        updateResturantState(id, (data, error) => {
            console.log(id)
            if (error) return message.error(t("somethingWrong"));
            let isopen = data.rest.isOpen
            setIsOpen(isopen);
            console.log(data);
        })
    }, [Router]);

    return (
        <RouteProtect>
            {!!restaurant ?
                <div className="mange">
                    <Tag color={isopen ? "#87d068" : "#f50"}>{isopen ? "open now" : "close now"}</Tag>
                </div>
                : <center style={{ margin: "10px auto" }}><Spin /> </center>}
        </RouteProtect>
    );
}
export default Mange;
export async function getStaticProps({ locale }) {
    let data = null;
    let s;
    if (typeof window !== "undefined") {
        const currentURL = window.location.pathname;
        s = currentURL.substring(currentURL.length - 1);
        console.log(s)

    }
    try {
        data = await getData(s);
    } catch (err) { console.log(err) };




    return {
        props: {
            messages: (await import(`../../../lang/${locale}.json`)).default,
            id: String(s),
            data,
        }
    };
}


export async function getStaticPaths() {

    let s;
    if (typeof window !== "undefined") {
        const currentURL = window.location.pathname;
        s = currentURL.substring(currentURL.length - 1);
        console.log(s)

    }
    return {
        paths: [
            { params: { id: String(s) } }
        ],
        fallback: true // false or 'blocking'
    };
}