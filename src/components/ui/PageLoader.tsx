import { Spinner } from "./Spinner";

/** Full-page centered loader — used only as a React.Suspense fallback at route level. */
export function PageLoader() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center text-primary">
      <Spinner size="lg" />
    </div>
  );
}
