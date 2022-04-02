import {
    Button, message, Table
} from "antd";
import moment from "moment";
import { useTranslations } from 'next-intl';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiResturants } from "../../api";
import RouteProtect from "../../HOC/RouteProtect";
const inputStyle = { borderRadius: "5px", padding: "10px", width: "100%", border: "1px solid #ccc", outline: 0 };

const Requests = () => {
    const Router = useRouter();
    const t = useTranslations('home');
    const { locale, locales, defaultLocale, asPath } = useRouter();
    const [data, setData] = useState([]);
    const [loading, setLoadin] = useState(false);
    const getData = () => {
        setLoadin(true);
        ApiResturants((data, error) => {
            setLoadin(false);
            if (error) return message.error(t("somethingwentwrong"));
            setData(data);
        });
    };
    useEffect(() => {
        getData();
    }, []);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputsEdit({
            ...inputsEdit,
            [name]: value,
        });
        console.log(inputsEdit)
    };

    const columns = [
        {
            title: "NO.",
            dataIndex: "id",
            width: 50,

        },
        {
            title: "User name",
            dataIndex: "User name",
            render: (name) => <strong>{name}</strong>,
            width: 200,
        },

        {
            title: "Table number",
            dataIndex: "Table number",
            render: (numOfTable) => <strong>{numOfTable}</strong>,
        },
        {
            title: "Booking time",
            dataIndex: "openDate",
            render: (date) => moment(date).format("hh:mm A"),
        },
        {
            title: t('Actions'),
            dataIndex: "id",
            render: (id) => <div className="actions">
                <Button onClick={() => handleChange("accespt")} type="primary" info>accespt</Button>
                <Button onClick={() => handleChange("regect")} type="primary" danger>regect</Button>
            </div>,
        },

    ];

    return (
        <RouteProtect>
            <div className="mangeRest">

                <div className="container">
                    <div className="header">
                        <h1>{t("MyResturants")}</h1>

                    </div>
                    <Table
                        scroll={{ x: "700px" }}
                        pagination={{
                            defaultPageSize: 6,
                        }}

                        size="small"
                        rowKey={(record) => record.id}
                        loading={loading}
                        className={locale === "ar" ? "table rtl" : "table ltr"}
                        columns={columns}
                        dataSource={data}
                    />
                </div>
            </div>
        </RouteProtect>
    );
}
export default Requests;
export async function getStaticProps({ locale }) {
    return {
        props: {
            messages: (await import(`../../lang/${locale}.json`)).default
        }
    };
}
