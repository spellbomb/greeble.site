import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Grid from './grid'; 

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <h1 style={{textAlign:"center", marginTop:"16px"}}>Welcome to Greeble Site</h1>
    <Grid />
    </>
  )
}
