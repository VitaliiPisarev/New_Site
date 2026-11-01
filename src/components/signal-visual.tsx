/** Учебная схема процесса; не содержит результатов проверки реального сайта. */
export function SignalVisual() {
  return (
    <div
      className="signal-visual"
      aria-label="Схема: сайт, анализ и согласованные действия"
    >
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
        <div>
          <span>✓</span>
          <p>
            <small>01 / СБОР</small>Формы сайта
          </p>
        </div>
        <div>
          <span>✓</span>
          <p>
            <small>02 / ПЕРЕДАЧА</small>Сервисы
          </p>
        </div>
        <div>
          <span>✓</span>
          <p>
            <small>03 / ОСНОВАНИЯ</small>Документы
          </p>
        </div>
        <div>
          <span>✓</span>
          <p>
            <small>04 / РЕЗУЛЬТАТ</small>План действий
          </p>
        </div>
      </div>
      <div className="signal-visual__bottom">
        <span>ФОРМЫ</span>
        <span>ДОКУМЕНТЫ</span>
        <span>СЕРВИСЫ</span>
      </div>
    </div>
  );
}
