import { motion } from "framer-motion";
import { Building2, UtensilsCrossed, Wrench } from "lucide-react";

const industries = [
  {
    icon: Building2,
    name: "Hotels",
    description:
      "Handles reservation inquiries, room availability, and late checkout requests — even at 2 AM.",
  },
  {
    icon: UtensilsCrossed,
    name: "Restaurants",
    description:
      "Takes reservation calls during dinner rush, confirms party sizes, and handles dietary questions.",
  },
  {
    icon: Wrench,
    name: "Service Businesses",
    description:
      "Books appointments, answers pricing questions, and routes urgent calls to your mobile.",
  },
];

const SocialProof = () => {
  return (
    <section className="py-16 md:py-20 border-y border-border/40">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Built for Businesses Like Yours
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-border/50 p-6 text-center"
            >
              <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
                <industry.icon size={20} className="text-accent-foreground" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">
                {industry.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {industry.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
