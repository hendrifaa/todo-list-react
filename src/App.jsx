import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import TodoList from './components/TodoList.jsx'
import TodoDetail from './components/TodoDetail.jsx'
import TodoForm from './components/TodoForm.jsx'
import ConfirmDialog from './components/ConfirmDialog.jsx'

const INITIAL_TODOS = [
  {
    id: 1,
    title: 'Mengerjakan Proyek Computer Vision',
    description: 'Menyelesaikan proyek akhir computer vision tentang deteksi penggunaan helm',
    priority: 'high',
    deadline: '2026-10-11',
    status: 'in progress',
  },
  {
    id: 2,
    title: 'Mempelajari Dasar Zustand',
    description: 'Mempelajari konsep dasar state management Zustand untuk keperluan proyek',
    priority: 'low',
    deadline: '2026-11-25',
    status: 'in progress',
  },
  {
    id: 3,
    title: 'Membuat Website Portfolio',
    description: 'Membuat website portofolio pribadi menggunakan React dan Vite',
    priority: 'low',
    deadline: '2026-10-20',
    status: 'in progress',
  },
  {
    id: 4,
    title: 'Mempelajari React Hooks',
    description: 'Mempelajari penggunaan useState, useEffect, dan custom hooks',
    priority: 'low',
    deadline: '2026-10-11',
    status: 'to-do',
  },
]

export default function App() {
  const [todos, setTodos] = useState(INITIAL_TODOS)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [toast, setToast] = useState('')
  const navigate = useNavigate()

  const notify = (message) => {
    setToast(message)
    window.clearTimeout(notify.timer)
    notify.timer = window.setTimeout(() => setToast(''), 2500)
  }

  const handleAdd = (data) => {
    const nextId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1
    setTodos([...todos, { ...data, id: nextId }])
    setShowForm(false)
    notify('Tugas berhasil ditambahkan')
  }

  const handleUpdate = (data) => {
    setTodos(todos.map((t) => (t.id === editing.id ? { ...t, ...data } : t.id)))
    setEditing(null)
    notify('Tugas berhasil diperbarui')
  }

  const handleDelete = () => {
    setTodos(todos.filter((t) => t.id !== deleting.id))
    if (window.location.pathname === `/todo/${deleting.id}`) navigate('/')
    setDeleting(null)
    notify('Tugas berhasil dihapus')
  }

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <TodoList
              todos={todos}
              onAdd={() => setShowForm(true)}
              onEdit={(todo) => setEditing(todo)}
              onDelete={(todo) => setDeleting(todo)}
            />
          }
        />
        <Route
          path="/todo/:id"
          element={
            <TodoDetail
              todos={todos}
              onEdit={(todo) => setEditing(todo)}
              onDelete={(todo) => setDeleting(todo)}
            />
          }
        />
      </Routes>

      {showForm && (
        <TodoForm
          mode="add"
          onSubmit={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editing && (
        <TodoForm
          mode="edit"
          initial={editing}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(null)}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title="Hapus Tugas"
          message={`Apakah kamu yakin ingin menghapus tugas "${deleting.title}"?`}
          confirmLabel="Hapus"
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
        />
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
