interface Props {
  title: string;
  value: string | number;
}

export default function KPIBox({ title, value }: Props) {
  return (
    <div className="bg-blancoSuave rounded-2xl shadow-md p-6 text-center border border-verdeClaro hover:shadow-lg transition-all">
      <p className="text-sm text-verdeOscuro font-nunito">{title}</p>
      <p className="text-3xl font-bold text-verdeClaro font-nunito mt-1">{value}</p>
    </div>
  );
}
