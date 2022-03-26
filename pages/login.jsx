import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import Cookies from "js-cookie";
import { useTranslations } from 'next-intl';
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ApiLogin } from "../api";
const Login = () => {
    const t = useTranslations('home');
    const { locale, locales, defaultLocale, asPath } = useRouter();
    const Router = useRouter();

    const [loading, setLoading] = useState(false);
    const onFinish = (info) => {
        console.log(`info: ${info}`);
        setLoading(true);
        ApiLogin(info, (data, error) => {
            console.log(`data: ${data}`);
            console.log(`info: ${info}`);
            setLoading(false);
            if (error) return message.error("Invalid credentials");
            Cookies.set("token", data.token);
            console.log(data.user)
            Cookies.set("user", JSON.stringify(data.user));
            Router.push("/");
        });
    };
    return (
        <>
            <Head>
                <title>{t("login")}</title>
            </Head>
            <div className="login" style={{ flexDirection: `${locale === "en" ? "row" : "row-reverse"}`, textAlign: `${locale === "en" ? "left" : "right"}` }}>
                <div className="left" >
                    <center>   <h1>{t("login")}</h1></center>

                    <Form
                        initialValues={{
                            remember: true,
                        }}
                        name="login"
                        onFinish={onFinish}
                        className="form"
                        scrollToFirstError
                    >
                        <Form.Item
                            name="phone"
                            rules={[

                                {
                                    required: true,
                                    message: locale === 'en' ? "Please input your phone!" : "الرجاء إدخال هاتفك!",
                                },
                            ]}
                        >
                            <Input placeholder="0780000000" className="input" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: locale === 'en' ? "Please input your password!" : "الرجاء إدخال كلمة المرور الخاصة بك!",
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="********" className="password" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                loading={loading}
                                disabled={loading}
                                type="primary"
                                htmlType="submit"
                            >
                                {locale === 'en' ? < ArrowRightOutlined style={{ fontWeight: 900 }} /> : <ArrowLeftOutlined style={{ fontWeight: 900 }} />}

                            </Button>
                        </Form.Item>
                    </Form>
                    <p>
                        {t("haveAccount")} ? <Link style={{ color: "blue" }} href="/signup">{t("signup")}</Link>
                    </p>
                </div>

            </div>
        </>
    );
};
export default Login;
export async function getStaticProps({ locale }) {
    return {
        props: {
            messages: (await import(`../lang/${locale}.json`)).default
        }
    };
}