import * as yup from 'yup';
import { TENANCY_DURATION_OPTIONS, TENANT_OPTION, stringifyEnumValue } from 'constants/enums';
import StepOne from './StepOne';
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";
import StepSeven from "./StepSeven";
import Review from './Review';

const requiredStep = step => (currStep, schema) =>
    currStep >= step ? schema.required() : schema;

export const schema = yup.object().shape({
    step: yup.number(),
    tenancyYears: yup
        .number()
        .when('step',{
            is: (value) => value === 0,
            then: yup.number()
                .required('This field is required.'),
        })
        .label('How long was the tenant residing here?'),
    //step 2
    payRent: yup
        .number()
        .when('step',{
            is: (value) => value === 1,
            then: yup.number()
                .required('This field is required.'),
        })
        .round()
        .label('DOES THE TENANT PAY RENT?'),
    // step three
    compliesToTerms: yup
        .number()
        .when('step',{
            is: (value) => value === 2,
            then: yup.number()
                .required('This field is required.'),
        })
        .round()
        .label('Does the tenant comply with the lease terms?'),
    //step four
    makesLegitimateRequests: yup
        .number()
        .when('step',{
            is: (value) => value === 3,
            then: yup.number()
                .required('This field is required.'),
        })
        .round()
        .label("Does the tenant make legitimate maintence requests?"),
    // step five
    filesFormalComplaints: yup
        .number()
        .when('step',{
            is: (value) => value === 4,
            then: yup.number()
                .required('This field is required.'),
        })
        .round()
        .label("Does the tenant file formal complaints with city agencies?"),
    historyOfFiling: yup
        .number()
        .when('step',{
            is: (value) => value === 4,
            then: yup.number()
                .required('This field is required.'),
        })
        .round()
        .label("Does the tenant have a history of filing complaints?"),
    areComplaintsLegitimate: yup
        .number()
        .when('step',{
            is: (value) => value === 4,
            then: yup.number()
                .required('This field is required.'),
        })
        .round()
        .label("Does the tenant file legitimate complaints?"),
    complainProvidesAccess: yup
        .number()
        .when('step',{
            is: (value) => value === 4,
            then: yup.number()
                .required('This field is required.'),
        })
        .round()
        .label("Does the tenant provide access to make the necessary repairs?"),
    //step six
    damagesBuilding: yup
        .number()
        .when('step',{
            is: (value) => value === 5,
            then: yup.number()
                .required('This field is required.'),
        })
        .round()
        .label("Does the tenant damage the building/unit?"),
    // step seven
    courtProceedingsSettlements: yup
        .number()
        .when('step',{
            is: (value) => value === 6,
            then: yup.number()
                .required('This field is required.'),
        })
        .round()
        .label("Has the tenant been involved in any court proceedings/settlements with management or owner?"),
    score: yup
        .number()
        .label('Score')
        .max(100),
    comment: yup
        .string()
        .when('step',{
            is: (value) => value === 6,
            then: yup.string()
                .required('This field is required.'),
        })
});
schema.describe({ value: { step: getSteps } });


export const getFormatedReview = (watching) => ([
    {
        heading: "1. TENANCY",
        step: 0,
        reviews: [{ label: "How long was the tenant residing here?", content: stringifyEnumValue(TENANCY_DURATION_OPTIONS, watching?.tenancyYears) }]
    },
    {
        heading: "2. PAYMENT",
        step: 1,
        reviews: [
            { label: "DOES THE TENANT PAY RENT?", content: stringifyEnumValue(TENANT_OPTION, watching?.payRent || watching?.paysRent) },
        ]
    },
    {
        heading: "3. LEASE TERM",
        step: 2,
        reviews: [
            { label: "Does the tenant comply with the lease terms?", content: stringifyEnumValue(TENANT_OPTION, watching?.compliesToTerms) },
        ]
    },
    {
        heading: `4. Service & Maintenance Request`,
        step: 3,
        reviews: [
            { label: "Does the tenant make legitimate requests?", content: stringifyEnumValue(TENANT_OPTION, watching?.makesLegitimateRequests) },
        ]
    },
    {
        heading: `5. Complaints & Violations`,
        step: 4,
        reviews: [
            { label: "Does the tenant file formal complaints with city agencies?", content: stringifyEnumValue(TENANT_OPTION, watching?.filesFormalComplaints) },
            { label: "Does the tenant have a history of filing complaints?", content: stringifyEnumValue(TENANT_OPTION, watching?.historyOfFiling) },
            { label: "Does the tenant file legitimate complaints?", content: stringifyEnumValue(TENANT_OPTION, watching?.areComplaintsLegitimate) },
            { label: "Does the tenant provide access to make the necessary repairs?", content: stringifyEnumValue(TENANT_OPTION, watching?.complainProvidesAccess || watching?.providesAccess) },
        ]
    },
    {
        heading: "6. tenant damages",
        step: 5,
        reviews: [
            { label: "Does the tenant damage the building/unit?", content: stringifyEnumValue(TENANT_OPTION, watching?.damagesBuilding) },
        ]
    },
    {
        heading: "7. tenant behavior",
        step: 6,
        reviews: [
            { label: "Has the tenant been involved in any court proceedings/settlements with management or owner?", content: stringifyEnumValue(TENANT_OPTION, watching?.courtProceedingsSettlements) },
            { label: "If you were to give the tenant a score from 0-100 with 100 being the best, what would you rate them?", content: `${(watching?.reviewerScore || watching?.score)}` },
            { label: "Additional Comments", content: watching?.comment },
        ]
    }
]);

export const formatReviewFormDataToMutation = (form) => ({
    score: form?.score,
    comment: form?.comment,
    tenancyYears: form?.tenancyYears,
    paymentSection: {
        paysRent: form?.payRent,
    },
    leaseSection: {
        compliesToTerms: form?.compliesToTerms,
    },
    maintenanceSection: {
        makesLegitimateRequests: form?.makesLegitimateRequests,
    },
    complaintsSection: {
        filesFormalComplaints: form?.filesFormalComplaints,
        historyOfFiling: form?.historyOfFiling,
        areComplaintsLegitimate: form?.areComplaintsLegitimate,
        providesAccess: form?.complainProvidesAccess
    },
    damagesSection: {
        damagesBuilding: form?.damagesBuilding,
    },
    behaviourSection: {
        courtProceedingsSettlements: form?.courtProceedingsSettlements,
    }
})
export const steps = [StepOne, StepTwo, StepThree, StepFour, StepFive, StepSix, StepSeven, Review]
export const getSteps = () => ([StepOne, StepTwo, StepThree, StepFour, StepFive, StepSix, StepSeven, Review])