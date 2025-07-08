import Head from 'next/head'
import Link from 'next/link' // Import Link
import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Meme Tools - Your Fun Hub</title>
        <meta name="description" content="Create and share fun memes with Meme Tools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>Welcome to Meme Tools</h1>
        <nav>
          <ul className={styles.navList}>
            <li className={styles.navItem}><Link href="/" legacyBehavior><a>Home</a></Link></li>
            <li className={styles.navItem}><a href="#">About</a></li>
            <li className={styles.navItem}><a href="#">Services</a></li>
            <li className={styles.navItem}><a href="#">Contact</a></li>
            <li className={styles.navItem}>
              <Link href="/meme-generator" legacyBehavior>
                <a>Meme Generator</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h2>Discover Amazing Things</h2>
          <p>This is a hero section where you can showcase your main product or service.</p>
          <button className={styles.ctaButton}>Learn More</button>
        </section>

        <section className={styles.features}>
          {/* Placeholder for feature sections */}
          <div className={styles.feature}>
            <h3>Feature 1</h3>
            <p>Description of feature 1.</p>
          </div>
          <div className={styles.feature}>
            <h3>Feature 2</h3>
            <p>Description of feature 2.</p>
          </div>
          <div className={styles.feature}>
            <h3>Feature 3</h3>
            <p>Description of feature 3.</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Meme Tools. All rights reserved.</p>
      </footer>
    </div>
  )
}
