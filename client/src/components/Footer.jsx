function Footer() {
  return (
    <div className="py-10">
      <div className="h-[1px] w-full bg-slate-400"></div>
      <div className="flex flex-col items-center justify-center mt-10 opacity-70">
        <p className="text-silver">
          &copy; {new Date().getFullYear()} Aakash Shrestha. All rights
          reserved.
        </p>
        <h1 className="text-silver">Designed With MERN </h1>
      </div>
    </div>
  );
}

export default Footer;
