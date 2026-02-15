import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'OnlineTech ERP - Sistema de Gestión Empresarial',
  description: 'Sistema ERP completo para gestión de inventario, ventas, clientes, finanzas y reportes',
  generator: 'v0.app',
  icons: {
    icon: '/OnlineTech.png',
    apple: '/OnlineTech.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `
    (function(c, h, a, r, o, n) {
      c.CharonAnalytics = c.CharonAnalytics || new Proxy({
        q: []
      },
      {
        get: function(target, prop) {
          if (prop in target) {
            return target[prop];
          }
          return function(...args) {
            target.q.push([prop, ...args]);
          };
        }
      });

      fetch('https://api.getcharon.com/static.js').then(res => res.text()).then(text => {
        const queuedCalls = c.CharonAnalytics.q;

        const script = document.createElement('script');
        script.textContent = text;
        script.async = 1;
        h.body.appendChild(script);

        setTimeout(function() {
          if (queuedCalls && queuedCalls.length) {
            queuedCalls.forEach(function(args) {
              c.CharonAnalytics[args[0]](...args.slice(1));
            });
          }
        },
        0);
      });

      c.CharonAnalytics.init('110405a9-857d-4b23-b958-ac8cf35ad5f0');
    })(window, document);
            `
          }}
        />
      </body>
    </html>
  )
}
