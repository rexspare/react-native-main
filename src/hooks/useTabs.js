import { useState } from 'react';

export const useTabs = (tabs = []) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const toNextTab = () => activeTabIndex < (tabs.length - 1) && setActiveTabIndex(activeTabIndex + 1);
    const toPrevTab = () => activeTabIndex > 0 && setActiveTabIndex(activeTabIndex - 1);

    const { Component, props: activeProps = {}, ...additionalTabInfo } = tabs[activeTabIndex];
    return { Component, activeProps, toNextTab, toPrevTab, setActiveTabIndex, activeTabIndex, ...additionalTabInfo }
}
