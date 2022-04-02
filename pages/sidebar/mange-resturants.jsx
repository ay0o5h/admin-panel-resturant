import { AlignCenterOutlined, DeleteOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import {
    Button, Image, message, Modal, Spin, Table, TimePicker, Upload
} from "antd";
import moment from "moment";
import { useTranslations } from 'next-intl';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiFloormap, ApiResturants, ApiResturantsDelete, ApiResturantsEdit } from "../../api";
import RouteProtect from "../../HOC/RouteProtect";
const inputStyle = { borderRadius: "5px", padding: "10px", width: "100%", border: "1px solid #ccc", outline: 0 };

const MangeResturants = () => {
    const Router = useRouter();
    const t = useTranslations('home');
    const [inputsEdit, setInputsEdit] = useState("");
    const { locale, locales, defaultLocale, asPath } = useRouter();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editRestData, setEditRestData] = useState("")
    const [data, setData] = useState([]);
    const [image, setAddImg] = useState();
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
            title: "",
            dataIndex: "bgImage",
            render: (url) => <Image className="table-image" width={50} src={url} />,
            width: 50,
        },
        {
            title: t('addResturantName'),
            dataIndex: "name",
            render: (name) => <strong>{name}</strong>,
            width: 200,
        },

        {
            title: t('addResturantNumberofTable'),
            dataIndex: "numOfTable",
            render: (numOfTable) => <strong>{numOfTable}</strong>,
        },
        {
            title: t('addResturantOpenTime'),
            dataIndex: "openDate",
            render: (date) => moment(date).format("hh:mm A"),
        },
        {
            title: t('addResturantCloseTime'),
            dataIndex: "closeDate",
            render: (date) => moment(date).format("hh:mm A"),
        },
        {
            title: t('Actions'),
            dataIndex: "id",
            render: (id) => <div className="actions">
                <Button onClick={() => handleMange(id)} type="primary" success><AlignCenterOutlined /></Button>
                <Button onClick={() => showModal(id)} type="primary" info><EditOutlined /></Button>
                <Button onClick={() => handleDelete(id)} type="primary" danger><DeleteOutlined /></Button>
            </div>,
        },

    ];
    const handleMange = (id) => {
        Router.push(`/sidebar/mange/${id}`)
    }
    const handleDelete = (id) => {
        ApiResturantsDelete(id, (data, error) => {
            console.log(data.rest)
            if (error) return message.error(t("somethingwentwrong"));
            message.success(t('deletesuccessfuly'));
            getData();
        })
    }
    const showModal = (id) => {
        ApiFloormap(id, (data, error) => {
            console.log(data.rest)
            if (error) return message.error(t("somethingwentwrong"))
            let editRestData = data.rest;
            setEditRestData(editRestData)
        })
        setIsModalVisible(true);
    };
    const handleOk = (id) => {
        ApiResturantsEdit(id, inputsEdit, (data, error) => {
            if (error) return message.error(t("somethingwentwrong"));
            message.success(t("updatesuccessfuly"));
            getData();
            setIsModalVisible(false);

        })
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleImageUpload = ({ fileList }) => {
        if (fileList[0]) {
            if (fileList[0]) {
                var formdata = new FormData();
                formdata.append("image", fileList[0].originFileObj);
                var requestOptions = {
                    method: "POST",
                    body: formdata,
                    redirect: "follow",
                };
                fetch(`https://api.imgbb.com/1/upload?key=fbb93b107bf8de21163ffa94e7a574d9`, requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        setInputsEdit({
                            ...inputsEdit,
                            bgImage: result.data.url
                        })
                    })
                    .catch((e) => console.log(e));
            }
        }
    };
    return (
        <RouteProtect>
            <div className="mangeRest">
                <Modal
                    title="Edit Resturant"
                    visible={isModalVisible}
                    onOk={() => handleOk(editRestData.id)}
                    onCancel={handleCancel}
                >
                    {!!editRestData ? (
                        <>
                            <Image style={{ marginBottom: '10px' }} src={editRestData.bgImage} />
                            <center><Upload onChange={handleImageUpload}>
                                <Button icon={<UploadOutlined />}>{t("ChangeImage")}</Button>
                            </Upload></center>

                            <form name="basic">
                                <p>{t("addResturantName")}</p>
                                <input style={inputStyle}
                                    className="edit-inputs"
                                    type="text" name="name"
                                    value={inputsEdit.name ? inputsEdit.name : editRestData.name}
                                    onChange={handleInputChange}
                                />
                                <p>{t("addResturantNumberofTable")}</p>
                                <input style={inputStyle} className="edit-inputs"
                                    type="text" name="numOfTable" onChange={handleInputChange}
                                    value={inputsEdit.numOfTable ? inputsEdit.numOfTable : editRestData.numOfTable} />
                                <p>{t("addResturantOpenTime")}</p>
                                <TimePicker style={inputStyle}
                                    defaultValue={moment(editRestData.openDate, 'HH:mm')}
                                    onChange={(time, timeString) => {
                                        console.log(time, timeString);
                                        setInputsEdit({
                                            ...inputsEdit,
                                            openDate: time._d,
                                        });
                                    }}
                                />
                                <p>{t('addResturantCloseTime')}</p>
                                <TimePicker style={inputStyle} defaultValue={moment(editRestData.closeDate, 'HH:mm')}
                                    onChange={(time, timeString) => {
                                        console.log(time, timeString);
                                        setInputsEdit({
                                            ...inputsEdit,
                                            closeDate: time._d,
                                        });
                                    }}
                                />
                            </form></>) : <center><Spin /> </center>}
                </Modal>
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
export default MangeResturants;
export async function getStaticProps({ locale }) {
    return {
        props: {
            messages: (await import(`../../lang/${locale}.json`)).default
        }
    };
}
