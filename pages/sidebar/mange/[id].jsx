import { Button, message, Popover, Spin, Tag } from 'antd';
import Cookies from "js-cookie";
import moment from "moment";
import { useTranslations } from 'next-intl';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiFloormap, makeItDone, updateResturantState } from '../../../api';
import RouteProtect from "../../../HOC/RouteProtect";
const Mange = () => {
    const { locale, locales, defaultLocale, asPath } = useRouter();
    const t = useTranslations('home');
    const Router = useRouter();
    const { id } = Router.query;
    const [token, setToken] = useState("");
    const [restaurant, setRestaurant] = useState("");
    const [isopen, setIsOpen] = useState(false);
    const [tables, setTables] = useState("")

    useEffect(() => {

        const token = Cookies.get("Admintoken");
        setToken(token);
        console.log(token);
        ApiFloormap(id, (data1, error) => {
            if (error) return message.error(error);
            let data = data1.rest

            setRestaurant(data);
            console.log(data);
            let tables = data.table;
            setTables(tables)


        });
        updateResturantState(id, (data, error) => {
            console.log(id)
            if (error) return message.error(t("somethingWrong"));
            let isopen = data.rest.isOpen
            setIsOpen(isopen);
            console.log(data);
        })
    }, [Router]);
    const changeState = (idTble) => {
        makeItDone()
        console.log(idTble)
    }
    const handleDelete = (idTble) => {
        console.log(idTble)
    }
    return (
        <RouteProtect>
            {!!restaurant ?
                <div className="mange">
                    <Tag color={isopen ? "#87d068" : "#f50"}>{isopen ? "open now" : "close now"}</Tag>
                    <br />
                    <span>{moment(restaurant.openDate).format("hh:mm A") - moment(restaurant.closeDate).format("hh:mm A")}</span>
                    <h3>{restaurant.name}</h3>
                    <svg version="1.1" baseProfile="full" width="500" height="500">
                        {!!restaurant ? (
                            <image
                                className="imgMap"
                                href={restaurant.floorMap}
                                x="0"
                                y="0"
                                height="500px"
                                width="500px"
                            />
                        ) : null}

                        {!!tables ? (
                            !tables?.length > 0 ? (
                                <Empty />
                            ) : (
                                tables?.map((t) => (
                                    <Popover
                                        content={<div>
                                            <Button type="primary" onClick={() => changeState(t.id)} info>Change State</Button>
                                            <b />
                                            <Button type="primary" onClick={() => handleDelete(t.id)} danger>Delete table</Button>
                                        </div>}
                                        title={"table number " + t.tableNum}
                                    >
                                        <circle
                                            onClick={() => handleEdit(t.id)}
                                            className="circle"
                                            key={t.id}
                                            cx={t.x}
                                            cy={t.y}
                                            r="15"
                                            fill={t.isBooked ? "red" : "#882121"}
                                        ></circle>
                                    </Popover>
                                ))
                            )
                        ) : (
                            <Spin className="spin" size="large" />
                        )}
                    </svg>
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