import Head from 'next/head';
import RouteProtect from "../HOC/RouteProtect";


export default function Home() {
  return (
    <RouteProtect>
      <div className="home">
        <Head>
          <title>home</title>

        </Head>
        teeest
      </div>
    </RouteProtect>

  )
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../lang/${locale}.json`)).default
    }
  };
}
