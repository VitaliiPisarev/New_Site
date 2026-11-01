import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/shared";
import "./style.css";
export const metadata: Metadata = {
  title: {
    default: "Аудит и доработка сайта по 152-ФЗ",
    template: "%s — Сайт и данные",
  },
  description:
    "Аудит форм и сервисов сайта, подготовка документов и согласованные доработки.",
  robots: { index: false, follow: false },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <a className="skip" href="#main">
          Перейти к содержимому
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
