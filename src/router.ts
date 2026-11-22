import { useEffect, useState } from 'react';

// 라우터 라이브러리 없이 쓰는 초간단 라우팅 (/, /tour/intro, /tour/master)
// Vercel에서는 vercel.json rewrite로 /tour/* 를 index.html로 돌려줌

const EVENT = 'ps:navigate';

export function navigate(to: string) {
  const [path, hash] = to.split('#');
  if (path && path !== window.location.pathname) {
    window.history.pushState(null, '', to);
    window.dispatchEvent(new Event(EVENT));
    if (!hash) window.scrollTo({ top: 0 });
  }
  if (hash) {
    // 새 페이지가 그려진 다음 스크롤
    requestAnimationFrame(() => setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 30));
  }
}

export function usePath() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const on = () => setPath(window.location.pathname);
    window.addEventListener('popstate', on);
    window.addEventListener(EVENT, on);
    return () => {
      window.removeEventListener('popstate', on);
      window.removeEventListener(EVENT, on);
    };
  }, []);
  return path.replace(/\/+$/, '') || '/';
}
