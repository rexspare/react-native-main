import { typography } from 'styles/typography';
import { colors } from "styles/theme";

const sectionContainer = {
    marginLeft: 3,
    marginRight: 3
}

export const styles = {
    sectionContainer: {
    },
    features: theme => ({
        container: { width: '100%', marginBottom: 3, marginLeft: -1 },
        content: {
            ...typography['body/medium – regular'],
            color: theme['gray scale/90'],
            textTransform: 'uppercase',
            fontSize: 14,
        },
        label: { ...typography['buttons/large'], color: colors['gray scale/40'], textTransform: 'uppercase' },
        row: { marginTop: 14 },
        icon: { height: 18, width: 18 },
    }),
    deleteButton: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: colors['gray scale/60'],
        maxHeight: 36,
        borderRadius: 12,
    },
    buttonContainer: {
        marginTop: 16,
        marginBottom: 10,
        margin: 3,
        paddingHorizontal: 18,
    },
    assignees: {
        content: { marginTop: 1, mx: 0 },
        label: { marginBottom: 0, marginTop: 0 },
        container: { marginTop: 1, ...sectionContainer },
        avatar: { container: { px: 0 }, avatar: { size: null }, textContainer: { ml: 1 } },
    },

    buildingSection: {
        content: { marginTop: 1, mx: 0 },
        label: { marginBottom: 0 },
        container: { marginTop: 1, marginBottom: 1, ...sectionContainer },
    },
    building: {
        container: { px: 0 },
        avatar: { size: null },
        textContainer: { ml: 1 },
    },
    content: {
        content: { margin: 0 },
        container: { marginBottom: 0, ...sectionContainer },
    },
};
