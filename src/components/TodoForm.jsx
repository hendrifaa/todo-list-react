import { useState } from 'react'

const STATUS_OPTIONS = ['to-do', 'in progress', 'done']
const PRIORITY_OPTIONS = ['low', 'medium', 'high']

const EMPTY = {
  title: '',
  description: '',
  status: 'to-do',
  priority: 'low',
  deadline: '',
}

export default function TodoForm({ mode, initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial ? { ...initial } : EMPTY)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('Judul wajib diisi')
      return
    }
    if (!form.deadline) {
      setError('Deadline wajib diisi')
      return
    }
    onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
      priority: form.priority,
      deadline: form.deadline,
    })
  }

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <form className="modal" onSubmit={handleSubmit}>
        <h2 className="modal-title">{mode === 'add' ? 'Tambah Todo' : 'Update Todo'}</h2>

        <div className="field">
          <label htmlFor="title">Judul</label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            autoFocus
          />
        </div>

        <div className="field">
          <label htmlFor="description">Deskripsi</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={form.status} onChange={handleChange}>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="priority">Prioritas</label>
            <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
              {PRIORITY_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="deadline">Deadline</label>
          <input
            id="deadline"
            name="deadline"
            type="date"
            value={form.deadline}
            onChange={handleChange}
          />
        </div>

        {error && <p style={{ color: '#dc2626', fontSize: 13, margin: '0 0 4px' }}>{error}</p>}

        <div className="modal-actions">
          <button type="button" className="btn btn-danger" onClick={onCancel}>
            Batal
          </button>
          <button type="submit" className="btn btn-primary">
            {mode === 'add' ? 'Tambah' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  )
}
