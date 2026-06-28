import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Devang Patil | Frontend Engineer & CS Student",
  description: "Portfolio of Devang Patil, a B.Tech Computer Science student at VIT Pune. Showcasing Singular, EcosystemAI, and ChainCampus projects.",
  keywords: ["Devang Patil", "Frontend Developer", "VIT Pune", "Software Engineer Portfolio", "React", "Next.js", "Solana", "AI Agents"],
  authors: [{ name: "Devang Patil", url: "https://github.com/Dev-angPatil" }],
};

export default function RootLayout({ children }) {
  // Script injected to prevent theme-flickering on load
  const themeScript = `
    (function() {
      try {
        var savedTheme = localStorage.getItem('theme');
        var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
        }
      } catch (e) {}
    })();
  `;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-fg selection:bg-accent/20 selection:text-accent font-sans grid-mesh">
        {children}
      </body>
    </html>
  );
}
