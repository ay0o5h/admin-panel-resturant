import { DeleteOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import {
    Button, Image, message, Modal, Select, Table, TimePicker, Upload
} from "antd";
import Cookies from "js-cookie";
import moment from "moment";
import { useTranslations } from 'next-intl';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiFloormap, ApiResturants, ApiResturantsDelete } from "../../api";
import RouteProtect from "../../HOC/RouteProtect";

const { Dragger } = Upload;
const { Option } = Select;
const inputStyle = { borderRadius: "5px", padding: "10px", width: "100%", border: "1px solid #ccc", outline: 0 };

const MangeResturants = () => {
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
            if (error) return message.error(error);
            setData(data);
        });
    };
    useEffect(() => {
        getData();
    }, []);

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
            title: "Name",
            dataIndex: "name",
            render: (name) => <strong>{name}</strong>,
            width: 200,
        },

        {
            title: "Number Of Table",
            dataIndex: "numOfTable",
            render: (numOfTable) => <strong>{numOfTable}</strong>,
        },
        {
            title: "open Date",
            dataIndex: "openDate",
            render: (date) => moment(date).format("hh:mm A"),
        },
        {
            title: "close Date",
            dataIndex: "closeDate",
            render: (date) => moment(date).format("hh:mm A"),
        },
        {
            title: "Actions",
            dataIndex: "id",
            render: (id) => <div className="actions">
                <Button onClick={() => showModal(id)} type="primary" info><EditOutlined /></Button>
                <Button onClick={() => handleDelete(id)} type="primary" danger><DeleteOutlined /></Button>
            </div>,
        },

    ];
    const handleDelete = (id) => {
        ApiResturantsDelete(id, (data, error) => {
            console.log(data.rest)
            if (error) return message.error("something went wrong");
            message.success("delete successfuly");
            getData();
        })
    }
    const showModal = (id) => {
        ApiFloormap(id, (data, error) => {
            console.log(data.rest)
            if (error) return message.error("something went wrong")
            let editRestData = data.rest;
            setEditRestData(editRestData)
        })
        setIsModalVisible(true);
    };

    const handleOk = (id) => {
        console.log(id)
        const info = {

        }
        ApiResturantsEdit(id, info, (data, error) => {
            if (error) return message.error("something went wrong");
            message.success("update successfuly");
            getData();
            setIsModalVisible(false);


        })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = (values) => {
        setLoadin(true);
        var formdata = new FormData();
        formdata.append("image", image, image.name);

        var requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
        };

        fetch(`https://api.imgbb.com/1/upload?key=`, requestOptions)
            .then((response) => response.json())
            .then(async (result) => {
                const imageToUpload = result.data.url;

                const token = await Cookies.get("adminToken");
                var myHeaders = new Headers();
                myHeaders.append("token", token);
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    ...values,
                    image: imageToUpload,
                });

                var requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow",
                };

                fetch("https://prisma-shop.herokuapp.com/v1/product", requestOptions)
                    .then((response) => response.text())
                    .then((result) => {
                        message.success("uploaded successfully");
                        setLoadin(false);
                        getData();
                        handleCancel();
                    })
                    .catch((error) => console.log("error", error));
            })
            .catch((e) => console.log(e));
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const handleImageUpload = ({ fileList }) => {
        if (fileList[0]) {
            setAddImg(fileList[0].originFileObj);
        }
    };
    const onChange = (time, timeString) => {
        console.log(time, timeString);
    }
    return (
        <RouteProtect>
            <div className="mangeRest">
                <Modal
                    title="Edit Resturant"
                    visible={isModalVisible}
                    onOk={() => handleOk(editRestData.id)}
                    onCancel={handleCancel}
                >
                    <Image style={{ marginBottom: '10px' }} src={editRestData.bgImage} />
                    <center><Upload onChange={handleImageUpload}>
                        <Button icon={<UploadOutlined />}>Change Image</Button>
                    </Upload></center>
                    <form name="basic">
                        <p>Name </p>
                        <input style={inputStyle} className="edit-inputs" type="text" name="name" value={editRestData.name} />
                        <p>Number Of Table</p>
                        <input style={inputStyle} className="edit-inputs" type="text" name="numOfTable" value={editRestData.numOfTable} />
                        <p>open Date</p>
                        <TimePicker style={inputStyle} onChange={onChange} defaultValue={moment(editRestData.openDate, 'HH:mm')} />
                        <p>close Date</p>
                        <TimePicker style={inputStyle} onChange={onChange} defaultValue={moment(editRestData.closeDate, 'HH:mm')} />
                    </form>
                </Modal>
                <div className="container">
                    <div className="header">
                        <h1>Resturants</h1>

                    </div>
                    <Table
                        scroll={{ x: "700px" }}
                        pagination={{
                            defaultPageSize: 6,
                        }}
                        size="small"
                        rowKey={(record) => record.id}
                        loading={loading}
                        className="table"
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
