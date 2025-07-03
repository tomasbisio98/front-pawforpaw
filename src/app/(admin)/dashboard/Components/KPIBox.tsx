import { ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export default function KPIBox({ title, value, icon }: Props) {
  return (
    <div className="bg-[#fffffa] rounded-xl border border-verdeClaro p-4 shadow-sm hover:shadow-md transition duration-200 flex flex-col items-center text-center">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#e4f7ec] mb-2">
        {icon}
      </div>
      <p className="text-2xl font-bold text-[#1B9780] font-nunito">{value}</p>
      <p className="text-xs text-[#2A5559] font-semibold tracking-wide uppercase mt-1 font-nunitoSans">
        {title}
      </p>
    </div>
  );
}

