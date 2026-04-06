/**
 * Processamento de foto do currículo (redimensiona para armazenamento seguro).
 */
export function fileToJpegDataUrl(file, maxWidth = 320) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const w = img.naturalWidth
        const h = img.naturalHeight
        const scale = w > maxWidth ? maxWidth / w : 1
        const cw = Math.round(w * scale)
        const ch = Math.round(h * scale)
        const canvas = document.createElement('canvas')
        canvas.width = cw
        canvas.height = ch
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Canvas'))
          return
        }
        ctx.drawImage(img, 0, 0, cw, ch)
        resolve(canvas.toDataURL('image/jpeg', 0.82))
      }
      img.onerror = () => reject(new Error('Imagem'))
      img.src = reader.result
    }
    reader.onerror = () => reject(new Error('Leitura'))
    reader.readAsDataURL(file)
  })
}
