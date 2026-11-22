import { navigate } from '../router';

/** 없는 주소 — 여행사 톤 유지 */
export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[560px] flex-col items-center px-4 py-24 text-center">
      <p className="font-serif text-[72px] leading-none text-brand">404</p>
      <h1 className="mt-4 text-[22px] font-bold">이 목적지는 노선에 없어요</h1>
      <p className="mt-2 text-[15px] text-gray-600">스위스인 줄 알았는데 평창도 아니었네요. 주소를 다시 확인해 주세요.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          className="btn-orange px-6 py-2.5 text-[15px]"
        >
          메인으로 귀국 »
        </a>
        <a
          href="/#courses"
          onClick={(e) => {
            e.preventDefault();
            navigate('/#courses');
          }}
          className="rounded-md border border-brand bg-white px-6 py-2.5 text-[15px] font-bold text-brand hover:bg-[#eef5fc]"
        >
          투어 코스 보기
        </a>
      </div>
    </div>
  );
}
