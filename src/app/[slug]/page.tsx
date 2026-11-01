import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/lib/content";
import { FAQ } from "@/components/shared";
import { RequestForm } from "@/components/request-form";
import { Demo } from "@/components/demo";
const titles: Record<string, string> = {
  audit: "Аудит сайта",
  site: "Доработка сайта",
  rkn: "Сайт и РКН",
  about: "О нас",
  faq: "Вопросы и ответы",
  contacts: "Контакты",
  demo: "Учебная демонстрация",
  privacy: "Политика обработки данных",
  consent: "Согласие на обработку данных",
  cookies: "Cookie и сервисы",
};
export function generateStaticParams() {
  return Object.keys(titles).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: titles[slug] || "Страница не найдена" };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = titles[slug];
  if (!title) notFound();
  const service = services.find((s) => s.slug === slug);
  return (
    <main id="main">
      <div className="page-head">
        <div className="wrap">
          <nav className="breadcrumbs" aria-label="Хлебные крошки">
            <Link href="/">Главная</Link>
            <span>/</span>
            <span>{title}</span>
          </nav>
          <p className="eyebrow">
            САЙТ И ДАННЫЕ / {service ? "НАШИ УСЛУГИ" : "ИНФОРМАЦИЯ"}
          </p>
          <h1>
            {title}
            <span className="accent">.</span>
          </h1>
          <p className="page-lead">
            {service?.summary ??
              {
                about: "Прозрачный подход к работе с данными на сайте.",
                faq: "Ответы на частые вопросы об услуге и порядке работы.",
                contacts: "Обсудим сайт, формы и состав необходимых работ.",
                demo: "Наглядные примеры на вымышленных данных.",
                privacy:
                  "Документ владельца сайта об обработке персональных данных.",
                consent: "Текст согласия для обращения через форму.",
                cookies: "Информация о файлах cookie и подключённых сервисах.",
              }[slug]}
          </p>
        </div>
      </div>
      {service ? (
        <>
          <section className="section">
            <div className="wrap service-grid">
              <div>
                <p className="eyebrow">ЗАДАЧА И РЕЗУЛЬТАТ</p>
                <h2>
                  Разберём задачу.
                  <br />
                  <em>Согласуем решение.</em>
                </h2>
                <p className="lead">{service.details}</p>
                <h3>Что вы получите</h3>
                <p>{service.result}</p>
                <h3>Границы работ</h3>
                <p>{service.scope}</p>
                {slug === "rkn" && (
                  <p>
                    Рассмотрение уведомления и внесение в реестр бесплатны;
                    оплачивается согласованное сопровождение. Запись в реестре
                    не означает одобрения сайта.
                  </p>
                )}
                <h3>Что потребуется</h3>
                <p>
                  Адрес сайта и описание задачи. Дополнительные сведения и
                  доступы определяются после предварительной оценки.
                </p>
              </div>
              <aside className="service-aside">
                <span className="eyebrow">СОСТАВ НАПРАВЛЕНИЯ</span>
                <h2>{service.name}</h2>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <strong>Стоимость после оценки</strong>
                <p>Срок и состав работ согласуются отдельно.</p>
                <a className="button" href="#request">
                  Запросить разбор →
                </a>
              </aside>
            </div>
          </section>
          <section className="section faq-section">
            <div className="wrap faq-grid">
              <div>
                <p className="eyebrow">ВОПРОСЫ И ОТВЕТЫ</p>
                <h2>Полезно знать</h2>
                <Link className="arrow-link" href="/faq/">
                  Все вопросы →
                </Link>
              </div>
              <FAQ />
            </div>
          </section>
          <RequestForm service={service.slug} />
        </>
      ) : slug === "demo" ? (
        <section className="section">
          <div className="wrap">
            <div className="notice">
              <strong>Учебный пример. Заявки не отправляются.</strong> Все
              данные вымышлены, действия не меняют настройки основного сайта.
            </div>
            <Demo />
            <section className="report-sample" id="report">
              <p className="eyebrow">УЧЕБНЫЙ ОБРАЗЕЦ ОТЧЁТА</p>
              <h2>Результаты обследования сайта</h2>
              <p>
                Вымышленный сайт: example.test. Этот образец показывает
                структуру отчёта и не является выполненным заказом или
                юридическим заключением.
              </p>
              <ol>
                <li>Формы и маршруты обращений.</li>
                <li>Документы и сообщения посетителю.</li>
                <li>
                  Сервисы, рекомендации и согласованные дальнейшие действия.
                </li>
              </ol>
            </section>
          </div>
        </section>
      ) : slug === "faq" ? (
        <section className="section">
          <div className="wrap faq-grid">
            <div>
              <p className="eyebrow">ЧАСТЫЕ ВОПРОСЫ</p>
              <h2>
                Начнём
                <br />
                <em>с главного</em>
              </h2>
              <p>Полная памятка готовится к размещению.</p>
            </div>
            <FAQ />
          </div>
        </section>
      ) : slug === "contacts" ? (
        <>
          <section className="section">
            <div className="wrap contact-panel">
              <p className="eyebrow">СВЯЗАТЬСЯ С НАМИ</p>
              <h2>Обсудим вашу задачу</h2>
              <p>
                Контактные данные, часы работы и реквизиты уточняются. Приём
                обращений через форму пока не подключён.
              </p>
            </div>
          </section>
          <RequestForm />
        </>
      ) : slug === "about" ? (
        <section className="section">
          <div className="wrap prose">
            <p className="eyebrow">НАШ ПОДХОД</p>
            <h2>
              Сначала разобраться.
              <br />
              <em>Затем действовать.</em>
            </h2>
            <p className="lead">
              Помогаем владельцам сайтов увидеть, какие данные собираются и
              какие изменения могут потребоваться.
            </p>
            <p>
              Правовые формулировки и документы проверяются юристом. Состав
              работ и роли участников согласуются для каждой задачи.
            </p>
            <p>
              Сведения об исполнителе и подтверждённом опыте готовятся к
              размещению.
            </p>
            <Link className="arrow-link" href="/contacts/#request">
              Обсудить задачу →
            </Link>
          </div>
        </section>
      ) : (
        <section className="section">
          <div className="wrap prose">
            <div className="notice">
              <strong>Черновик документа.</strong> Текст, сведения об операторе,
              дата и версия подлежат юридическому утверждению до приёма реальных
              обращений.
            </div>
            {slug === "cookies" ? (
              <>
                <h2 id="settings">Файлы cookie и сервисы</h2>
                <p>
                  Необязательная аналитика на этом стенде не подключена.
                  Фактический перечень сервисов, назначение и сроки хранения
                  будут опубликованы после проверки.
                </p>
              </>
            ) : (
              <>
                <h2>{title}</h2>
                <p>
                  Здесь будет размещён утверждённый документ, описывающий
                  фактическую обработку данных владельцем сайта.
                </p>
              </>
            )}
            <p>Документ пока не действует для приёма реальных заявок.</p>
          </div>
        </section>
      )}
    </main>
  );
}
