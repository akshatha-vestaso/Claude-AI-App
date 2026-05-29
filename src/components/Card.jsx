import { useState } from 'react'

export default function Card({ card, col, onEdit, onDelete, onDragStart }) {
  const [dragging, setDragging] = useState(false)

  return (
    <div
      className={`
        rounded-xl p-3 border cursor-grab group
        transition-all duration-200
        hover:-translate-y-0.5 hover:shadow-lg
        ${dragging ? 'opacity-40 cursor-grabbing scale-95' : ''}
      `}
      style={{
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.45)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)',
      }}
      draggable
      onDragStart={() => { setDragging(true); onDragStart(col, card.id) }}
      onDragEnd={() => setDragging(false)}
    >
      <div className="flex items-start justify-between gap-1.5">
        <span className="text-[13px] font-semibold text-[#1a1d23] leading-snug flex-1">
          {card.title}
        </span>
        <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0">
          <button
            className="px-1.5 py-1 rounded text-xs text-gray-500 hover:bg-white/60 hover:text-gray-700 transition-colors"
            onClick={() => onEdit(col, card)}
            title="Edit"
          >✏</button>
          <button
            className="px-1.5 py-1 rounded text-xs text-gray-500 hover:bg-red-100/70 hover:text-red-500 transition-colors"
            onClick={() => onDelete(col, card.id)}
            title="Delete"
          >✕</button>
        </div>
      </div>

      {card.desc && (
        <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{card.desc}</p>
      )}
      {card.how && (
        <div
          className="text-[11px] text-gray-500 mt-1.5 px-2 py-1.5 rounded"
          style={{ background: 'rgba(255,255,255,0.4)' }}
        >
          <strong className="text-gray-600 font-semibold">How:</strong> {card.how}
        </div>
      )}
    </div>
  )
}
