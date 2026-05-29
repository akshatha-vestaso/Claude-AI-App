export const COLUMNS = [
  {
    id: 'backlog',
    label: 'Backlog',
    color: '#94a3b8',
    glass: 'rgba(148,163,184,0.08)',
    glassBorder: 'rgba(148,163,184,0.22)',
    glassHighlight: 'rgba(148,163,184,0.06)',
  },
  {
    id: 'todo',
    label: 'Todo',
    color: '#3b82f6',
    glass: 'rgba(59,130,246,0.07)',
    glassBorder: 'rgba(59,130,246,0.2)',
    glassHighlight: 'rgba(59,130,246,0.05)',
  },
  {
    id: 'inprogress',
    label: 'In Progress',
    color: '#f59e0b',
    glass: 'rgba(245,158,11,0.07)',
    glassBorder: 'rgba(245,158,11,0.2)',
    glassHighlight: 'rgba(245,158,11,0.05)',
  },
  {
    id: 'review',
    label: 'Review',
    color: '#8b5cf6',
    glass: 'rgba(139,92,246,0.07)',
    glassBorder: 'rgba(139,92,246,0.2)',
    glassHighlight: 'rgba(139,92,246,0.05)',
  },
  {
    id: 'done',
    label: 'Done',
    color: '#22c55e',
    glass: 'rgba(34,197,94,0.07)',
    glassBorder: 'rgba(34,197,94,0.2)',
    glassHighlight: 'rgba(34,197,94,0.05)',
  },
]

export const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36)
