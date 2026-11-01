"use client";
import { useId, useRef, useState } from "react";
import Link from "next/link";
type Errors = Partial<Record<"website" | "contact" | "consent", string>>;
export function RequestForm({ service = "general" }: { service?: string }) {
  const id = useId();
  const form = useRef<HTMLFormElement>(null);
  const [method, setMethod] = useState("email");
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState("");
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const website = String(data.get("website") || "").trim();
    const contact = String(data.get("contact") || "").trim();
    const next: Errors = {};
    try {
      const url = new URL(
        /^https?:\/\//i.test(website) ? website : `https://${website}`,
      );
      if (
        !website ||
        website.length > 2048 ||
        !["http:", "https:"].includes(url.protocol) ||
        url.username ||
        url.password ||
        !url.hostname.includes(".")
      )
        throw Error();
    } catch {
      next.website = "Укажите корректный домен или адрес сайта без пароля.";
    }
    if (
      method === "email"
        ? !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) || contact.length > 254
        : !/^[+\d\s()\-]+$/.test(contact) ||
          contact.replace(/\D/g, "").length < 10 ||
          contact.replace(/\D/g, "").length > 15
    )
      next.contact =
        method === "email"
          ? "Укажите корректный email."
          : "Укажите телефон: от 10 до 15 цифр.";
    if (!data.get("consent")) next.consent = "Подтвердите согласие.";
    setErrors(next);
    if (Object.keys(next).length) {
      setNotice("Проверьте выделенные поля.");
      const first = Object.keys(next)[0];
      requestAnimationFrame(() =>
        form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(),
      );
      return;
    }
    setNotice(
      "Приём обращений пока не подключён. Данные не отправлены и не сохранены.",
    );
  }
  return (
    <section id="request" className="request section">
      <div className="wrap request-grid">
        <div>
          <p className="eyebrow light">НАЧНЁМ С ВАШЕГО САЙТА</p>
          <h2>
            Расскажите
            <br />о задаче<span className="accent">.</span>
          </h2>
          <p className="request-intro">
            Пришлите адрес сайта и контакт. Уточним задачу и предложим состав
            работ.
          </p>
          <div className="request-note">
            <span>→</span>
            <p>
              Предварительный разбор поможет определить состав работ. Он не
              является юридическим заключением.
            </p>
          </div>
        </div>
        <form
          ref={form}
          className="form-card"
          action="/api/requests"
          method="post"
          onSubmit={submit}
          noValidate
        >
          <p className="form-heading">Запросить разбор сайта</p>
          <p className="form-draft">
            Тестовый режим: обращения не отправляются. Для проверки формы нужен
            JavaScript.
          </p>
          <p className="muted">Поля со звёздочкой обязательны</p>
          <label htmlFor={`${id}-website`}>
            Адрес сайта <span>*</span>
          </label>
          <input
            id={`${id}-website`}
            name="website"
            maxLength={2048}
            placeholder="example.ru"
            aria-invalid={!!errors.website}
            aria-describedby={
              errors.website ? `${id}-website-error` : undefined
            }
          />
          {errors.website && (
            <p className="error" id={`${id}-website-error`}>
              {errors.website}
            </p>
          )}
          <label htmlFor={`${id}-service`}>Направление</label>
          <select id={`${id}-service`} name="service" defaultValue={service}>
            <option value="general">Нужна консультация</option>
            <option value="audit">Аудит</option>
            <option value="site">Сайт</option>
            <option value="rkn">Сайт и РКН</option>
          </select>
          <label htmlFor={`${id}-method`}>
            Способ связи <span>*</span>
          </label>
          <select
            id={`${id}-method`}
            name="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="email">Email</option>
            <option value="phone">Телефон</option>
          </select>
          <label htmlFor={`${id}-contact`}>
            {method === "email" ? "Email" : "Телефон"} <span>*</span>
          </label>
          <input
            id={`${id}-contact`}
            name="contact"
            type={method === "email" ? "email" : "tel"}
            maxLength={254}
            placeholder={
              method === "email" ? "name@example.ru" : "+7 (___) ___-__-__"
            }
            aria-invalid={!!errors.contact}
            aria-describedby={
              errors.contact ? `${id}-contact-error` : undefined
            }
          />
          {errors.contact && (
            <p className="error" id={`${id}-contact-error`}>
              {errors.contact}
            </p>
          )}
          <label htmlFor={`${id}-comment`}>
            Комментарий <span className="optional">необязательно</span>
          </label>
          <textarea
            id={`${id}-comment`}
            name="comment"
            maxLength={1000}
            rows={3}
            aria-describedby={`${id}-hint`}
          />
          <p className="field-hint" id={`${id}-hint`}>
            Не указывайте пароли, документы и данные ваших клиентов.
          </p>
          <label className="checkbox">
            <input
              type="checkbox"
              name="consent"
              aria-invalid={!!errors.consent}
              aria-describedby={
                errors.consent ? `${id}-consent-error` : undefined
              }
            />
            <span>
              Я ознакомился с <Link href="/consent/">текстом согласия</Link> и
              даю согласие на обработку данных. *
            </span>
          </label>
          {errors.consent && (
            <p className="error" id={`${id}-consent-error`}>
              {errors.consent}
            </p>
          )}
          <button className="button form-submit" type="submit">
            Отправить запрос <span aria-hidden="true">→</span>
          </button>
          <p className="field-hint">
            Информация об обработке — в{" "}
            <Link href="/privacy/">политике конфиденциальности</Link>.
          </p>
          <p className="form-notice" role="status">
            {notice}
          </p>
        </form>
      </div>
    </section>
  );
}
