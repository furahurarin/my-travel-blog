// src/components/Breadcrumb.tsx
import Link from "next/link";

type Props = {
  items: { name: string; path?: string }[];
};

export function Breadcrumb({ items }: Props) {
  return (
    <nav className="text-xs text-gray-500 mb-6 overflow-x-auto whitespace-nowrap">
      <ol className="flex items-center gap-2">
        <li>
          <Link href="/" className="hover:text-blue-600 hover:underline">
            HOME
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span>/</span>
            {item.path ? (
              <Link href={item.path} className="hover:text-blue-600 hover:underline">
                {item.name}
              </Link>
            ) : (
              <span className="text-gray-800 font-medium">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}