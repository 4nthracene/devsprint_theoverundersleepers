import Head from 'next/head'
import Image from 'next/image'
import MentalPeace from "../public/1.svg";
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="flex-col w-[100vw] h-[100vh] overflow-hidden bg-black">
      <nav className='flex justify-between items-center'>
        <h1 className='text-white font-extrabold text-3xl p-5'>ProxyMate</h1>
        <ul className='text-white flex text-lg p-3'>
          <li className='p-4 rounded m-3'>
            <a href="#">Explore</a>
          </li>
          <li className='p-4 rounded m-3'>
            <a href="#">Create</a>
          </li>
          <li className='p-4 rounded m-3'>
            <a href="#">Pen Pal</a>
          </li>
        </ul>
      </nav>
      <main className='flex w-100 h-full text-white'>
        <section className='w-1/2 h-100 flex flex-col justify-center items-center'>
          <div>
            <h1 className='text-4xl font-bold mb-4'>ProxyMate</h1>
            <p className='text-sm font-semibold mb-4'>Defeat social anxiety by the power of your fabulous music taste.</p>
            <button className='bg-purple-500 font-semibold text-lg rounded p-5'>let's do it!</button>
          </div>
        </section>
        <section className='w-1/2 h-100 flex flex-col items-center justify-center'>
          <Image  src={MentalPeace} width={500} height={500} />
        </section>
      </main>
    </div>
  )
}
