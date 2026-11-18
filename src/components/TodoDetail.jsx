import { useParams, useNavigate, Link } from 'react-router-dom'

export default function TodoDetail({ todos, onEdit, onDelete }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const todo = todos.find((t) => t.id === Number(id))

  if (!todo) {
    return (
      <>
        <Link className="back-link" to="/">
          ← Kembali ke daftar
        </Link>
        <div className="empty">Tugas tidak ditemukan.</div>
      </>
    )
  }

  return (
    <>
      <Link className="back-link" to="/">
        ← Kembali ke daftar
      </Link>

      <div className="detail-card">
        <div className="detail-main">
          <h3>Judul</h3>
          <p>{todo.title}</p>

          <h3>Deskripsi</h3>
          <p>{todo.description || '—'}</p>
        </div>

        <div className="detail-side">
          <div className="meta">
            <div className="label">Status</div>
            <div className="value">{todo.status}</div>
          </div>
          <div className="meta">
            <div className="label">Prioritas</div>
            <div className="value">{todo.priority}</div>
          </div>
          <div className="meta">
            <div className="label">Deadline</div>
            <div className="value">{todo.deadline}</div>
          </div>

          <div className="detail-actions">
            <button className="btn btn-danger" onClick={() => navigate('/')}>
              Kembali
            </button>
            <button className="btn btn-primary" onClick={() => onEdit(todo)}>
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
