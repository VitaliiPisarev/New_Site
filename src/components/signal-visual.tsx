/** Схема показывает процесс услуги и не изображает результаты реальной проверки. */
export function SignalVisual() {
  return (
    <div
      className="signal-visual"
      aria-label="Схема: сайт, анализ и согласованные действия"
    >
      <div className="signal-visual__top">
        <span>МАРШРУТ ДАННЫХ</span>
        <span className="signal-live">
          <i /> СХЕМА РАБОТЫ
        </span>
      </div>
      <div className="signal-stage" aria-hidden="true">
        <div className="signal-glow" />
        <div className="signal-orbit orbit-one" />
        <div className="signal-orbit orbit-two" />
        <div className="signal-orbit orbit-three" />
        <svg className="signal-lines" viewBox="0 0 500 400" fill="none">
          <path d="M82 118H154L193 165M418 108H353L310 159M93 308H157L200 245M406 305H350L307 245" />
          <path
            className="signal-lines__flow"
            d="M82 118H154L193 165M418 108H353L310 159M93 308H157L200 245M406 305H350L307 245"
          />
          <circle cx="82" cy="118" r="3" />
          <circle cx="418" cy="108" r="3" />
          <circle cx="93" cy="308" r="3" />
          <circle cx="406" cy="305" r="3" />
        </svg>
        <div className="signal-core">
          <div className="signal-core__frame">
            <span>152</span>
            <small>ФЕДЕРАЛЬНЫЙ ЗАКОН</small>
          </div>
          <span className="signal-core__label">О ПЕРСОНАЛЬНЫХ ДАННЫХ</span>
        </div>
        <div className="signal-node signal-node--forms">
          <span className="signal-node__icon">→</span>
          <span>
            <small>01 / СБОР</small>
            <strong>Формы сайта</strong>
          </span>
        </div>
        <div className="signal-node signal-node--services">
          <span className="signal-node__icon">⌘</span>
          <span>
            <small>02 / ПЕРЕДАЧА</small>
            <strong>Сервисы</strong>
          </span>
        </div>
        <div className="signal-node signal-node--docs">
          <span className="signal-node__icon">▤</span>
          <span>
            <small>03 / ОСНОВАНИЯ</small>
            <strong>Документы</strong>
          </span>
        </div>
        <div className="signal-node signal-node--result">
          <span className="signal-node__icon">✓</span>
          <span>
            <small>04 / РЕЗУЛЬТАТ</small>
            <strong>План действий</strong>
          </span>
        </div>
      </div>
      <div className="signal-visual__bottom">
        <span>
          <i /> ФОРМЫ
        </span>
        <span>
          <i /> ДОКУМЕНТЫ
        </span>
        <span>
          <i /> СЕРВИСЫ
        </span>
      </div>
    </div>
  );
}
