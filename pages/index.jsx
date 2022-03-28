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
