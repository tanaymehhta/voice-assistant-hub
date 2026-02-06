import { motion } from "framer-motion";

const SocialProof = () => {
  return (
    <section className="py-12 md:py-16 border-y border-border/40">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-muted-foreground text-sm font-medium mb-6 uppercase tracking-wider">
            Trusted by growing businesses
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-40">
            {["Coastal Inn", "Bella Cucina", "Urban Threads", "CleanPro Services"].map((name) => (
              <span key={name} className="text-lg md:text-xl font-bold text-foreground tracking-tight">
                {name}
              </span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            500+ calls handled daily across <strong className="text-foreground">120+ businesses</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
