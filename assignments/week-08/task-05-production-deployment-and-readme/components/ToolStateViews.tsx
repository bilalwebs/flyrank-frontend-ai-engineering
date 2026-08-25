export function ToolInputStreaming({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-500">
      <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400" />
      {label}
    </div>
  );
}

export function ToolInputAvailable({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-700">
      <span className="h-2 w-2 animate-ping rounded-full bg-blue-500" />
      {label}
    </div>
  );
}

export function ToolOutputError({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
      <span aria-hidden className="mt-0.5">⚠️</span>
      <span>
        <strong>Tool failed:</strong> {message}
      </span>
    </div>
  );
}

export function ToolOutputDenied({ reason }: { reason?: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
      <span aria-hidden>🚫</span>
      Action was not approved{reason ? `: ${reason}` : '.'}
    </div>
  );
}
