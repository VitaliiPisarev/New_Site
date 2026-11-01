import type { Metadata } from 'next';
import './style.css';
export const metadata: Metadata = {title:'Сайт услуг по 152-ФЗ — разработка',robots:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}) {return <html lang="ru"><body>{children}</body></html>}
