import Personal from './Personal';
import Work from './Work';
import Files from './Files';
import Activity from './Activity';

export const tabs = [
  {
    text: 'Info',
    value: 'isPersonal',
  },
  {
    text: 'Work',
    value: 'isWork',
  },
  {
    text: 'Files',
    value: 'isFiles',
  },
  {
    text: 'Activity',
    value: 'isActivity',
  },
];

export const steps = [Personal, Work, Files, Activity];

export const userTypes = {
  2: 'landlord',
  3: 'managementUser',
};

export const getUserProfileQuery = userType => ` query ViewLanlord($id: ID!){
    user:${userTypes[userType]}(id: $id){
          lastName
          firstName
          fullName
          id
          pk
          email
          address
          userType
          phone
          userTitle
          birthday
          picture
          drivingLicense
          passport
          ssn
          workHours{
            day
            start
            end
          }
          buildings{
            edges{
              node{
                name
                address
                state
                zip
                id
                displayName
                photos
                city
                vacantUnits: units(status: "2") {
                  edgeCount
                }
              }
            }
          }
          workingDetails{
            email
            phone
            address
          }
    }
  }`;

export const getManagerProfileQuery = userType => ` query ViewLanlord($id: ID!){
    user:${userTypes[userType]}(id: $id){
          lastName
          firstName
          fullName
          id
          pk
          email
          address
          userType
          phone
          birthday
          picture
          title
          userTitle
          drivingLicense
          passport
          ssn
          managementCompany{
            name
          }
          workHours{
            day
            start
            end
          }
          managementTeams{
            building{
              id
              displayName
              name
              address
              photos
              city
              units{
                edges{
                  node{
                    id
                    photos
                    unitNumber
                  }
                }
              }
            }
          }
          workingDetails{
            email
            phone
            address
          }
    }
  }`;
