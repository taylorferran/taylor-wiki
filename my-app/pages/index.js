import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Analytics } from "@vercel/analytics/react"

export default function Home() {

  return (
    <div>
      <Head>
        <title>taylor ferran</title>
        <meta name="description" content="it's me" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@300&display=swap" rel="stylesheet" />
        </Head>

      <main className={styles.main}>

        <img src="/taylor_ethldn.jpeg" width="400" height="220.67"></img>

      <h1>taylor ferran</h1>

        <b>about</b>
          <p>I'm living in Belfast, Northern Ireland.</p>
          <p>I like decentralisation, Dota 2, and dope traditional blackwork tattoos.</p>

          <b>current</b>
          <p>Developer Relations @ <a href="https://etherspot.io" target="_blank">Etherspot</a></p>

        <b>past</b>
        <p>Smart contracts @ <a href="https://twitter.com/nudeclubapp" target="_blank">Nude Club</a></p>
        <p>Technical Content Creation @ <a href="https://www.metaintro.com/" target="_blank">Metaintro</a></p>
        <p>Senior Software Engineer/Scrum Lead @  <a href="https://owmobility.com/" target="_blank">Enea Openwave</a></p>

        <b>links</b>
        <a href="https://twitter.com/taylorferran" target="_blank">Twitter</a>
        <a href="https://github.com/taylorferran" target="_blank">Github</a>
        <a href="https://www.linkedin.com/in/taylorferran/" target="_blank">LinkedIn</a>
        <a href="https://steamcommunity.com/id/taylorferran" target="_blank">Steam</a>
        <a href="https://twitch.tv/taylor_dota" target="_blank">Twitch</a>
        <a href="https://t.me/taylorferran" target="_blank">Telegram</a>
        <a href="https://medium.com/@taylor_web3" target="_blank">Medium</a>
        <a href="https://discordapp.com/users/147012760394268672" target="_blank">Discord</a>

      </main>
      <Analytics />

    </div>
  )
}
