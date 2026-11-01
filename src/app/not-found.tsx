import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="section">
      <div className="wrap prose">
        <p className="eyebrow">ОШИБКА 404</p>
        <h1>
          Страница не найдена<span className="accent">.</span>
        </h1>
        <p>Возможно, адрес изменился или страница была перемещена.</p>
        <div className="button-row">
          <Link className="button" href="/">
            На главную →
          </Link>
          <Link className="arrow-link" href="/contacts/">
            Контакты →
          </Link>
        </div>
      </div>
    </main>
  );
}
