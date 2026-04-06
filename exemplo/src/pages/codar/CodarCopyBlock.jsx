import { useState } from 'react'

export function CopyBlock({ label, command }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(command.trim())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="mb-3">
      {label ? <div className="small fw-semibold text-body-secondary mb-1">{label}</div> : null}
      <div className="d-flex flex-wrap align-items-stretch gap-2">
        <pre className="flex-grow-1 mb-0 small font-monospace bg-dark text-light p-3 rounded-3 overflow-x-auto">
          {command.trim()}
        </pre>
        <button
          type="button"
          className={`btn btn-sm align-self-start ${copied ? 'btn-success' : 'btn-outline-secondary'}`}
          onClick={copy}
        >
          {copied ? (
            <>
              <i className="bi bi-check2 me-1" aria-hidden />
              Copiado
            </>
          ) : (
            <>
              <i className="bi bi-clipboard me-1" aria-hidden />
              Copiar
            </>
          )}
        </button>
      </div>
    </div>
  )
}
