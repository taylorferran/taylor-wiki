import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from "react";
import { motion } from "framer-motion";


export default function Home() {

  const [movePic, setMovePic] = useState(false);

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

      <motion.div
        animate={{
                y: movePic ? 230 : 0,
                scale: movePic ? 2.5 : 1,
        }}
        onClick={() => {
          setMovePic(!movePic);
        }}
      >
        <img src="/taylorphoto.jpeg" width="170" height="220.67"></img>
      </motion.div>
      <motion.div className={styles.main}
        initial={{ opacity: 0, scale: 0.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      
      >
      <h1>taylor ferran</h1>

        <b>about</b>
          <p>I'm from Belfast, Northern Ireland but currently I'm traveling around South East Asia.</p>
          <p>I'm currently looking out for Developer Relations roles, or any other relevant web3 position.</p>
          <p>I'm passionate about decentralisation, open source tech, and dope traditional blackwork tattoos!</p>
          <p>My newest project is Tattoo DAO which I'm currently trying to launch. You can view the <a href="https://drive.google.com/file/d/1-3mIhpyVuCEyyDH3FQnsb3ZZhtRQSbC2/view" target="_blank">litepaper here.</a></p>
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
        <a href="https://medium.com/@taylor_web3" target="_blank">Medium</a>
        </motion.div >

      </main>

    </div>
  )
}
