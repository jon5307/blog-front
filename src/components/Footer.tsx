export default function Footer() {
  return (
    <footer className="border-t py-8 mt-12 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <div>© 2024 My Tech Blog. All rights reserved.</div>
        <div className="mt-2">
          <a
            href="https://github.com/jon5307"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow md:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <span className="h-2 w-2 rounded-full bg-slate-900 dark:bg-slate-100" />
            GitHub: jon5307
          </a>
        </div>
      </div>
    </footer>);
}
