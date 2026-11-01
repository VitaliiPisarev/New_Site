import Link from "next/link";
import { faq, services } from "@/lib/content";
export function Packages() {
  return (
    <div className="packages">
      {services.map((s) => (
        <article className="package" key={s.slug}>
          <div className="package-top">
            <span>{s.label} / НАПРАВЛЕНИЕ</span>
            <span aria-hidden="true">→</span>
          </div>
          <h3>{s.name}</h3>
          <p>{s.summary}</p>
          <ul>
            {s.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
          <div className="package-bottom">
            <strong>Стоимость после оценки</strong>
            <Link href={`/${s.slug}/`}>
              Подробнее <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
export function FAQ() {
  return (
    <div className="faq-list">
      {faq.map(([q, a], i) => (
        <details key={q}>
          <summary>
            <span className="faq-num">0{i + 1}</span>
            <span>{q}</span>
            <span className="faq-plus" aria-hidden="true">
              +
            </span>
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link className="brand footer-brand" href="/">
              <span className="brand-icon">152</span>
              <span>
                Сайт и данные<small>Аудит · Доработка · РКН</small>
              </span>
            </Link>
            <p>
              Помогаем разобраться с обработкой данных на сайте и согласовать
              необходимые изменения.
            </p>
            <span className="region">Тула и область</span>
          </div>
          <div>
            <h2>Услуги</h2>
            <Link href="/audit/">Аудит сайта</Link>
            <Link href="/site/">Доработка сайта</Link>
            <Link href="/rkn/">Сайт и РКН</Link>
          </div>
          <div>
            <h2>Информация</h2>
            <Link href="/about/">О нас</Link>
            <Link href="/faq/">Вопросы и ответы</Link>
            <Link href="/contacts/">Контакты</Link>
            <Link href="/demo/">Учебная демонстрация</Link>
          </div>
          <div>
            <h2>Документы</h2>
            <Link href="/privacy/">Политика обработки данных</Link>
            <Link href="/consent/">Согласие</Link>
            <Link href="/cookies/">Cookie и сервисы</Link>
            <Link href="/cookies/#settings">Настройки cookie</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Сайт и данные</span>
          <span>Контактные данные и реквизиты готовятся к публикации.</span>
        </div>
      </div>
    </footer>
  );
}
