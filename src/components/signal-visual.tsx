/** Учебная схема процесса; не содержит результатов проверки реального сайта. */
export function SignalVisual() {
  return (
    <div
      className="signal-visual"
      aria-label="Схема: сайт, анализ и согласованные действия"
    >
      <div className="legal-photo" aria-hidden="true" />
      <div className="signal-visual__top">
        <span>МАРШРУТ ДАННЫХ</span>
        <span className="signal-live">СХЕМА РАБОТЫ</span>
      </div>
      <div className="legal-document" aria-hidden="true">
        <span className="legal-document__number">152</span>
        <span className="legal-document__line" />
        <span className="legal-document__caption">
          ФЕДЕРАЛЬНЫЙ ЗАКОН
          <br />О ПЕРСОНАЛЬНЫХ ДАННЫХ
        </span>
        <span className="legal-document__rules" />
      </div>
      <div className="legal-checklist" aria-hidden="true">
        {[
          "Политика конфиденциальности",
          "Согласия пользователей",
          "Формы на сайте",
          "Cookie и аналитика",
          "Технические настройки",
        ].map((item) => (
          <div key={item}>
            <span>✓</span>
            <p>{item}</p>
          </div>
        ))}
      </div>
      <div className="signal-visual__bottom">
        <span>ФОРМЫ</span>
        <span>ДОКУМЕНТЫ</span>
        <span>СЕРВИСЫ</span>
      </div>
    </div>
  );
}
