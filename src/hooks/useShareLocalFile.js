import Share from 'react-native-share';

export const useShareLocalFile = () => {
    const share = async (options) => {
        const shareResp = await Share.open(options);
        return shareResp
    }

    return share;
}