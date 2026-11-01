"use client";
import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
const subscribe = () => () => {};
export function Header() {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  function close() {
    setOpen(false);
  }
  return (
    <header
      className="header"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          close();
          button.current?.focus();
        }
      }}
    >
      <div className="wrap header-inner">
        <Link className="brand" href="/" onClick={close}>
          <span className="brand-icon">152</span>
          <span>
            Сайт и данные<small>Аудит · Доработка · РКН</small>
          </span>
        </Link>
        {hydrated && (
          <button
            ref={button}
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? "Закрыть" : "Меню"}{" "}
            <span aria-hidden="true">{open ? "×" : "☰"}</span>
          </button>
        )}
        <nav
          id="site-nav"
          className={`nav${hydrated ? " nav-ready" : ""}${open ? " nav-open" : ""}`}
          aria-label="Основная навигация"
        >
          <details className="nav-services">
            <summary>Услуги</summary>
            <div className="nav-dropdown">
              <Link href="/audit/" onClick={close}>
                Аудит
              </Link>
              <Link href="/site/" onClick={close}>
                Доработка сайта
              </Link>
              <Link href="/rkn/" onClick={close}>
                Сайт и РКН
              </Link>
            </div>
          </details>
          <Link href="/#process" onClick={close}>
            Как работаем
          </Link>
          <Link href="/about/" onClick={close}>
            О нас
          </Link>
          <Link href="/faq/" onClick={close}>
            FAQ
          </Link>
          <Link href="/contacts/" onClick={close}>
            Контакты
          </Link>
          <Link
            href="/contacts/#request"
            className="button button-small"
            onClick={close}
          >
            Запросить разбор <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
