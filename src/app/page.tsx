import Link from "next/link";
import { Packages, FAQ } from "@/components/shared";
import { RequestForm } from "@/components/request-form";
import { SignalVisual } from "@/components/signal-visual";
const steps = [
  ["01", "Обращение", "Вы рассказываете о сайте и задаче."],
  ["02", "Обследование", "Изучаем формы, сервисы и документы."],
  ["03", "План и стоимость", "Согласуем состав работ и предложение."],
  ["04", "Доработка", "Внедряем согласованные изменения."],
  ["05", "Проверка и сдача", "Передаём результаты и инструкцию."],
];
export default function Home() {
  return (
    <main id="main">
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="hero-tag">
              <span className="dot" /> ТУЛА И ОБЛАСТЬ{" "}
              <span className="tag-sep">/</span> УСЛУГИ ДЛЯ БИЗНЕСА
            </div>
            <h1>
              Аудит и доработка сайта{" "}
              <span>
                по 152-ФЗ<i>.</i>
              </span>
            </h1>
            <p>
              Проверим формы и сервисы, подготовим документы с юридической
              проверкой и внедрим согласованные изменения на сайте.
            </p>
            <div className="button-row">
              <a className="button" href="#request">
                Запросить разбор сайта <span aria-hidden="true">→</span>
              </a>
              <a className="text-link" href="#services">
                Посмотреть состав работ <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="hero-foot">
              <span className="hero-foot-icon">✓</span>
              <span>
                Без лишних обещаний.
                <br />
                <strong>С понятным планом работ.</strong>
              </span>
            </div>
          </div>
          <SignalVisual />
        </div>
        <div className="wrap hero-bottom">
          <span>ДАННЫЕ · САЙТ · ПОНЯТНЫЙ ПЛАН</span>
          <span>
            01 — 05 <span aria-hidden="true">↓</span>
          </span>
        </div>
      </section>
      <section className="section intro">
        <div className="wrap split">
          <div>
            <p className="eyebrow">01 / КОМУ ПОДХОДИТ</p>
            <h2>
              Сайт работает.
              <br />А как работают <em>данные?</em>
            </h2>
          </div>
          <div>
            <p className="lead">
              Для бизнеса, который получает обращения через сайт и хочет
              разобраться, что происходит с данными посетителей.
            </p>
            <p>
              Формы, почта, аналитика и сторонние сервисы образуют единый
              маршрут. Поможем увидеть его целиком и определить следующие шаги.
              Сложные процессы оцениваются отдельно.
            </p>
            <Link className="arrow-link" href="/audit/">
              Что входит в аудит <span>→</span>
            </Link>
          </div>
        </div>
        <div className="wrap check-strip">
          <span>ПРОВЕРЯЕМ</span>
          <strong>
            <i>01</i> Формы и заявки
          </strong>
          <strong>
            <i>02</i> Документы
          </strong>
          <strong>
            <i>03</i> Сервисы и cookie
          </strong>
          <strong>
            <i>04</i> Маршруты данных
          </strong>
        </div>
      </section>
      <section id="services" className="section services-section">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / НАПРАВЛЕНИЯ РАБОТЫ</p>
              <h2>
                Выберите нужный
                <br />
                <em>объём помощи</em>
              </h2>
            </div>
            <p>
              Начать можно с обследования. После него станет понятно, какие
              изменения действительно нужны вашему сайту.
            </p>
          </div>
          <Packages />
          <p className="section-footnote">
            * Состав пакетов и границы работ уточняются до заключения договора.
          </p>
        </div>
      </section>
      <section id="process" className="section process-section">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 / КАК МЫ РАБОТАЕМ</p>
              <h2>
                От первого вопроса
                <br />
                <em>до понятного результата</em>
              </h2>
            </div>
            <p>
              Двигаемся последовательно: сначала разбираемся в задаче, затем
              согласуем и выполняем работу.
            </p>
          </div>
          <div className="steps">
            {steps.map(([n, title, desc]) => (
              <article key={n}>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section deliverables">
        <div className="wrap deliver-grid">
          <div>
            <p className="eyebrow light">04 / РЕЗУЛЬТАТ РАБОТЫ</p>
            <h2>
              Не просто документы.
              <br />
              <em>Понятная картина.</em>
            </h2>
            <p>
              Вы получите согласованный результат, перечень выполненных проверок
              и информацию для дальнейшей работы с сайтом.
            </p>
            <Link className="button button-white" href="/demo/#report">
              Посмотреть учебный пример →
            </Link>
          </div>
          <div className="report-card">
            <div className="report-top">
              <span>ПРИМЕР ОТЧЁТА</span>
              <span>→</span>
            </div>
            <div className="report-label">УЧЕБНЫЙ МАТЕРИАЛ</div>
            <h3>Результаты обследования сайта</h3>
            <p>Пример структуры отчёта на вымышленных данных.</p>
            <div className="report-rule" />
            <div className="report-row">
              <span>01</span> Формы и обращения <b>→</b>
            </div>
            <div className="report-row">
              <span>02</span> Документы и уведомления <b>→</b>
            </div>
            <div className="report-row">
              <span>03</span> Сервисы и рекомендации <b>→</b>
            </div>
            <small>Демонстрация · Не является реальным кейсом</small>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap demo-banner">
          <div>
            <p className="eyebrow">05 / ПОПРОБУЙТЕ САМИ</p>
            <h2>
              Посмотрите,
              <br />
              <em>как это работает</em>
            </h2>
            <p>
              На учебном примере покажем отдельное согласие и выбор
              необязательных cookie.
            </p>
            <Link className="arrow-link" href="/demo/">
              Открыть демонстрацию <span>→</span>
            </Link>
          </div>
          <div className="demo-visual">
            <div>
              <span className="demo-check">✓</span>
              <span>
                <strong>Отдельное согласие</strong>
                <small>Понятно посетителю сайта</small>
              </span>
            </div>
            <div>
              <span className="demo-switch" />
              <span>
                <strong>Выбор за посетителем</strong>
                <small>Управление необязательными сервисами</small>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="section team-section">
        <div className="wrap split">
          <div>
            <p className="eyebrow">О НАС / КОМАНДА</p>
            <h2>
              Техническая работа.
              <br />
              <em>Юридическая проверка.</em>
            </h2>
          </div>
          <div>
            <p className="lead">
              Состав работ и участие специалистов согласуются для каждой задачи.
            </p>
            <p>
              Сведения об исполнителе и партнёрах будут добавлены после
              подтверждения.
            </p>
            <Link className="arrow-link" href="/about/">
              Подробнее о команде →
            </Link>
          </div>
        </div>
      </section>
      <section className="section faq-section">
        <div className="wrap faq-grid">
          <div>
            <p className="eyebrow">06 / ВОПРОСЫ И ОТВЕТЫ</p>
            <h2>
              Отвечаем
              <br />
              <em>на главное</em>
            </h2>
            <p>Собрали вопросы, которые помогают начать разговор о задаче.</p>
            <Link href="/faq/" className="arrow-link">
              Все вопросы <span>→</span>
            </Link>
          </div>
          <FAQ />
        </div>
      </section>
      <RequestForm />
    </main>
  );
}
