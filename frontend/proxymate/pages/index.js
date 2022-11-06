import Head from 'next/head'
import Link from "next/link"
import Image from 'next/image'
import MentalPeace from "../public/1.svg";
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="flex-col w-[100vw] h-[100vh] overflow-hidden bg-black">
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <script defer src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/js/all.min.js" integrity="sha512-naukR7I+Nk6gp7p5TMA4ycgfxaZBJ7MO5iC3Fp6ySQyKFHOGfpkSZkYVWV5R7u7cfAicxanwYQ5D1e17EfJcMA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
      </Head>
      <nav className='flex justify-around items-center'>
        <h1 className='text-white font-extrabold text-3xl p-5'>ProxyMate</h1>
        <ul className='text-white flex text-lg p-3'>
          <li className='p-4 rounded m-3 text-lg'>
            <Link href="/explore" className='border-b-2 p-2 border-purple-400'>Explore</Link>
          </li>
          <li className='p-4 rounded m-3 text-lg'>
            <a href="http://localhost:3000/auth/" className='border-b-2 p-2 border-purple-400'>Create</a>
          </li>
          <li className='p-4 rounded m-3 text-lg'>
            <a href="#"className='border-b-2 p-2 border-purple-400'>Count on me</a>
          </li>
          <li className='p-4 rounded m-3 text-lg'>
            <Link href="/penpal" className='border-b-2 p-2 border-purple-400'>Comfort mail</Link>
          </li>
        </ul>
      </nav>
      <main className='flex w-100 h-full text-white'>
        <section className='w-1/2 h-100 flex flex-col justify-center items-center'>
          <div>
            <h1 className='text-8xl font-bold mb-4 uppercase'>ProxyMate</h1>
            <p className='text-xl italic font-semibold mb-4'>The Comfort Clicks.</p>
            <button className='bg-purple-500 font-semibold text-lg rounded p-5'>Let's do it!</button>
          </div>
        </section>
        <section className='w-1/2 h-100 flex flex-col items-center justify-center'>
          <Image  src={MentalPeace} width={500} height={500} />
        </section>
      </main>
    </div>
  )
}
