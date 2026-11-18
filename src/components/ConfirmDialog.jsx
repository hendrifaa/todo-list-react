export default function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Hapus',
  onConfirm,
  onCancel,
}) {
  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal">
        <h2 className="modal-title">{title}</h2>
        <p style={{ fontSize: 14, textAlign: 'center', margin: '0 0 6px', color: '#374151' }}>
          {message}
        </p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Batal
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
