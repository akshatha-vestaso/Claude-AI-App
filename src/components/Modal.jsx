import { useState, useEffect, useRef } from 'react'
import { COLUMNS } from '../constants'

export default function Modal({ modal, onClose, onSave }) {
  const [form, setForm] = useState({
    title: modal.card?.title || '',
    desc:  modal.card?.desc  || '',
    how:   modal.card?.how   || '',
  })
  const [touched, setTouched] = useState(false)
  const inputRef = useRef(null)
  const col = COLUMNS.find(c => c.id === modal.col)

  useEffect(() => { inputRef.current?.focus() }, [])

  const handleSave = () => {
    setTouched(true)
    if (!form.title.trim()) return
    onSave(form)
  }

  const isError = touched && !form.title.trim()

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-[100] animate-fadeIn"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 w-[440px] max-w-[calc(100vw-40px)] z-[101] shadow-2xl flex flex-col gap-3 animate-slideUp">

        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#1a1d23]">
            {modal.card ? 'Edit Card' : `Add to ${col?.label}`}
          </h3>
          <button
            className="text-2xl leading-none text-gray-400 hover:text-gray-600 transition-colors"
            onClick={onClose}
          >×</button>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
            Title *
          </label>
          <input
            ref={inputRef}
            className={`w-full border-[1.5px] rounded-lg px-3 py-2.5 text-[13px] text-[#1a1d23] outline-none transition-colors ${
              isError
                ? 'border-red-400 bg-red-50'
                : 'border-gray-200 focus:border-blue-500'
            }`}
            placeholder="What is this card about?"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
            Description
          </label>
          <textarea
            className="w-full border-[1.5px] border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-[#1a1d23] outline-none focus:border-blue-500 transition-colors resize-y min-h-[74px]"
            placeholder="What was done? Describe the work…"
            value={form.desc}
            onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
            rows={3}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
            How it was done
          </label>
          <textarea
            className="w-full border-[1.5px] border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-[#1a1d23] outline-none focus:border-blue-500 transition-colors resize-y min-h-[74px]"
            placeholder="How was this accomplished? Tools, approach, notes…"
            value={form.how}
            onChange={e => setForm(f => ({ ...f, how: e.target.value }))}
            rows={3}
          />
        </div>

        <div className="flex gap-2 justify-end pt-1">
          <button
            className="bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2 text-[13px] font-medium text-gray-700 transition-colors"
            onClick={onClose}
          >Cancel</button>
          <button
            className="bg-[#1a1d23] hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg px-4 py-2 text-[13px] font-semibold text-white transition-colors"
            onClick={handleSave}
            disabled={isError}
          >
            {modal.card ? 'Save Changes' : 'Add Card'}
          </button>
        </div>
      </div>
    </>
  )
}
