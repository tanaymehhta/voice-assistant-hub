import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PhoneOff, ArrowLeft, Clock, Calendar, Mic, MicOff } from "lucide-react";

interface VoiceDashboardProps {
  open: boolean;
  onClose: () => void;
}

interface TranscriptEntry {
  id: number;
  sender: "user" | "assistant";
  text: string;
  timestamp: number;
  responseTime?: number;
}

const TOTAL_SECONDS = 120;
const WARNING_SECONDS = 30;
const CALENDLY_URL = "https://calendly.com";

const mockConversation: { sender: "user" | "assistant"; text: string; delay: number; responseTime?: number }[] = [
  { sender: "assistant", text: "Good evening! Welcome to The Grand Hotel. How may I assist you today?", delay: 2000 },
  { sender: "user", text: "Hi, I'd like to book a room for this Friday and Saturday.", delay: 6000 },
  { sender: "assistant", text: "Of course! I'd be happy to help with that. How many guests will be staying, and do you have a room type preference?", delay: 8500, responseTime: 1.2 },
  { sender: "user", text: "Two guests. A king bed would be great if you have one.", delay: 14000 },
  { sender: "assistant", text: "Wonderful! We have a King Deluxe Suite available for Friday and Saturday at $189 per night. It includes complimentary breakfast and late checkout. Shall I reserve that for you?", delay: 16500, responseTime: 0.9 },
  { sender: "user", text: "That sounds perfect. Can I also get a room with a city view?", delay: 23000 },
  { sender: "assistant", text: "Let me check our city-view inventory... Great news — we have one King Deluxe with a panoramic city view on the 12th floor. It's $219 per night. Would you prefer that instead?", delay: 25500, responseTime: 1.4 },
  { sender: "user", text: "Yes, let's go with the city view.", delay: 32000 },
  { sender: "assistant", text: "Excellent choice! I've reserved the King Deluxe City View for two nights. Could I get your name and email to confirm the booking?", delay: 34000, responseTime: 0.8 },
];

const VoiceDashboard = ({ open, onClose }: VoiceDashboardProps) => {
  const [status, setStatus] = useState<"connecting" | "active" | "ended">("connecting");
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mockRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const entryIdRef = useRef(0);

  const cleanup = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    mockRef.current.forEach(clearTimeout);
    mockRef.current = [];
  }, []);

  // Start session when opened
  useEffect(() => {
    if (open) {
      setStatus("connecting");
      setTimeLeft(TOTAL_SECONDS);
      setTranscript([]);
      setIsMuted(false);
      setShowCalendly(false);
      entryIdRef.current = 0;

      const connectTimer = setTimeout(() => {
        setStatus("active");
      }, 1800);

      return () => {
        clearTimeout(connectTimer);
        cleanup();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Timer countdown
  useEffect(() => {
    if (status === "active") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // Mock conversation playback
  useEffect(() => {
    if (status === "active") {
      mockConversation.forEach((msg) => {
        const timer = setTimeout(() => {
          const entry: TranscriptEntry = {
            id: entryIdRef.current++,
            sender: msg.sender,
            text: msg.text,
            timestamp: Date.now(),
            responseTime: msg.responseTime,
          };
          setTranscript((prev) => [...prev, entry]);
        }, msg.delay);
        mockRef.current.push(timer);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // Auto-scroll transcript
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  const handleEnd = useCallback(() => {
    cleanup();
    setStatus("ended");
    setTimeout(() => setShowCalendly(true), 600);
  }, [cleanup]);

  const handleClose = () => {
    cleanup();
    setStatus("connecting");
    onClose();
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const isWarning = timeLeft <= WARNING_SECONDS && timeLeft > 0 && status === "active";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-background"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 md:px-8 h-16 border-b border-border/40">
            <button
              onClick={handleClose}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Back to landing page"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium hidden sm:inline">Back</span>
            </button>

            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${status === "active" ? "bg-green-500 animate-pulse" : status === "connecting" ? "bg-yellow-500 animate-pulse" : "bg-muted-foreground"}`} />
              <span className="text-sm font-medium text-foreground">
                {status === "connecting" ? "Connecting..." : status === "active" ? "Hotel Receptionist" : "Call Ended"}
              </span>
            </div>

            <div className={`flex items-center gap-1.5 font-mono text-sm font-semibold ${isWarning ? "text-destructive" : "text-muted-foreground"}`}>
              <Clock size={14} />
              <span className={isWarning ? "animate-pulse" : ""}>{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
            {/* Left: Transcript panel */}
            <div className="flex-1 flex flex-col border-r border-border/40 min-h-0">
              <div className="px-5 py-4 border-b border-border/20">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Live Transcript</h2>
              </div>

              <div ref={transcriptRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4 min-h-0">
                {status === "connecting" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center h-full"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-cta animate-pulse-soft flex items-center justify-center">
                        <Mic size={24} className="text-primary-foreground" />
                      </div>
                      <p className="text-muted-foreground">Setting up your voice session...</p>
                    </div>
                  </motion.div>
                )}

                {transcript.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${entry.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[85%] md:max-w-[75%] ${entry.sender === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                      <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        entry.sender === "user"
                          ? "bg-secondary text-secondary-foreground rounded-br-md"
                          : "gradient-cta text-primary-foreground rounded-bl-md"
                      }`}>
                        {entry.text}
                      </div>
                      {entry.responseTime && (
                        <span className="text-xs text-muted-foreground px-1 flex items-center gap-1">
                          <Clock size={10} />
                          {entry.responseTime}s response
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Warning banner */}
                <AnimatePresence>
                  {isWarning && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3 text-center"
                    >
                      <p className="text-sm font-medium text-destructive">
                        ⏱ Last {timeLeft} seconds of your free trial
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom controls */}
              {status === "active" && (
                <div className="px-5 py-4 border-t border-border/20 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isMuted ? "bg-destructive/10 text-destructive" : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                      }`}
                      aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
                    >
                      {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
                    </button>

                    {/* Voice wave indicator */}
                    {!isMuted && (
                      <div className="flex items-end gap-[2px] h-5">
                        {[0.3, 0.7, 1, 0.6, 0.9, 0.4, 0.8].map((h, i) => (
                          <div
                            key={i}
                            className="w-[3px] rounded-full bg-primary animate-voice-wave"
                            style={{ height: `${h * 100}%`, animationDelay: `${i * 0.12}s` }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <Button variant="destructive" size="default" onClick={handleEnd} className="gap-2 rounded-full">
                    <PhoneOff size={15} />
                    End Call
                  </Button>
                </div>
              )}
            </div>

            {/* Right: Stats panel */}
            <div className="w-full lg:w-80 xl:w-96 flex flex-col border-t lg:border-t-0 bg-accent/30">
              <div className="px-5 py-4 border-b border-border/20">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Session Stats</h2>
              </div>

              <div className="flex-1 p-5 space-y-5 overflow-y-auto">
                {/* Timer card */}
                <div className="glass-card rounded-xl p-5">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Time Remaining</p>
                  <p className={`text-3xl font-bold font-mono ${isWarning ? "text-destructive" : "text-foreground"}`}>
                    {formatTime(timeLeft)}
                  </p>
                  {/* Progress bar */}
                  <div className="mt-3 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${isWarning ? "bg-destructive" : "gradient-cta"}`}
                      initial={{ width: "100%" }}
                      animate={{ width: `${(timeLeft / TOTAL_SECONDS) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Response time card */}
                <div className="glass-card rounded-xl p-5">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Avg Response Time</p>
                  <p className="text-3xl font-bold text-foreground">
                    {transcript.filter((t) => t.responseTime).length > 0
                      ? `${(
                          transcript
                            .filter((t) => t.responseTime)
                            .reduce((sum, t) => sum + (t.responseTime || 0), 0) /
                          transcript.filter((t) => t.responseTime).length
                        ).toFixed(1)}s`
                      : "—"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Real-time AI processing</p>
                </div>

                {/* Messages count */}
                <div className="glass-card rounded-xl p-5">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Messages</p>
                  <div className="flex items-baseline gap-4">
                    <div>
                      <p className="text-2xl font-bold text-foreground">{transcript.filter((t) => t.sender === "assistant").length}</p>
                      <p className="text-xs text-muted-foreground">AI responses</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{transcript.filter((t) => t.sender === "user").length}</p>
                      <p className="text-xs text-muted-foreground">Your messages</p>
                    </div>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="glass-card rounded-xl p-5">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Connection</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      status === "active" ? "bg-green-500" : status === "connecting" ? "bg-yellow-500 animate-pulse" : "bg-muted-foreground"
                    }`} />
                    <span className="text-sm font-medium text-foreground capitalize">{status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ended overlay with Calendly CTA */}
          <AnimatePresence>
            {showCalendly && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 bg-background/90 backdrop-blur-md flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300, delay: 0.1 }}
                  className="glass-card rounded-2xl p-8 md:p-12 max-w-md w-full text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-accent flex items-center justify-center">
                    <Calendar size={28} className="text-accent-foreground" />
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-2">Thanks for trying VoiceX!</h3>
                  <p className="text-muted-foreground mb-2 text-sm">
                    You experienced how our AI handles hotel reception calls naturally and professionally.
                  </p>

                  {/* Quick stats */}
                  <div className="flex justify-center gap-6 my-5 py-4 border-y border-border/30">
                    <div>
                      <p className="text-lg font-bold text-foreground">{transcript.length}</p>
                      <p className="text-xs text-muted-foreground">Messages</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">
                        {transcript.filter((t) => t.responseTime).length > 0
                          ? `${(
                              transcript
                                .filter((t) => t.responseTime)
                                .reduce((sum, t) => sum + (t.responseTime || 0), 0) /
                              transcript.filter((t) => t.responseTime).length
                            ).toFixed(1)}s`
                          : "—"}
                      </p>
                      <p className="text-xs text-muted-foreground">Avg Response</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">{formatTime(TOTAL_SECONDS - timeLeft)}</p>
                      <p className="text-xs text-muted-foreground">Duration</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-6">
                    Ready to set this up for your business?
                  </p>

                  <Button variant="hero" size="xl" className="w-full gap-2 mb-3" asChild>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      <Calendar size={18} />
                      Book Your Setup Call
                    </a>
                  </Button>

                  <Button variant="ghost" size="default" onClick={handleClose} className="text-muted-foreground">
                    Back to homepage
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceDashboard;
