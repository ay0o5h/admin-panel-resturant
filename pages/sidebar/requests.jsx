import {
    Button, message, Table
} from "antd";
import moment from "moment";
import { useTranslations } from 'next-intl';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiBookingList, changeState } from "../../api";
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
        ApiBookingList((datas, error) => {
            console.log(datas)
            setLoadin(false);

            if (error) return message.error(t("somethingwentwrong"));
            let data = [];
            datas.map((c) => (
                c.table.map(t => t.book.length > 0 &&
                    t.book.map(b => b.status === null &&
                        data.push({
                            key: c.id,
                            name: c.name,
                            tableNum: t.tableNum,
                            action: b.id,
                            numOfPeople: t.book[0].numOfPeople,
                            resTime: t.book[0].resTime,
                            firstName: b.user.firstName,
                            lastName: b.user.lastName,
                        })
                    ))
            ))
            console.log(data)
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
            dataIndex: "key",
            width: 50,

        },
        {
            title: t('User-name'),
            dataIndex: "firstName",
            render: (name) => <strong>{name}</strong>,
            width: 200,
        },
        {
            title: t('restu-name'),
            dataIndex: "name",
            render: (name) => <strong>{name}</strong>,
            width: 200,
        },

        {
            title: t("Tablenumber"),
            dataIndex: "tableNum",
            render: (numOfTable) => <strong>{numOfTable}</strong>,
        },
        {
            title: t("NumberofPeople"),
            dataIndex: "numOfPeople",
            render: (numOfTable) => <strong>{numOfTable}</strong>,
        },
        {
            title: t("Booking-time"),
            dataIndex: "resTime",
            render: (date) => moment(date).format("hh:mm A"),
        },
        {
            title: t('Actions'),
            dataIndex: "action",
            render: (id) => <div className="actions">
                <Button onClick={() => handleChange("accept", id)} type="primary" info>{t("accept")}</Button>
                <Button onClick={() => handleChange("reject", id)} type="primary" danger>{t("reject")}</Button>
            </div>,
        },

    ];
    const handleChange = (status, id) => {
        const info = { status: status, id: id };
        changeState(info, (data, error) => {
            if (error) return message.error(t("somethingwentwrong"));
            message.success(t("updatesuccessfuly"));
            getData()
        })
    }
    return (
        <RouteProtect>
            <div className="mangeRest">

                <div className="container">
                    <div className="header">
                        <h1>{t("Requests")}</h1>

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
