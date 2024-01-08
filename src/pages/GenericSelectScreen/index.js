import React, { useCallback, useState } from 'react';

import { Layout } from '@ui-kitten/components';
import Box from 'components/Box';
import Header from 'components/Header';
import Icon from 'components/Icon';

import Input from 'components/Input';
import Text from 'components/Text';
import GradientButton from 'components/GradientButton';

import { useNavigation } from '@react-navigation/core';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import GenericSelectList from './GenericSelectList';
import { backAction } from 'constants/actions';
import Button from 'components/Button';

const GenericSelectScreen = ({ route, ...props }) => {
    const [search, setSearch] = useState('');
    const navigation = useNavigation();
    const [selectedValues, setSelectedValues] = useState({});

    const { header, onSelect, ...genericSelectParams } = route?.params || props;

    const headerActions = [{ ...backAction, onPress: () => navigation.goBack()}];

    const onDone = useCallback(() => {
        onSelect?.(Object.values(selectedValues));
        navigation.goBack();
    }, [navigation, route, selectedValues]);

    return (
        <Box as={Layout} flex={1} style={{ marginTop: getStatusBarHeight() + 10 }}>
            <Header actions={headerActions} alignment="center" divider >
                <Text category="label" transform="uppercase">
                    {header}
                </Text>
            </Header>
            <Box
                m={15}
                position="relative"
                flex={1}
                style={{
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 25,
                    justifyContent: "space-between",
                }}
                overflow="hidden">
                <Input
                    icon={Icon('search')}
                    placeholder="Search"
                    size="small"
                    mb={10}
                    value={search}
                    onChangeText={setSearch}
                />
                <GenericSelectList
                    selectedValues={selectedValues}
                    setSelectedValues={setSelectedValues}
                    {...genericSelectParams}
                />

                <Box>
                    <Button  onPress={onDone}>
                        Done
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default GenericSelectScreen;