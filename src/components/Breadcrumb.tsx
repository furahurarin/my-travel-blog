import Link from "next/link";

type BreadcrumbItem = {
  name: string;
  path?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export const Breadcrumb = ({ items }: Props) => {
  // ▼ 追加: Google推奨の構造化データ (BreadcrumbList)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.path ? `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.furahura-travel.com'}${item.path}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4 overflow-x-auto whitespace-nowrap">
        <ol className="flex items-center gap-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-2 text-gray-300">/</span>}
                {isLast || !item.path ? (
                  <span className="font-medium text-gray-800" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.path} className="hover:text-brand-600 hover:underline transition-colors">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};