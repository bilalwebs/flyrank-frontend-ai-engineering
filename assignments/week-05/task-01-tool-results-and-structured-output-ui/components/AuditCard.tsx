export type AuditResult = {
  domain: string;
  score: number;
  grade: 'A' | 'B' | 'C' | 'D';
  issues: string[];
  checkedAt: string;
};

const gradeColor: Record<AuditResult['grade'], string> = {
  A: 'bg-green-100 text-green-800 border-green-300',
  B: 'bg-blue-100 text-blue-800 border-blue-300',
  C: 'bg-amber-100 text-amber-800 border-amber-300',
  D: 'bg-red-100 text-red-800 border-red-300',
};

export function AuditCard({ result }: { result: AuditResult }) {
  return (
    <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">{result.domain}</h3>
        <span
          className={`rounded-full border px-2 py-0.5 text-xs font-bold ${gradeColor[result.grade]}`}
        >
          Grade {result.grade}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="relative h-16 w-16 shrink-0">
          <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
            <path
              className="text-gray-200"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-blue-500"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={`${result.score}, 100`}
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-800">
            {result.score}
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Checked {new Date(result.checkedAt).toLocaleString()}
        </p>
      </div>

      {result.issues.length > 0 ? (
        <ul className="mt-3 space-y-1">
          {result.issues.map((issue, i) => (
            <li key={i} className="flex items-start gap-1 text-xs text-gray-600">
              <span className="mt-0.5 text-red-500">•</span>
              {issue}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-xs text-green-600">No issues found. ✅</p>
      )}
    </div>
  );
}
