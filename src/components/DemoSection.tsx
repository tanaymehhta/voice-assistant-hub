import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mic, Phone } from "lucide-react";
import VoiceCallModal from "./VoiceCallModal";

type Role = "hotel" | "restaurant" | "retail" | "service";

interface RoleContent {
  title: string;
  description: string;
  conversation: { sender: "caller" | "assistant"; text: string }[];
}

const roles: { key: Role; label: string }[] = [
  { key: "hotel", label: "Hotel Reception" },
  { key: "restaurant", label: "Restaurant Reservations" },
  { key: "retail", label: "Retail Support" },
  { key: "service", label: "Service Business" },
];

const roleContent: Record<Role, RoleContent> = {
  hotel: {
    title: "Hotel Front Desk Assistant",
    description: "Handles room bookings, check-in inquiries, amenity questions, and concierge requests—so your staff can focus on in-person guests.",
    conversation: [
      { sender: "caller", text: "Hi, I'd like to book a room for this weekend." },
      { sender: "assistant", text: "Of course! I'd be happy to help. How many guests will be staying, and do you have a room preference?" },
      { sender: "caller", text: "Two guests, a king bed if possible." },
      { sender: "assistant", text: "Great news—we have a King Deluxe available Saturday and Sunday at $189/night. Shall I reserve it for you?" },
    ],
  },
  restaurant: {
    title: "Restaurant Reservation Agent",
    description: "Takes reservations, answers menu questions, handles dietary requests, and manages waitlists—all without putting callers on hold.",
    conversation: [
      { sender: "caller", text: "I'd like a table for 4 tonight at 7pm." },
      { sender: "assistant", text: "Let me check availability... We have a table for 4 at 7:15pm. Would that work for you?" },
      { sender: "caller", text: "That's perfect. Also, one guest is gluten-free." },
      { sender: "assistant", text: "Noted! We have several gluten-free options. I've reserved the table under your name. See you tonight!" },
    ],
  },
  retail: {
    title: "Retail Customer Support",
    description: "Answers product queries, checks stock availability, handles return policies, and directs customers—keeping your shop running smoothly.",
    conversation: [
      { sender: "caller", text: "Do you have the blue running shoes in size 10?" },
      { sender: "assistant", text: "Let me check our inventory... Yes, we have the Nike Air Zoom in blue, size 10, in stock!" },
      { sender: "caller", text: "Can I reserve them for pickup?" },
      { sender: "assistant", text: "Absolutely! I've reserved them for 24 hours. Just ask for them at the counter when you arrive." },
    ],
  },
  service: {
    title: "Service Business Scheduler",
    description: "Manages appointment bookings, provides service details, handles rescheduling—so you can stay focused on delivering great service.",
    conversation: [
      { sender: "caller", text: "I need to schedule a plumbing inspection." },
      { sender: "assistant", text: "Sure! We have availability tomorrow at 10am or Thursday at 2pm. Which works better?" },
      { sender: "caller", text: "Tomorrow at 10 works great." },
      { sender: "assistant", text: "Perfect, you're all set for tomorrow at 10am. We'll send a confirmation text shortly!" },
    ],
  },
};

const DemoSection = () => {
  const [activeRole, setActiveRole] = useState<Role>("hotel");
  const [callModalOpen, setCallModalOpen] = useState(false);
  const content = roleContent[activeRole];

  return (
    <section id="demo" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Experience It <span className="text-gradient">Live</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Choose a business type and see how VoiceX handles calls naturally.
          </p>
        </motion.div>

        {/* Role selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {roles.map((role) => (
            <button
              key={role.key}
              onClick={() => setActiveRole(role.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeRole === role.key
                  ? "gradient-cta text-primary-foreground shadow-lg"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
              }`}
              aria-pressed={activeRole === role.key}
              aria-label={`Select ${role.label} demo`}
            >
              {role.label}
            </button>
          ))}
        </motion.div>

        {/* Demo card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-6 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold text-foreground mb-2">{content.title}</h3>
                <p className="text-muted-foreground mb-6">{content.description}</p>

                {/* Conversation */}
                <div className="space-y-3 mb-8">
                  {content.conversation.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: msg.sender === "caller" ? -10 : 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                      className={`flex ${msg.sender === "caller" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                          msg.sender === "caller"
                            ? "bg-secondary text-secondary-foreground rounded-bl-md"
                            : "gradient-cta text-primary-foreground rounded-br-md"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Voice wave indicator + Test button */}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="flex items-end gap-[2px] h-5">
                      {[0.3, 0.6, 0.9, 0.5, 0.8, 0.4, 0.7].map((h, i) => (
                        <div
                          key={i}
                          className="w-[3px] rounded-full bg-primary animate-voice-wave"
                          style={{ height: `${h * 100}%`, animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">Voice AI Active</span>
                  </div>
                  <Button variant="hero" size="lg" onClick={() => setCallModalOpen(true)} className="gap-2">
                    <Mic size={16} />
                    Test Live
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <VoiceCallModal
        open={callModalOpen}
        onClose={() => setCallModalOpen(false)}
        role={activeRole}
      />
    </section>
  );
};

export default DemoSection;
