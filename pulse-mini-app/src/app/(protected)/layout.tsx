import { auth } from '@/auth';
import { Navigation } from '@/components/Navigation';
import { Page } from '@/components/PageLayout';
import { RedirectHandler } from '@/components/RedirectHandler';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    console.log('Not authenticated');
    return null;
  }

  return (
    <Page>
      <RedirectHandler>
        {children}
      </RedirectHandler>
      <Page.Footer className="px-0 fixed bottom-0 w-full bg-white">
        <Navigation />
      </Page.Footer>
    </Page>
  );
}