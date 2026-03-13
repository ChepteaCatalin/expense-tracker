import { CategoryType } from '@/types/category';
import PageWrapper from '../../_components/PageWrapper';
import TypeToggle from '../../_components/TypeToggle/TypeToggle';

export const metadata = {
  title: 'Categories',
  description: 'Manage your expense and income categories',
};

export async function generateStaticParams(): Promise<
  { type: CategoryType }[]
> {
  return [{ type: 'expense' }, { type: 'income' }];
}

export default function CategoriesByTypeLayout({
  children,
}: LayoutProps<'/categories/type/[type]'>) {
  return (
    <PageWrapper
      title={metadata.title}
      subtitle={metadata.description}
      aboveCard={<TypeToggle />}
    >
      {children}
    </PageWrapper>
  );
}
