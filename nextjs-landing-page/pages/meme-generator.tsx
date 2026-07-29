import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef, ChangeEvent } from 'react'
// We will create this CSS module later
import styles from '@/styles/MemeGenerator.module.css'

export default function MemeGeneratorPage() {
  const [topText, setTopText] = useState<string>('')
  const [bottomText, setBottomText] = useState<string>('')
  const [image, setImage] = useState<string | null>(null)
  const [generatedMeme, setGeneratedMeme] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageFileRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setImage(e.target.result)
          setGeneratedMeme(null) // Clear previous meme
        }
      }
      reader.readAsDataURL(event.target.files[0])
    }
  }

  const generateMeme = () => {
    if (!image || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.src = image
    img.onload = () => {
      // Set canvas dimensions to image dimensions
      canvas.width = img.width
      canvas.height = img.height

      // Draw the image
      ctx.drawImage(img, 0, 0)

      // Style the text
      const fontSize = Math.floor(img.height / 10)
      ctx.font = `${fontSize}px Impact, sans-serif` // Classic meme font
      ctx.fillStyle = 'white'
      ctx.strokeStyle = 'black'
      ctx.lineWidth = Math.floor(fontSize / 20)
      ctx.textAlign = 'center'

      // Draw top text
      ctx.textBaseline = 'top'
      ctx.strokeText(topText.toUpperCase(), img.width / 2, 10) // 10px padding from top
      ctx.fillText(topText.toUpperCase(), img.width / 2, 10)

      // Draw bottom text
      ctx.textBaseline = 'bottom'
      ctx.strokeText(bottomText.toUpperCase(), img.width / 2, img.height - 10) // 10px padding from bottom
      ctx.fillText(bottomText.toUpperCase(), img.width / 2, img.height - 10)

      setGeneratedMeme(canvas.toDataURL('image/png'))
    }
    img.onerror = () => {
      console.error("Error loading image for canvas.")
      alert("Could not load the image for meme generation. Please try a different image.")
    }
  }

  const downloadMeme = () => {
    if (!generatedMeme) return
    const link = document.createElement('a')
    link.href = generatedMeme
    link.download = 'meme.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Meme Generator - Meme Tools</title>
        <meta name="description" content="Create your own custom memes with the Meme Tools generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>Meme Tools - Generator</h1>
        <nav>
          <Link href="/" legacyBehavior><a>&larr; Back to Meme Tools Home</a></Link>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.controls}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={imageFileRef}
            className={styles.fileInput}
          />
          <input
            type="text"
            placeholder="Top Text"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
            className={styles.textInput}
          />
          <input
            type="text"
            placeholder="Bottom Text"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
            className={styles.textInput}
          />
          <button onClick={generateMeme} className={styles.button} disabled={!image}>
            Generate Meme
          </button>
          {generatedMeme && (
            <button onClick={downloadMeme} className={`${styles.button} ${styles.secondary}`}>
              Download Meme
            </button>
          )}
        </div>

        <div className={styles.previewArea}>
          <h2>Meme Preview</h2>
          {image && !generatedMeme && (
            <img src={image} alt="Uploaded preview" className={styles.imagePreview} />
          )}
          {generatedMeme && (
             <img src={generatedMeme} alt="Generated meme" className={styles.imagePreview} />
          )}
          {!image && <p>Upload an image to get started.</p>}
        </div>

        {/* Hidden canvas for meme generation */}
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Meme Tools. All rights reserved.</p>
      </footer>
    </div>
  )
}
