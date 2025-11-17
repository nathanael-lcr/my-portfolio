export default function SecondaryLine() {
  return (
    <div
      className="
        font-medium
        text-neutral-400
        dark:text-neutral-800
        [font-family:var(--font-figtree)]
        flex
        items-start
        gap-2
        mx-5
        mt-16
        whitespace-normal

        flex-row
        justify-between
        md:items-center
        md:whitespace-nowrap
        md:mx-20

        text-[clamp(.7rem,2vw,2rem)]
      "
    >
      <div>Full-Stack Developer</div>
      <div>Interface and Experience Designer</div>
      <div>Software Engineering</div>
    </div>
  );
}
