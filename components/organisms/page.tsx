import { Count } from "../molecules/count";

interface PageProps {
  title: string;
  description?: string;
  count?: number;
  tabs?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export const Page = ({
  title,
  description,
  count,
  tabs,
  actions,
  children,
}: PageProps) => {
  return (
    <>
      <div className="pt-2 lg:pt-0 flex flex-col space-y-3">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-start items-center">
              <h3 className="text-2xl lg:text-xl font-semibold text-dark lg:text-black">
                {title}
              </h3>
              {count ? <Count count={count} /> : <></>}
            </div>
            {description ? (
              <p className="text-md lg:text-sm text-gray-500 font-medium pb-4">
                {description}
              </p>
            ) : (
              <></>
            )}
          </div>
          <div className="mb-6 lg:mb-0">{actions}</div>
        </div>
        {tabs}
        <>{children}</>
      </div>
    </>
  );
};
