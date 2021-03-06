import Head from 'next/head'

export default function Layout({children, title}) {
 return (
  <>
  <Head>
   {title ? <title>Counter | {title}</title> : <title>Counter</title>}
  </Head>
  <div className="container mx-auto max-w-6xl">
   <div className="flex flex-col min-h-screen items-center justify-center">
    {children}
   </div>
  </div>
  </>
 )
}
