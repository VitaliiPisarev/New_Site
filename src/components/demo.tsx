"use client";
import { useState } from "react";
export function Demo() {
  const [choice, setChoice] = useState("Только необходимые");
  const [sent, setSent] = useState(false);
  return (
    <div className="demo-grid">
      <section className="demo-card">
        <p className="eyebrow">ПРИМЕР 01</p>
        <h2>Форма обращения</h2>
        <p>
          В примере используются вымышленные данные. Никакие сведения не
          отправляются.
        </p>
        <label>
          Адрес сайта
          <input value="example.test" readOnly />
        </label>
        <label>
          Контакт
          <input value="client@example.test" readOnly />
        </label>
        <label className="checkbox">
          <input type="checkbox" />
          <span>Согласие на обработку данных в учебном примере</span>
        </label>
        <button className="button" onClick={() => setSent(true)}>
          Показать действие →
        </button>
        <p role="status">
          {sent ? "Это учебный пример. Заявка не отправлена." : ""}
        </p>
      </section>
      <section className="demo-card">
        <p className="eyebrow">ПРИМЕР 02</p>
        <h2>Выбор cookie</h2>
        <p>
          Условная аналитика не подключается. Этот выбор действует только внутри
          демонстрации.
        </p>
        <div className="demo-choice">
          <span>Текущий выбор</span>
          <strong>{choice}</strong>
        </div>
        <div className="button-row">
          <button
            className="button"
            onClick={() => setChoice("Разрешена условная аналитика")}
          >
            Разрешить
          </button>
          <button
            className="button secondary"
            onClick={() => setChoice("Только необходимые")}
          >
            Только необходимые
          </button>
        </div>
      </section>
    </div>
  );
}
