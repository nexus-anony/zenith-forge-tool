'use client';

import Link from "next/link";
import { Button } from "@/src/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-9xl font-bold gradient-text">404</h1>
        <h2 className="text-3xl font-bold">Page Not Found</h2>
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button size="lg" className="mt-4">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
