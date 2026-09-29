import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import { PageHeader } from '../../components/ui/PageHeader';

export function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return <div className="page"><PageHeader eyebrow="Next phase" title={title} description={description} /><Card><EmptyState title="Foundation route ready" description="This route is connected to the shared shell and API boundary. Its feature module will be implemented in the next phase." /></Card></div>;
}
