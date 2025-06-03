import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'HireReady',
  description: 'HireReady is an app that helps you get ready to get hired. Get personalized resume recommendations based on job descriptions and optimize your resume for ATS systems.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body><Toaster />{children}</body>
    </html>
  );
}
