import { Heart } from "lucide-react";

export const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 py-8">
      <div className="container px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © {currentYear} Alex Developer. All rights reserved.
          </div>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-destructive fill-destructive animate-pulse" />
            <span>using React & TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
