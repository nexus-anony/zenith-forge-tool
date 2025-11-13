'use client';

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Trophy, Award, Code2, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { portfolioData } from "@/data/portfolio-data";

export const AchievementsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const platforms = [
    {
      name: "Codeforces",
      icon: Trophy,
      data: portfolioData.achievements.codeforces,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      name: "CodeChef",
      icon: Award,
      data: portfolioData.achievements.codechef,
      color: "text-yellow",
      bgColor: "bg-yellow/10",
    },
    {
      name: "LeetCode",
      icon: Code2,
      data: portfolioData.achievements.leetcode,
      color: "text-orange",
      bgColor: "bg-orange/10",
    },
  ];

  return (
    <section id="achievements" ref={ref} className="py-20 sm:py-32 relative">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            Achievements & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Competitive programming rankings and professional certifications
          </p>
        </motion.div>

        {/* Competitive Programming */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <Card className="glass p-6 hover-scale group h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-lg ${platform.bgColor} group-hover:scale-110 transition-transform`}>
                    <platform.icon className={`h-6 w-6 ${platform.color}`} />
                  </div>
                  <Button size="sm" variant="ghost" asChild>
                    <a href={platform.data.profileUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <h3 className="text-xl font-bold mb-4">{platform.name}</h3>

                {/* Rating/Badge */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className={`text-3xl font-bold ${platform.color}`}>
                      {'rating' in platform.data 
                        ? platform.data.rating
                        : 'badge' in platform.data 
                        ? platform.data.badge
                        : ''}
                    </span>
                    {'rank' in platform.data && platform.data.rank && (
                      <Badge className={platform.bgColor}>
                        {platform.data.rank}
                      </Badge>
                    )}
                  </div>
                  {'maxRating' in platform.data && platform.data.maxRating && (
                    <p className="text-sm text-muted-foreground">
                      Max Rating: {platform.data.maxRating}
                    </p>
                  )}
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Problems Solved</span>
                      <span className="font-medium">{platform.data.problemsSolved}</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  {'contests' in platform.data && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Contests</span>
                        <span className="font-medium">{platform.data.contests}</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  )}
                </div>

                {/* LeetCode Breakdown */}
                {platform.name === "LeetCode" && 'easy' in platform.data && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div>
                        <div className="font-bold text-green">{platform.data.easy}</div>
                        <div className="text-xs text-muted-foreground">Easy</div>
                      </div>
                      <div>
                        <div className="font-bold text-yellow">{platform.data.medium}</div>
                        <div className="text-xs text-muted-foreground">Medium</div>
                      </div>
                      <div>
                        <div className="font-bold text-destructive">{platform.data.hard}</div>
                        <div className="text-xs text-muted-foreground">Hard</div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Professional Certifications</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {portfolioData.certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <Card className="glass p-5 hover-scale">
                  <Badge className="mb-3">{cert.category}</Badge>
                  <h4 className="font-semibold mb-1">{cert.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground">{cert.date}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
