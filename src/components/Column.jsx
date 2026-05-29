import Card from './Card'

export default function Column({
  col, cards, dragOver,
  onDragOver, onDragLeave, onDrop,
  onAddCard, onEditCard, onDeleteCard, onDragStart,
}) {
  return (
    <div
      className={`rounded-xl w-[264px] min-w-[264px] p-4 flex flex-col gap-3 transition-all duration-200 ${
        dragOver ? 'scale-[1.01]' : ''
      }`}
      style={{
        background: dragOver ? col.glass.replace('0.07', '0.14').replace('0.08','0.16') : col.glass,
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: `1px solid ${col.glassBorder}`,
        boxShadow: dragOver
          ? `0 0 0 2px ${col.color}55, 0 4px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.7)`
          : `0 2px 12px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.7)`,
      }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: col.color }} />
        <span className="text-[11px] font-bold text-gray-700 flex-1 uppercase tracking-wider">
          {col.label}
        </span>
        <span
          className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: col.glassHighlight, color: col.color, border: `1px solid ${col.glassBorder}` }}
        >
          {cards.length}
        </span>
      </div>

      <div className="flex flex-col gap-2 min-h-12">
        {cards.length === 0 && (
          <div className="text-center text-gray-400/70 text-xs py-3">Drop cards here</div>
        )}
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            col={col.id}
            onEdit={onEditCard}
            onDelete={onDeleteCard}
            onDragStart={onDragStart}
          />
        ))}
      </div>

      <button
        className="w-full rounded-lg py-2 text-xs text-gray-400 hover:text-blue-500 transition-all duration-150"
        style={{
          border: `1.5px dashed ${col.glassBorder.replace('0.35','0.25').replace('0.4','0.25')}`,
          background: 'transparent',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = col.glassHighlight
          e.currentTarget.style.borderColor = col.glassBorder
          e.currentTarget.style.color = col.color
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.borderColor = col.glassBorder.replace('0.35','0.2').replace('0.4','0.2')
          e.currentTarget.style.color = '#9ca3af'
        }}
        onClick={() => onAddCard(col.id)}
      >
        + Add card
      </button>
    </div>
  )
}
