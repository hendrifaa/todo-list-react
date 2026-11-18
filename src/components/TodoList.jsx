import { useNavigate } from 'react-router-dom'

export default function TodoList({ todos, onAdd, onEdit, onDelete }) {
  const navigate = useNavigate()

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Todo List</h1>
        <button className="btn btn-primary" onClick={onAdd}>
          Tambah Todo
        </button>
      </div>

      {todos.length === 0 ? (
        <div className="empty">Belum ada tugas. Klik "Tambah Todo" untuk menambahkan.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th className="col-title">Judul</th>
              <th className="col-status">Status</th>
              <th className="col-priority">Prioritas</th>
              <th className="col-deadline">Deadline</th>
              <th className="col-action">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td title={todo.title}>{todo.title}</td>
                <td>{todo.status}</td>
                <td>{todo.priority}</td>
                <td>{todo.deadline}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="icon-btn view"
                      title="Lihat detail"
                      onClick={() => navigate(`/todo/${todo.id}`)}
                    >
                      👁
                    </button>
                    <button
                      className="icon-btn delete"
                      title="Hapus tugas"
                      onClick={() => onDelete(todo)}
                    >
                      🗑
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
