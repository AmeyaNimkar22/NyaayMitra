import { motion } from "framer-motion";
import { ArrowRight, Bookmark, Clock, Volume2 } from "lucide-react";

const lessons = [
  {
    category: "Criminal Procedure",
    readTime: "3 min read",
    title: "What is an FIR and when can the police legally refuse to file one?",
    description:
      "Learn the distinction between cognizable and non-cognizable offences, what a Zero FIR is, and how Section 173 of BNSS protects your right to mandate an investigation.",
    footnote: "BNSS 2024 Reference Verified",
  },
  {
    category: "Consumer Protection",
    readTime: "4 min read",
    title: "What are your consumer rights if an e-commerce platform denies a return?",
    description:
      "E-Commerce Rules (2020) explicitly ban unfair refusal of refund for counterfeit, defective, or misdescribed products. Understand how to escalate to the National Consumer Helpline.",
    footnote: "CPA 2019 Citation Included",
  },
  {
    category: "Civil Procedure",
    readTime: "3 min read",
    title: "What should you do immediately if you receive a legal notice?",
    description:
      "Never ignore a formal notice. Learn how to verify the sender advocate's credentials, calculate the response window, and document factual contradictions cleanly.",
    footnote: "Includes free response checklist",
  },
  {
    category: "Fundamental Rights",
    readTime: "5 min read",
    title: "What are your constitutional rights during police questioning or frisking?",
    description:
      "The Supreme Court of India guidelines on questioning women, the right to remain silent against self-incrimination (Article 20(3)), and mandatory memo preparation.",
    footnote: "Article 21 & D.K. Basu Precedents",
  },
];

export default function LearningSection() {
  return (
    <section className="w-full py-20 bg-background">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Citizen Knowledge Vault
            </span>
            <h2
              className="text-3xl sm:text-4xl text-foreground mt-2 font-medium"
              style={{ fontFamily: "'Newsreader', serif" }}
            >
              Learn without the legal jargon
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Short, highly readable 3-minute guides that translate statutes into everyday
              common-sense actions.
            </p>
          </div>
          <a href="#know-your-rights" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline shrink-0">
            View All Citizen Guides
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lessons.map((lesson, i) => (
            <motion.article
              key={lesson.title}
              className="p-7 rounded-2xl bg-card hover:bg-muted transition-all shadow-sm hover:shadow-md flex flex-col justify-between border border-border/60"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-accent text-xs text-secondary-foreground font-semibold">
                      {lesson.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={13} /> {lesson.readTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Listen to audio article"
                    >
                      <Volume2 size={18} />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Save for offline"
                    >
                      <Bookmark size={18} />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3 leading-snug hover:text-primary transition-colors cursor-pointer">
                  {lesson.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {lesson.description}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border/60">
                <span className="text-xs text-muted-foreground">{lesson.footnote}</span>
                <a href="#know-your-rights" className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline">
                  Read simple guide
                  <ArrowRight size={15} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
