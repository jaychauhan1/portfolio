import { motion } from 'framer-motion'

interface IntroOverlayProps {
  onComplete: () => void
}

export function IntroOverlay({ onComplete }: IntroOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.2, duration: 0.8 }}
      onAnimationComplete={() => onComplete()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <button
        type="button"
        onClick={onComplete}
        className="absolute bottom-12 right-6 font-sans text-xs tracking-widest text-muted transition hover:text-text md:right-20 md:top-20"
      >
        Skip
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <p className="font-serif text-sm tracking-[0.4em] text-accent uppercase">Lighting candle</p>
        <div className="mx-auto mt-6 h-px w-16 bg-accent/40" />
      </motion.div>
    </motion.div>
  )
}
