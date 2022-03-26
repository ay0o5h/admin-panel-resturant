import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import Cookies from "js-cookie";
import { useTranslations } from 'next-intl';
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ApiRegister } from "../api";

const Signup = () => {
    const t = useTranslations('home');
    const { locale, locales, defaultLocale, asPath } = useRouter();
    const Router = useRouter();
    const onFinish = (info) => {
        ApiRegister(info, (data, error) => {
            if (error) return message.error(error);
            Cookies.set("token", data.token);
            Cookies.set("user", JSON.stringify(data.user));
            Router.push("/");
        });
    };
    return (
        <>
            <Head>
                <title>{t("signup")}</title>
            </Head>
            <div className="login">
                <div className="left" style={{ flexDirection: `${locale === "en" ? "row" : "row-reverse"}`, textAlign: `${locale === "en" ? "left" : "right"}` }}>
                    <h1>{t("signup")}</h1>
                    <Form
                        initialValues={{
                            remember: true,
                        }}
                        name="register"
                        onFinish={onFinish}
                        className="form"
                        scrollToFirstError
                    >
                        <Form.Item
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: locale === 'en' ? "Please input your name!" : "الرجاء إدخال اسمك",
                                },
                            ]}
                        >
                            <Input placeholder="Aya" className="input" />
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: locale === 'en' ? "Please input your last name!" : "الرجاء ادخال اسم الاب",
                                },
                            ]}
                        >
                            <Input placeholder="munadhil" className="input" />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: locale === 'en' ? "Please input your phone!" : "الرجاء إدخال هاتفك!",
                                },
                            ]}
                        >
                            <Input placeholder="07805847657" className="input" />
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
                            <Button type="primary" htmlType="submit">
                                {locale === 'en' ? < ArrowRightOutlined style={{ fontWeight: 900 }} /> : <ArrowLeftOutlined style={{ fontWeight: 900 }} />}
                            </Button>
                        </Form.Item>
                    </Form>
                    <p>
                        {t("alreadyExist")} ? <Link href="/login">{t("login")}</Link>
                    </p>
                </div>

            </div>
        </>
    );
};
export default Signup;
export async function getStaticProps({ locale }) {
    return {
        props: {
            messages: (await import(`../lang/${locale}.json`)).default
        }
    };
}