import { Inter } from "next/font/google";
import "./globals.css";
import Topbar from '@/components/Topbar'
import Footer from '@/components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "achraf-blog",
  description: "Generated by create next app",
  author: "Your Name",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <div className ='w-full mt-0 fixed '>
      <Topbar/>
          </div>
          <div className ='pt-10 '>
      <ToastContainer />
        {children}
          </div>
      <div className ='w-full mb-0 '>
          <Footer/>
        </div>
        </body>
    </html>
  );
}
