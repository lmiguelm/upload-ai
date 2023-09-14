import { Github } from "lucide-react";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function Header() {
  return (
    <div className="px-6 py-3 flex items-center max-sm:items-start justify-between border-b">
      <h1 className="text-xl font-bold">🤖 upload.ai</h1>

      <div className="flex gap-2 items-center max-sm:items-end max-sm:flex-col-reverse">
        <span className="text-sm text-muted-foreground max-sm:text-right">
          Desenvolvido com ❤️ no NLW da Rocketseat
        </span>

        <div className="flex gap-2 items-center">
          <Separator orientation="vertical" className="h-6 max-sm:sr-only" />

          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/lmiguelm/upload-ai"
          >
            <Button variant="outline">
              <Github className="w-4 h-4 mr-2" />
              Github
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
