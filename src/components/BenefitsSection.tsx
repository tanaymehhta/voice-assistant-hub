import { motion } from "framer-motion";
import { Clock, MessageCircle, Zap, Globe, CalendarCheck, Settings2 } from "lucide-react";

const benefits = [
  { icon: Clock, title: "24/7 Availability", description: "Never miss a call, day or night. Your AI receptionist is always on." },
  { icon: MessageCircle, title: "Natural Conversations", description: "Human-like voice interactions that make callers feel heard and helped." },
  { icon: Zap, title: "Instant Setup", description: "Get started in minutes with no technical knowledge required." },
  { icon: Globe, title: "Multiple Languages", description: "Serve customers in their preferred language, automatically." },
  { icon: CalendarCheck, title: "Booking Integration", description: "Seamlessly handle reservations and appointments in real time." },
  { icon: Settings2, title: "Custom Responses", description: "Tailor the assistant to match your brand voice and business rules." },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Businesses Love <span className="text-gradient">VoiceX</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Everything you need to deliver exceptional phone experiences.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass-card-hover rounded-2xl p-6"
            >
              <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center mb-4">
                <benefit.icon size={20} className="text-accent-foreground" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-1.5">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
