import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>taylor ferran</title>
        <meta name="description" content="it's me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img src="/taylorphoto.jpeg" width="200" height="266.67"></img>
        <h1 className={styles.title}>
           taylor ferran
        </h1>

        <b>about</b>
          <p>I'm from Belfast Northern Ireland but currently I'm traveling around South East Asia.</p>
          <p>I'm currently looking out for Developer Relations roles, or any other relevant web3 position.</p>
          <p>I'm passionate about decentralisation, open source tech, and dope traditional blackwork tattoos!</p>

        <b>current</b>
          <p>Smart contracts @ <a href="https://twitter.com/nudeclubapp" target="_blank">Nude Club</a></p>
          <p>Technical Content Creation @ <a href="https://www.metaintro.com/" target="_blank">Metaintro</a></p>

        <b>past</b>
        <p>Senior Software Engineer/Scrum Lead @  <a href="https://owmobility.com/" target="_blank">Enea Openwave</a></p>

        <b>links</b>
        <a href="https://twitter.com/taylor_web3" target="_blank">Twitter</a>
        <a href="https://github.com/taylorferran" target="_blank">Github</a>
        <a href="https://www.linkedin.com/in/taylorferran/" target="_blank">LinkedIn</a>
        <a href="https://www.youtube.com/channel/UCTUKeaO8igoZ_1jddxfP1wA" target="_blank">Youtube</a>
      </main>

    </div>
  )
}
