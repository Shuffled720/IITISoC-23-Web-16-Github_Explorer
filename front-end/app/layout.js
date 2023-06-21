//Import Components here
import '@/styles/globals.css'



export const metadata = {
  title: 'Basic Template',
  description: 'IITI Soc-23 Web-16',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
