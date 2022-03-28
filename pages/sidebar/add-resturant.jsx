import { Button, Form, Input, message, Steps, TimePicker } from 'antd';
import moment from 'moment';
import React, { useState } from "react";
import RouteProtect from "../../HOC/RouteProtect";


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
                                <Input />
                            </Form.Item>
                            <p>number of Table</p>
                            <Form.Item
                                name="numOfTable"
                                rules={[{ required: true, message: 'Please enter number of Table!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <p>open Time</p>
                            <Form.Item
                                name="openDate"
                                rules={[{ required: true, message: 'Please enter open Time!' }]}
                            >
                                <TimePicker onChange={onChange} defaultOpenValue={moment('00:00', 'HH:mm')} />
                            </Form.Item>
                            <p>close Time</p>
                            <Form.Item
                                name="closeDate"
                                rules={[{ required: true, message: 'Please enter close Time!' }]}
                            >
                                <TimePicker onChange={onChange} defaultOpenValue={moment('00:00', 'HH:mm')} />
                            </Form.Item>


                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    Submit
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