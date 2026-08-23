"use client";

import { motion } from "framer-motion";
import { SmartButton } from "@/components/Button";
import { Zap, Send, Save, RotateCcw, Download, Heart } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

function GlassCard({
  title,
  description,
  children,
  index,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
    >
      <h3 className="mb-1 text-lg font-semibold text-white">{title}</h3>
      <p className="mb-6 text-sm text-gray-400">{description}</p>
      {children}
    </motion.div>
  );
}

function ActionDemoSection() {
  return (
    <GlassCard
      title="Primary Actions"
      description="Core action buttons with smart state flow"
      index={0}
    >
      <div className="flex flex-wrap items-center gap-4">
        <SmartButton
          label="Generate AI Response"
          successLabel="Generated!"
          errorLabel="Failed"
          icon={Zap}
          variant="primary"
          size="lg"
          ariaLabel="Generate an AI response"
        />
        <SmartButton
          label="Send Message"
          successLabel="Sent!"
          errorLabel="Not sent"
          icon={Send}
          variant="primary"
          ariaLabel="Send a message"
        />
        <SmartButton
          label="Save Project"
          successLabel="Saved!"
          errorLabel="Save failed"
          icon={Save}
          variant="primary"
          ariaLabel="Save the project"
        />
      </div>
    </GlassCard>
  );
}

function VariantDemoSection() {
  return (
    <GlassCard
      title="Button Variants"
      description="Different visual styles sharing the same motion language"
      index={1}
    >
      <div className="flex flex-wrap items-center gap-4">
        <SmartButton
          label="Primary"
          icon={Zap}
          variant="primary"
          ariaLabel="Primary variant demo"
        />
        <SmartButton
          label="Secondary"
          icon={Download}
          variant="secondary"
          ariaLabel="Secondary variant demo"
        />
        <SmartButton
          label="Danger"
          icon={Heart}
          variant="danger"
          ariaLabel="Danger variant demo"
        />
      </div>
    </GlassCard>
  );
}

function SizeDemoSection() {
  return (
    <GlassCard
      title="Button Sizes"
      description="Consistent proportions across all sizes"
      index={2}
    >
      <div className="flex flex-wrap items-center gap-4">
        <SmartButton
          label="Small"
          variant="primary"
          size="sm"
          ariaLabel="Small button demo"
        />
        <SmartButton
          label="Medium"
          variant="primary"
          size="md"
          ariaLabel="Medium button demo"
        />
        <SmartButton
          label="Large"
          variant="primary"
          size="lg"
          ariaLabel="Large button demo"
        />
      </div>
    </GlassCard>
  );
}

function DisabledDemoSection() {
  return (
    <GlassCard
      title="Disabled State"
      description="Buttons can be disabled externally"
      index={3}
    >
      <div className="flex flex-wrap items-center gap-4">
        <SmartButton
          label="Disabled"
          variant="primary"
          disabled
          ariaLabel="Disabled primary button"
        />
        <SmartButton
          label="Disabled"
          variant="secondary"
          disabled
          ariaLabel="Disabled secondary button"
        />
        <SmartButton
          label="Disabled"
          variant="danger"
          disabled
          ariaLabel="Disabled danger button"
        />
      </div>
    </GlassCard>
  );
}

function RetryDemoSection() {
  return (
    <GlassCard
      title="Retry on Error"
      description="Error state automatically resets to idle for retry"
      index={4}
    >
      <div className="flex flex-wrap items-center gap-4">
        <SmartButton
          label="Try Your Luck"
          successLabel="You won!"
          errorLabel="Try again"
          icon={RotateCcw}
          variant="primary"
          ariaLabel="Try your luck button"
        />
      </div>
    </GlassCard>
  );
}

export function ButtonShowcase() {
  return (
    <div className="mx-auto grid max-w-4xl gap-6">
      <ActionDemoSection />
      <div className="grid gap-6 md:grid-cols-2">
        <VariantDemoSection />
        <SizeDemoSection />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <DisabledDemoSection />
        <RetryDemoSection />
      </div>
    </div>
  );
}
