import { cn } from '@/lib/utils.ts';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useGetCurrentUserQuery } from './user/usersAPI';
import userApi from './user/usersAPI';
import { useAppDispatch } from '@/app/store-hooks';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const {
    data: currentUser,
    isSuccess: isAuthorized,
    isFetching,
    isLoading,
  } = useGetCurrentUserQuery(token!, {
    skip: !token,
  });

  const dispatch = useAppDispatch();
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
      {!isAuthorized && !isLoading && (
        <>
          <Link className="ml-auto" to="/sign-in">
            <Button variant="ghost">Войти</Button>
          </Link>
          <Link to="/sign-up">
            <Button variant="success">Регистрация</Button>
          </Link>
        </>
      )}
      {isAuthorized && !isFetching && (
        <>
          <Link className="ml-auto" to="/new-article">
            <Button className="text-[14px] h-7" variant="success">
              Написать статью
            </Button>
          </Link>
          <div className="flex items-center">
            <Link to="/profile">
              <span className="mr-3">{currentUser?.user.username}</span>
            </Link>
            <Link to="/profile">
              <img
                alt="user"
                src={
                  currentUser.user.image ||
                  'https://static.productionready.io/images/smiley-cyrus.jpg'
                }
                className="w-12 h-12 rounded-full"
              ></img>
            </Link>
            <Button
              onClick={() => {
                localStorage.removeItem('token');
                dispatch(userApi.util.invalidateTags(['User']));
                navigate('/');
              }}
              className="ml-4 h-12"
              variant="secondary"
            >
              Выйти
            </Button>
          </div>
        </>
      )}
    </header>
  );
}
