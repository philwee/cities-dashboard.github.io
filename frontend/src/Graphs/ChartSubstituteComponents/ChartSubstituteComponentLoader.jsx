import { lazy, Suspense } from 'react';
import LoadingText from '../../Components/LoadingText';

export default function ChartSubstituteComponentLoader({ chartSubstituteComponentName }) {
  return (
    <Suspense fallback={<LoadingText />}>
      {(() => {
        const ChartSubstituteComponent = lazy(
          () => import(`./${chartSubstituteComponentName}`)
        );
        return <ChartSubstituteComponent />;
      })()}
    </Suspense>
  );
}
