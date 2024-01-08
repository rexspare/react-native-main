import Loader from "components/Loader";
import { chain } from "helpers/func";
import React, { useMemo, useState } from "react";

export const useLoader = (loaderProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false)

    const loadingFunc = (f, onCatch = console.log) =>
        chain([
            startLoading,
            (args) => f(args).catch((e) => onCatch(e)).finally(stopLoading)
        ])
          

    return {
        isLoading,
        setIsLoading,
        startLoading,
        stopLoading,
        loadingFunc,
        loader: useMemo(() => <Loader isLoading={isLoading} {...loaderProps} />, [isLoading, loaderProps])
    }
}