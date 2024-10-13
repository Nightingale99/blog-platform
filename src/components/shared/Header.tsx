import { cn } from '@/lib/utils.ts';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        'flex items-center px-[22px] bg-foreground h-[80px] text-[18px] gap-5',
        className,
      )}
    >
      <Link to="/">
        <h1
          className="text-2xl after:content-[' '] 
          after:opacity-0 after:animate-underline-out 
        after:block after:hover:animate-underline-in 
        after:h-1 after:w-full after:bg-primary after:rounded-lg"
        >
          Realworld Blog
        </h1>
      </Link>
      <Button className="ml-auto" variant="ghost">
        <Link to="/sign-in">Sign In</Link>
      </Button>
      <Button variant="success" className="hover:animate-pulse">
        <Link to="/sign-up">Sign Up</Link>
      </Button>
    </header>
  );
}
