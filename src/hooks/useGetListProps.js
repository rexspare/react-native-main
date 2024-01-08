import { useMemo } from "react"

export const useGetListProps = ({ dataKey, labelKey, key = 'id', ...props }, deps = [dataKey, labelKey, key, props]) => {
  return useMemo(() => ({
    dataExtractor: d => d[dataKey],
    keyExtractor: k => k[key],
    ...(labelKey && {
      labelExtractor: l => l[labelKey],
    }),
    ...props
  }), deps)
}