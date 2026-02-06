import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, PhoneOff, Mic } from "lucide-react";

interface VoiceCallModalProps {
  open: boolean;
  onClose: () => void;
  role: string;
}

const VoiceCallModal = ({ open, onClose, role }: VoiceCallModalProps) => {
  const [status, setStatus] = useState<"connecting" | "active" | "ended">("connecting");

  useEffect(() => {
    if (open) {
      setStatus("connecting");
      const timer = setTimeout(() => setStatus("active"), 2000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleEnd = () => {
    setStatus("ended");
    setTimeout(onClose, 500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/30 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Voice call interface"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="glass-card rounded-2xl p-8 md:p-10 max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated circle */}
            <div className="relative mx-auto w-28 h-28 mb-6">
              <div className={`absolute inset-0 rounded-full gradient-cta ${status === "active" ? "animate-pulse-soft" : ""}`} />
              {status === "active" && (
                <>
                  <div className="absolute inset-0 rounded-full gradient-cta opacity-30 animate-ping" style={{ animationDuration: "2s" }} />
                </>
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                {status === "connecting" ? (
                  <Phone size={32} className="text-primary-foreground" />
                ) : (
                  <Mic size={32} className="text-primary-foreground" />
                )}
              </div>
            </div>

            <h3 className="text-xl font-bold text-foreground mb-1">
              {status === "connecting" ? "Connecting..." : status === "active" ? "Voice Call Active" : "Call Ended"}
            </h3>
            <p className="text-sm text-muted-foreground mb-6 capitalize">
              {role.replace("-", " ")} Assistant
            </p>

            {/* Voice wave */}
            {status === "active" && (
              <div className="flex items-end justify-center gap-[3px] h-8 mb-6">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-[3px] rounded-full bg-primary animate-voice-wave"
                    style={{
                      height: `${Math.random() * 60 + 40}%`,
                      animationDelay: `${i * 0.08}s`,
                    }}
                  />
                ))}
              </div>
            )}

            {status !== "ended" && (
              <Button
                variant="destructive"
                size="lg"
                onClick={handleEnd}
                className="gap-2 rounded-full"
                aria-label="End call"
              >
                <PhoneOff size={16} />
                End Call
              </Button>
            )}

            <p className="text-xs text-muted-foreground mt-4">
              {status === "connecting"
                ? "Setting up your voice session..."
                : status === "active"
                  ? "Speak naturally — the AI is listening"
                  : "Thanks for trying VoiceX!"}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceCallModal;
