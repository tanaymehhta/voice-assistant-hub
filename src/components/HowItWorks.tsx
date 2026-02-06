import { motion } from "framer-motion";
import { MousePointerClick, Headphones, Zap } from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    title: "Choose Your Role",
    description: "Select the business type that fits you — hotel, restaurant, retail, or service.",
  },
  {
    icon: Headphones,
    title: "Test the Assistant",
    description: "Try a live voice call and hear how naturally VoiceX handles your customers.",
  },
  {
    icon: Zap,
    title: "Go Live in Minutes",
    description: "Set up your custom assistant and start taking calls within minutes, not weeks.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 gradient-hero-bg">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Three simple steps to transform your phone experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card-hover rounded-2xl p-7 text-center"
            >
              <div className="w-14 h-14 rounded-2xl gradient-cta flex items-center justify-center mx-auto mb-5">
                <step.icon size={24} className="text-primary-foreground" />
              </div>
              <div className="text-sm font-semibold text-primary mb-2">Step {i + 1}</div>
              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
