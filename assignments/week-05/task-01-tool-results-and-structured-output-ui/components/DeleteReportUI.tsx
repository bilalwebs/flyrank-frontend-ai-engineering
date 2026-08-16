type DeleteInput = { domain: string; reportId: string };
type DeleteOutput = {
  domain: string;
  reportId: string;
  deleted: boolean;
  deletedAt: string;
};

export function DeleteApprovalPrompt({
  input,
  onRespond,
}: {
  input: DeleteInput;
  onRespond: (approved: boolean) => void;
}) {
  return (
    <div className="w-full max-w-md rounded-xl border border-red-200 bg-red-50 p-4">
      <p className="text-sm text-red-800">
        Delete audit report <strong>{input.reportId}</strong> for{' '}
        <strong>{input.domain}</strong>? This cannot be undone.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => onRespond(true)}
          className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
        >
          Confirm delete
        </button>
        <button
          onClick={() => onRespond(false)}
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export function DeleteResultCard({ result }: { result: DeleteOutput }) {
  return (
    <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-800">
        🗑️ Report <strong>{result.reportId}</strong> for{' '}
        <strong>{result.domain}</strong> was deleted.
      </p>
      <p className="mt-1 text-xs text-gray-500">
        {new Date(result.deletedAt).toLocaleString()}
      </p>
    </div>
  );
}
