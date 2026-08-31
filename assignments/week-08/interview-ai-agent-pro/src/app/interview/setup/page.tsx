import { InterviewSetupForm } from "@/components/features/interview/InterviewSetupForm";

export default function InterviewSetupPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-3xl">Set Up Interview</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Configure your interview parameters and let the AI tailor questions to your profile.
        </p>
      </div>
      <InterviewSetupForm />
    </div>
  );
}
