export default function MainlineSeparator() {
  return (
    <div className="flex-0 relative hidden md:block">
      <div className="text-muted-foreground relative h-full w-px">
        <div className="h-full w-px bg-[repeating-linear-gradient(180deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)] [mask-image:linear-gradient(180deg,transparent,black_25%,black_75%,transparent)]"></div>
      </div>
    </div>
  );
}
