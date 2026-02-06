import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 gradient-cta-section">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">
            Ready to transform how you handle calls?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Join hundreds of businesses that never miss a customer call again.
          </p>

          <Button variant="hero" size="xl" asChild>
            <a href="https://calendly.com/tmehta1-babson/30min" target="_blank" rel="noopener noreferrer" className="gap-2">
              Book Your Setup Call
              <ArrowRight size={18} />
            </a>
          </Button>

          <p className="text-sm text-muted-foreground mt-5">
            15-minute call · We'll set everything up for you
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
