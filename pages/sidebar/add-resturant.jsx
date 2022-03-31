import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, message, Steps, TimePicker, Upload } from 'antd';
import interact from 'interactjs';
import moment from 'moment';
import { useTranslations } from 'next-intl';
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ApiAddResturant, ApiAddTable } from '../../api';
import RouteProtect from "../../HOC/RouteProtect";

const { Dragger } = Upload;
const inputStyle = { borderRadius: "5px", padding: "10px", width: "100%" };
const { Step } = Steps;
const steps = [
    {
        title: '1',
    },
    {
        title: '2',
    },
];
const AddResturant = () => {
    const t = useTranslations('home');
    const { locale, locales, defaultLocale, asPath } = useRouter();
    const [current, setCurrent] = useState(0);
    const [imageBg, setAddImageBg] = useState("");
    const [imageFloorMap, setAddimageFloorMap] = useState("");
    const [datas, setDatas] = useState("");
    const [sumTables, setSumTables] = useState([]);


    const onFinish = (values) => {
        console.log('Success:', values);
        const info = {
            name: values.name,
            numOfTable: parseInt(values.numOfTable),
            openDate: values.openDate._d,
            closeDate: values.closeDate._d,
            bgImage: imageBg,
            floorMap: imageFloorMap

        }
        if (!Object.values(values).includes("undefined")) {
            ApiAddResturant(info, (datab, error) => {
                console.log(`info: ${info}`);
                if (error) return message.error("something went wrong");
                message.success("Addes Successfuly");
                let datas = datab.rest
                setDatas(datas)
                console.log(datas)
                let sumTables = []
                for (let i = datas.numOfTable; i > 0; i--) {
                    sumTables.push(i)
                }
                setSumTables(sumTables)
                next()


            })
        }

    };


    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    const onChange = (time, timeString) => {
        console.log(time, timeString);
    }
    const handleImageUploadbg = ({ fileList }) => {
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
                    const imageBg = result.data.url;
                    setAddImageBg(imageBg);
                })
                .catch((e) => console.log(e));
        }
    };
    const handleImageUploadfloorMap = ({ fileList }) => {

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
                    const imageFloorMap = result.data.url;
                    setAddimageFloorMap(imageFloorMap);
                })
                .catch((e) => console.log(e));
        }
    };
    const onDragStart = (event) => {
        event.dataTransfer.setData('text/plain', event.target.id);

        event.currentTarget
            .style
            .backgroundColor = 'brown';
    }
    const onDragOver = (event) => {
        event.preventDefault();
    }
    const onDrop = (event) => {
        const id = event
            .dataTransfer
            .getData('text');
        const draggableElement = document.getElementById(id);
        const dropzone = event.target;
        dropzone.appendChild(draggableElement);
        event
            .dataTransfer
            .clearData();
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        else {
            event.cancelBubble = true;
        }
    }
    const handleFun = (t) => {
        const position = { x: 0, y: 0 }

        interact(t).draggable({
            listeners: {
                start(event) {
                    console.log(event.type, event.target)
                },
                move(event) {
                    position.x += event.dx
                    position.y += event.dy

                    event.target.style.transform =
                        `translate(${position.x}px, ${position.y}px)`;

                },

            }

        })

    }
    const handleHoverOff = (rest, c, e) => {
        console.log(c)
        console.log(`you have clicked X:${e.pageX} Y:${e.pageY}`);
        const info = { x: e.pageX, y: e.pageY, rest: rest, tableNum: c };
        ApiAddTable(info, (data, error) => {
            console.log(`info: ${info}`);
            if (error) return message.error("something went wrong");
            message.success("Addes Successfuly");
        })

    }
    return (
        <RouteProtect>
            <Head>{t('addResturant')}</Head>
            <div className="add-resturant">
                <Steps current={current} progressDot >
                    {steps.map(item => (
                        <Step key={item.title} ></Step>
                    ))}
                </Steps>
                {current === 0 && (
                    <>
                        <center> <h3>{t('headerAddRest')}</h3></center>
                        <Form
                            name="basic"
                            onFinish={onFinish}
                            className="form"
                        >
                            <p style={{ textAlign: `${locale === "en" ? "left" : "right"}` }}>{t('addResturantName')}</p>
                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: t('addResturantNameError') }]}
                            >
                                <Input style={inputStyle} />
                            </Form.Item>
                            <p style={{ textAlign: `${locale === "en" ? "left" : "right"}` }}>{t('addResturantNumberofTable')}</p>
                            <Form.Item
                                name="numOfTable"
                                rules={[{ required: true, message: t('addResturantNumberofTableErorr') }]}
                            >
                                <InputNumber min={0} max={10} defaultValue={0} style={inputStyle} />
                            </Form.Item>
                            <p style={{ textAlign: `${locale === "en" ? "left" : "right"}` }}>{t('addResturantOpenTime')}</p>
                            <Form.Item
                                name="openDate"
                                rules={[{ required: true, message: t('addResturantOpenTimeEroor') }]}
                            >
                                <TimePicker style={inputStyle} onChange={onChange} defaultOpenValue={moment('00:00', 'HH:mm')} />
                            </Form.Item>
                            <p style={{ textAlign: `${locale === "en" ? "left" : "right"}` }}>{t('addResturantCloseTime')}</p>
                            <Form.Item
                                name="closeDate"
                                rules={[{ required: true, message: t('addResturantCloseTimeErorr') }]}
                            >
                                <TimePicker style={inputStyle} onChange={onChange} defaultOpenValue={moment('00:00', 'HH:mm')} />
                            </Form.Item>
                            <p style={{ textAlign: `${locale === "en" ? "left" : "right"}` }}>{t('addResturantResturantImage')}</p>
                            <Form.Item
                                name="bgImage"
                                rules={[{ required: true, message: t('addResturantResturantImageErorr') }]}
                            >
                                <Dragger onChange={handleImageUploadbg}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">
                                        {t('dragNote')}
                                    </p>

                                </Dragger>
                            </Form.Item>
                            <p style={{ textAlign: `${locale === "en" ? "left" : "right"}` }}>{t('addResturantFloorMap')}</p>
                            <Form.Item
                                name="floorMap"
                                rules={[{ required: true, message: t('addResturantFloorMapErorr') }]}
                            >
                                <Dragger onChange={handleImageUploadfloorMap}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">
                                        {t('dragNote')}
                                    </p>

                                </Dragger>
                            </Form.Item>


                            <Form.Item>
                                <Button style={{ borderRadius: "10px", fontWeight: 900, fontSize: "20px", paddingBottom: "20px" }} type="primary" htmlType="submit" block>
                                    {t('addResturantSend')}
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )}
                {current === 1 && (
                    <>
                        <center> <h3>{t('addTables')}</h3></center>
                        <div className="example-parent">
                            <div
                                className="example-dropzone"
                                onDragOver={(event) => onDragOver(event)}
                                onDrop={(event) => onDrop(event)}
                                style={{
                                    backgroundImage: `url(${datas.floorMap})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    width: '300px',
                                    height: '400px',
                                }}
                            >
                                {t('addResturantFloorMap')}
                            </div>
                            <div className="example-origin">
                                {sumTables.map(c =>
                                    <div class={`draggable draggable-${c}`}
                                        onMouseUp={(e) => handleHoverOff(datas.id, c, e)}
                                        onClick={() => handleFun(`.draggable-${c}`)}> {c} </div>)}

                            </div>
                        </div>
                    </>)}
            </div>
        </RouteProtect>
    )
}
export default AddResturant;
export async function getStaticProps({ locale }) {
    return {
        props: {
            messages: (await import(`../../lang/${locale}.json`)).default
        }
    };
}