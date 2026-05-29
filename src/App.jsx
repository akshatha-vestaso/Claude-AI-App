import { useState, useEffect } from 'react'
import Column from './components/Column'
import Modal from './components/Modal'
import Cursor from './components/Cursor'
import { COLUMNS, uid } from './constants'

const INITIAL_CARDS = {
  backlog: [], todo: [], inprogress: [], review: [], done: [],
}

export default function App() {
  const [cards, setCards]       = useState(INITIAL_CARDS)
  const [modal, setModal]       = useState(null)
  const [dragInfo, setDragInfo] = useState(null)
  const [dragOver, setDragOver] = useState(null)

  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') setModal(null) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  const openAdd  = col         => setModal({ col, card: null })
  const openEdit = (col, card) => setModal({ col, card })

  const saveCard = form => {
    const { col, card } = modal
    setCards(prev => {
      const list = [...prev[col]]
      if (card) {
        const i = list.findIndex(c => c.id === card.id)
        if (i > -1) list[i] = { ...card, ...form }
      } else {
        list.push({ id: uid(), ...form })
      }
      return { ...prev, [col]: list }
    })
    setModal(null)
  }

  const deleteCard = (col, id) =>
    setCards(prev => ({ ...prev, [col]: prev[col].filter(c => c.id !== id) }))

  const handleDragStart = (col, id) => setDragInfo({ col, id })

  const handleDragOver = (e, colId) => {
    e.preventDefault()
    if (dragOver !== colId) setDragOver(colId)
  }

  const handleDrop = (e, toCol) => {
    e.preventDefault()
    setDragOver(null)
    if (!dragInfo || dragInfo.col === toCol) return
    setCards(prev => {
      const from = [...prev[dragInfo.col]]
      const idx  = from.findIndex(c => c.id === dragInfo.id)
      if (idx < 0) return prev
      const [moved] = from.splice(idx, 1)
      return { ...prev, [dragInfo.col]: from, [toCol]: [...prev[toCol], moved] }
    })
    setDragInfo(null)
  }

  return (
    <div className="min-h-screen relative" style={{ cursor: 'none' }}>

      {/* ── Custom cursor ── */}
      <Cursor />

      {/* ── Background gradient ── */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: 'linear-gradient(135deg, #e0e7ff 0%, #f0f4ff 30%, #dbeafe 60%, #ede9fe 100%)',
        }}
      />

      {/* ── Decorative blobs ── */}
      <div
        className="fixed -z-10 rounded-full"
        style={{
          width: 500, height: 500,
          top: -100, left: -100,
          background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="fixed -z-10 rounded-full"
        style={{
          width: 600, height: 600,
          bottom: -150, right: -100,
          background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="fixed -z-10 rounded-full"
        style={{
          width: 400, height: 400,
          top: '40%', left: '50%',
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ── Header ── */}
      <header
        className="px-8 py-5 flex items-center gap-3"
        style={{
          background: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.7)',
          boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
        }}
      >
        <div className="w-9 h-9 bg-[#1a1d23] rounded-lg flex items-center justify-center text-white text-lg shrink-0">
          📋
        </div>
        <div>
          <div className="text-xl font-bold text-[#1a1d23]">Work Tracker</div>
          <div className="text-xs text-gray-400 mt-0.5">Organize what was done and how it was done</div>
        </div>
      </header>

      {/* ── Board ── */}
      <div className="flex gap-4 p-7 overflow-x-auto min-h-[calc(100vh-82px)] items-start">
        {COLUMNS.map(col => (
          <Column
            key={col.id}
            col={col}
            cards={cards[col.id]}
            dragOver={dragOver === col.id}
            onDragOver={e => handleDragOver(e, col.id)}
            onDragLeave={() => setDragOver(null)}
            onDrop={e => handleDrop(e, col.id)}
            onAddCard={openAdd}
            onEditCard={openEdit}
            onDeleteCard={deleteCard}
            onDragStart={handleDragStart}
          />
        ))}
      </div>

      {modal && (
        <Modal modal={modal} onClose={() => setModal(null)} onSave={saveCard} />
      )}
    </div>
  )
}
