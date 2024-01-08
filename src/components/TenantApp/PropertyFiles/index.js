import React from 'react'
import listLeaseDocumentsQuery from 'queries/documents/documentsListQuery.gql'
import ObjectDocumentList from 'components/ObjectDocumentList';
import ScrollableWhiteCard from 'components/ScrollableWhiteCard';
import Box from 'components/Box';
import Advertisement from 'components/Advertisement';

const PropertyFiles = ({ navigation }) => {
  const listProps = React.useMemo(
    () => ({
      variables: { welcomePackageDocuments: true, isTenant: true },
      query: listLeaseDocumentsQuery,
      dataExtractor: data => data.documents
    }),
    [],
  );

  return (
    <ScrollableWhiteCard minHeight="90%">
      <Box px={"2.5%"}>
        <Box>
          <Advertisement
            hide={true}
            image={null}
            title={null}
            content={null}
          />
        </Box>
        <Box mt={-20}>
          <Box flexDirection="row" justifyContent="space-between">
            <ObjectDocumentList
              {...listProps}
              permissions={{ view: true, edit: true }}
              contentContainerStyle={{ paddingBottom: 60 }}
              navigation={navigation}
              marginItems={1}
            />
          </Box>
        </Box>
      </Box>
    </ScrollableWhiteCard>
  )
}

export default PropertyFiles;
