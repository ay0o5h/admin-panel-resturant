import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, message, Steps, TimePicker, Upload } from 'antd';
import moment from 'moment';
import Image from "next/image";
import React, { useState } from "react";
import { ApiAddResturant } from '../../api';
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
    const [current, setCurrent] = useState(0);
    const [imageBg, setAddImageBg] = useState("");
    const [imageFloorMap, setAddimageFloorMap] = useState("");
    const [data, setData] = useState("")


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
                let data = datab.rest
                setData(data)
                console.log(data)
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
                .then(async (result) => {
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
                .then(async (result) => {
                    const imageFloorMap = result.data.url;
                    setAddimageFloorMap(imageFloorMap);
                })
                .catch((e) => console.log(e));
        }
    };
    return (
        <RouteProtect>
            <div className="add-resturant">
                <Steps current={current} progressDot >
                    {steps.map(item => (
                        <Step key={item.title} ></Step>
                    ))}
                </Steps>
                {current === 0 && (
                    <>
                        <center> <h3>Enter Resturant Information</h3></center>
                        <Form
                            name="basic"
                            onFinish={onFinish}
                            className="form"
                        >
                            <p>name</p>
                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: 'Please enter resturant name!' }]}
                            >
                                <Input style={inputStyle} />
                            </Form.Item>
                            <p>number of Table</p>
                            <Form.Item
                                name="numOfTable"
                                rules={[{ required: true, message: 'Please enter number of Table!' }]}
                            >
                                <InputNumber min={1} max={10} defaultValue={3} style={inputStyle} />
                            </Form.Item>
                            <p>open Time</p>
                            <Form.Item
                                name="openDate"
                                rules={[{ required: true, message: 'Please enter open Time!' }]}
                            >
                                <TimePicker style={inputStyle} onChange={onChange} defaultOpenValue={moment('00:00', 'HH:mm')} />
                            </Form.Item>
                            <p>close Time</p>
                            <Form.Item
                                name="closeDate"
                                rules={[{ required: true, message: 'Please enter close Time!' }]}
                            >
                                <TimePicker style={inputStyle} onChange={onChange} defaultOpenValue={moment('00:00', 'HH:mm')} />
                            </Form.Item>
                            <p>Resturant Image</p>
                            <Form.Item
                                name="bgImage"
                                rules={[{ required: true, message: 'Please upload resturant image' }]}
                            >
                                <Dragger onChange={handleImageUploadbg}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">
                                        Click or drag file to this area to upload
                                    </p>

                                </Dragger>
                            </Form.Item>
                            <p>Floor Map</p>
                            <Form.Item
                                name="floorMap"
                                rules={[{ required: true, message: 'Please upload floor Map' }]}
                            >
                                <Dragger onChange={handleImageUploadfloorMap}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">
                                        Click or drag file to this area to upload
                                    </p>

                                </Dragger>
                            </Form.Item>


                            <Form.Item>
                                <Button style={{ borderRadius: "10px", fontWeight: 900, fontSize: "20px", paddingBottom: "20px" }} type="primary" htmlType="submit" block>
                                    ارسال
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )}
                {current === 1 && (
                    <>
                        <center> <h3>Add Tables</h3></center>
                        <Image src={data.bgImage} width="100%" height="100%" />
                    </>)}

                {/* {current === 0 && <p>test</p>} */}
                <div className="steps-action">

                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Previous
                        </Button>
                    )}
                </div>
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