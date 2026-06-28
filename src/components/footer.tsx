export function Footer({ email, linkedin }: { email: string; linkedin: string }) {
  return (
    <footer className="mt-auto border-t border-[#e5e5e5] bg-[#fafafa]">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 py-8 text-sm text-[#555] sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Declan Malone</p>
        <div className="flex gap-6">
          <a href={`mailto:${email}`} className="hover:text-[#111] transition-colors">
            Email
          </a>
          {linkedin && linkedin !== "LinkedIn URL pending" && (
            <a href={linkedin} target="_blank" rel="noreferrer" className="hover:text-[#111] transition-colors">
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
