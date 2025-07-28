import { Link } from '@inertiajs/react';
import classNames from 'classnames';

interface PaginationProps {
  links: PaginationItem[];
}

interface PaginationItem {
  url: null | string;
  label: string;
  active: boolean;
}

export default function Pagination({ links = [] }: PaginationProps) {
  if (links.length <= 3) return null;

  const first = links.find(link => link.label === '1');
  const last = [...links].reverse().find(link => /^\d+$/.test(link.label));

  return (
    <div className="flex flex-wrap mt-6 -mb-1 items-center gap-2">
      {first?.url && (
        <Link
          href={first.url}
          className="px-4 py-2 text-sm border rounded border-gray-300 hover:bg-gray-50"
        >
          « First
        </Link>
      )}

      {links.map(link => (
        <PaginationLink key={link.label} {...link} />
      ))}

      {last?.url && (
        <Link
          href={last.url}
          className="px-4 py-2 text-sm border rounded border-gray-300 hover:bg-gray-50"
        >
          Last »
        </Link>
      )}
    </div>
  );
}

function PaginationLink({ active, label, url }: PaginationItem) {
  const className = classNames(
    'px-4 py-2 text-sm border rounded',
    'border-gray-300',
    {
      'bg-white text-gray-800 hover:bg-gray-50': !active,
      'bg-indigo-600 text-white': active
    }
  );

  if (!url) {
    return (
      <div
        className="px-4 py-2 text-sm border rounded border-gray-300 text-gray-400"
        dangerouslySetInnerHTML={{ __html: label }}
      />
    );
  }

  return (
    <Link
      href={url}
      className={className}
      dangerouslySetInnerHTML={{ __html: label }}
    />
  );
}
