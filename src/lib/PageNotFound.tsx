import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-muted-foreground mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Button asChild rounded-xl>
        <Link to="/">Go Home</Link>
      </Button>
    </div>
  );
}
