import { motion } from "framer-motion";
import { PhoneOff, Clock, Users, CheckCircle2 } from "lucide-react";

const painPoints = [
  {
    icon: PhoneOff,
    pain: '"Missed call at 9 PM"',
    painDescription:
      "A guest tries to book after hours. No answer. They call your competitor.",
    resolution:
      "VoiceX picks up instantly, 24/7. Books the reservation while you sleep.",
  },
  {
    icon: Clock,
    pain: '"On hold for 3 minutes"',
    painDescription:
      "A customer calls during lunch rush. They hang up and leave a 1-star review.",
    resolution:
      "VoiceX answers in under 2 seconds. No hold music. No frustrated customers.",
  },
  {
    icon: Users,
    pain: '"Staff overwhelmed"',
    painDescription:
      "Your front desk handles check-ins, walk-ins, and calls simultaneously. Something gets dropped.",
    resolution:
      "VoiceX handles every call so your team focuses on the people in front of them.",
  },
];

const PainPointsSection = () => {
  return (
    <section id="why-voicex" className="py-20 md:py-28 gradient-hero-bg">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Left column — heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-32"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Every Missed Call Is a{" "}
              <span className="text-gradient">Lost Customer</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
              While you're serving one guest, three more are calling. Here's
              what happens next.
            </p>
          </motion.div>

          {/* Right column — pain/resolution cards */}
          <div className="flex flex-col gap-5">
            {painPoints.map((item, i) => (
              <motion.div
                key={item.pain}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card-hover rounded-2xl p-6"
              >
                {/* Pain row */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                    <item.icon size={20} className="text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground mb-1">
                      {item.pain}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.painDescription}
                    </p>
                  </div>
                </div>

                {/* Resolution row */}
                <div className="flex items-start gap-4 pl-0 md:pl-15">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={20} className="text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground leading-relaxed pt-2.5">
                    {item.resolution}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;
