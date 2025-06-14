import Carrusel from "./carrusel/page";
import HomeContent from "./ComponentHome/page";

export default function Home() {
  return (
    <>
    <HomeContent />
      <Carrusel />
      <div className="bg-slate-600 dark:bg-gray-800 dark:border-gray-700"></div>
    </>
  );
}
