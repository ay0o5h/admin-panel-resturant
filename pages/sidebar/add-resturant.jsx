import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Steps, TimePicker, Upload } from 'antd';
import moment from 'moment';
import React, { useState } from "react";
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
    {
        title: '3',
    },
];
const AddResturant = () => {
    const [current, setCurrent] = useState(0);
    const [image, setAddImg] = useState("");

    const onFinish = (values) => {
        console.log('Success:', values);
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
    const handleImageUpload = ({ fileList }) => {
        if (fileList[0]) {
            setAddImg(fileList[0].originFileObj);
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
                        <center> <h3>Enter Basice Information</h3></center>
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
                                <Input style={inputStyle} />
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
                                <Dragger onChange={handleImageUpload}>
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
                                <Dragger onChange={handleImageUpload}>
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
                                    next
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )}

                {/* {current === 0 && <p>test</p>} */}
                <div className="steps-action">
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
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